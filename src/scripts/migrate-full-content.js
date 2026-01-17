const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');
const glob = require('glob');

// --- SETUP ---
const rootEnvPath = path.resolve(__dirname, '../../.env');
const clientEnvPath = path.resolve(__dirname, '../../.env.local');
dotenv.config({ path: clientEnvPath });
dotenv.config({ path: rootEnvPath });

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, supabaseKey);
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;
const PUBLIC_HTML_DIR = path.resolve(__dirname, '../../public_html');

// --- PARSING LOGIC (Adapted from parse-content.js) ---

function cleanText(text) {
    if (!text) return '';
    return text.replace(/\s+/g, ' ').trim();
}

function parseTable($, $table) {
    const rows = [];
    $table.find('tr').each((r, tr) => {
        const cells = [];
        $(tr).find('td, th').each((c, cell) => {
            const $cell = $(cell);
            cells.push({
                text: cleanText($cell.text()),
                tag: cell.tagName.toLowerCase(), // 'th' or 'td'
                rowSpan: parseInt($cell.attr('rowspan')) || 1,
                colSpan: parseInt($cell.attr('colspan')) || 1,
                align: $cell.attr('align') || 'left'
            });
        });
        if (cells.length > 0) rows.push(cells);
    });
    return { type: 'table', rows };
}

function parseNodes($, container) {
    const blocks = [];

    container.children().each((i, el) => {
        const $el = $(el);
        const tag = el.tagName.toLowerCase();

        // 1. HEADERS
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
            blocks.push({
                type: 'heading',
                level: parseInt(tag.replace('h', '')),
                text: cleanText($el.text())
            });
        }
        // 2. PARAGRAPHS
        else if (tag === 'p') {
            if ($el.find('img').length > 0) {
                // Handle images inside P
                $el.find('img').each((j, img) => {
                    blocks.push({
                        type: 'image',
                        src: $(img).attr('src'),
                        alt: $(img).attr('alt') || '',
                    });
                });
                const text = cleanText($el.text());
                if (text) blocks.push({ type: 'paragraph', text });
            } else {
                const text = cleanText($el.text());
                if (text.length > 0) blocks.push({ type: 'paragraph', text });
            }
        }
        // 3. IMAGES
        else if (tag === 'img') {
            blocks.push({
                type: 'image',
                src: $el.attr('src'),
                alt: $el.attr('alt') || '',
            });
        }
        // 4. LISTS
        else if (tag === 'ul' || tag === 'ol') {
            const items = [];
            $el.find('li').each((j, li) => {
                items.push(cleanText($(li).text()));
            });
            blocks.push({
                type: 'list',
                listType: tag === 'ol' ? 'ordered' : 'unordered',
                items
            });
        }
        // 5. TABLES
        else if (tag === 'table') {
            blocks.push(parseTable($, $el));
        }
        // 6. DIVS
        else if (tag === 'div') {
            if ($el.hasClass('table-responsive')) {
                const $table = $el.find('table');
                if ($table.length) blocks.push(parseTable($, $table));
            }
            else if ($el.hasClass('panel-group')) {
                const items = [];
                $el.find('.panel').each((j, panel) => {
                    const $panel = $(panel);
                    const title = cleanText($panel.find('.panel-heading, .panel-title').text());
                    const bodyBlocks = parseNodes($, $panel.find('.panel-body'));
                    items.push({ title, body: bodyBlocks });
                });
                blocks.push({ type: 'accordion', items });
            }
            else if ($el.children('.snippet-title').length > 0) {
                blocks.push({
                    type: 'section',
                    variant: 'summary',
                    title: cleanText($el.find('.snippet-title').text()),
                    content: cleanText($el.find('.snippet-markup').text())
                });
            }
            else {
                // Recurse generic divs
                blocks.push(...parseNodes($, $el));
            }
        }
        else if (tag === 'center') {
            blocks.push(...parseNodes($, $el));
        }

        // Custom Handling for 'bold-text' div sometimes used in legacy
        if ($el.hasClass('bold-text') || $el.hasClass('text')) {
            if (blocks.length === 0 && tag === 'div') {
                // If we recursed we might have got it, otherwise treat as simple text
            }
        }
    });

    return blocks;
}


// --- MAIN EXECUTION ---

async function migrateAll() {
    console.log('--- Starting Full Content Migration ---');

    // 0. Verify Total Count
    const { count, error: countError } = await supabase
        .from('post')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', COMPANY_ID)
        .eq('type', 'product');

    if (countError) {
        console.error('Error counting products:', countError);
    } else {
        console.log(`Total Products in DB: ${count}`);
    }

    // 1. Fetch all products
    const { data: posts, error } = await supabase
        .from('post')
        .select('id, slug, title')
        .eq('company_id', COMPANY_ID)
        .eq('type', 'product')
        .limit(1000); // Ensure we get everything

    if (error) {
        console.error('Error fetching posts:', error);
        return;
    }

    console.log(`Found ${posts.length} products to process in this batch.`);

    let successCount = 0;
    let failCount = 0;

    for (const post of posts) {
        // Find HTML file
        let distinctFilename = `${post.slug}.html`;
        let filePath = path.join(PUBLIC_HTML_DIR, distinctFilename);

        if (!fs.existsSync(filePath)) {
            // Try standard fallback if strict slug filename doesn't exist
            // e.g. some might mismatch slightly. For now skipping.
            failCount++;
            continue;
        }

        try {
            const html = fs.readFileSync(filePath, 'utf8');
            const $ = cheerio.load(html);

            // Target the content area
            const container = $('.services-detail .inner-box .lower-content');

            if (container.length === 0) {
                failCount++;
                continue;
            }

            // Parse using robust logic
            const blocks = parseNodes($, container);

            if (blocks.length > 0) {
                const { error: updateError } = await supabase
                    .from('post')
                    .update({
                        structured_content: blocks
                        // Removed 'status' field causing PGRST204 error
                    })
                    .eq('id', post.id);

                if (updateError) {
                    console.error(`Failed DB update for ${post.slug}:`, updateError);
                    failCount++;
                } else {
                    successCount++;
                }
            } else {
                console.warn(`No blocks parsed from ${post.slug}`);
                failCount++;
            }

        } catch (err) {
            console.error(`Error processing ${post.slug}:`, err.message);
            failCount++;
        }

        if ((successCount + failCount) % 20 === 0) {
            console.log(`Progress: ${successCount + failCount}/${posts.length}`);
        }
    }

    console.log('--- Migration Complete ---');
    console.log(`Success: ${successCount}`);
    console.log(`Failed: ${failCount}`);
}

migrateAll();
