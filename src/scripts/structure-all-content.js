const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

const rootEnvPath = path.resolve(__dirname, '../../.env');
const clientEnvPath = path.resolve(__dirname, '../../.env.local');
dotenv.config({ path: clientEnvPath });
dotenv.config({ path: rootEnvPath });

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, supabaseKey);
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;
const PUBLIC_HTML_PATH = path.resolve(__dirname, '../../public_html');

async function structureAllContent() {
    console.log('--- Starting Bulk Content Structuring ---');

    // 1. Fetch all products
    const { data: posts, error } = await supabase
        .from('post')
        .select('id, slug, title')
        .eq('company_id', COMPANY_ID)
        .eq('type', 'product');

    if (error) {
        console.error('Error fetching posts:', error);
        return;
    }

    console.log(`Found ${posts.length} products to process.`);

    let successCount = 0;
    let failCount = 0;

    for (const post of posts) {
        // Try to find matching HTML file
        // Priority 1: Exact slug match
        let distinctFilename = `${post.slug}.html`;
        let filePath = path.join(PUBLIC_HTML_PATH, distinctFilename);

        if (!fs.existsSync(filePath)) {
            // Priority 2: Try stripping -manufacturer-stockist if mostly standard
            // user feedback implies the slug usually matches the file. 
            // Let's log failures and we can refine mapping later.
            // console.warn(`File not found for: ${post.slug}`);
            failCount++;
            continue;
        }

        try {
            const html = fs.readFileSync(filePath, 'utf8');
            const $ = cheerio.load(html);
            const container = $('.services-detail .inner-box');

            if (container.length === 0) {
                // console.warn(`No content container found in: ${distinctFilename}`);
                failCount++;
                continue;
            }

            const blocks = [];

            // Helper to add blocks - Flattened structure!
            const addBlock = (type, data) => blocks.push({ type, ...data });

            // 1. Description Text
            const boldText = container.find('.lower-content .bold-text').text().trim();
            if (boldText) addBlock('paragraph', { text: `<b>${boldText}</b>` });

            const mainText = container.find('.lower-content .text > p').first().text().trim();
            if (mainText) addBlock('paragraph', { text: mainText });

            // 2. Tables
            container.find('table').each((i, table) => {
                const rows = [];
                $(table).find('tr').each((j, tr) => {
                    const cells = [];
                    $(tr).find('td, th').each((k, td) => {
                        // CRITICAL: Wrap text in object for ModernDataGrid
                        cells.push({ text: $(td).text().trim() });
                    });
                    if (cells.length > 0) rows.push(cells);
                });

                const caption = $(table).find('caption').text().trim() || $(table).prev('h3').text().trim();

                if (rows.length > 0) {
                    addBlock('table', {
                        title: caption,
                        headers: rows[0],
                        rows: rows.slice(1)
                    });
                }
            });

            if (blocks.length > 0) {
                const { error: updateError } = await supabase
                    .from('post')
                    .update({ structured_content: blocks })
                    .eq('id', post.id);

                if (updateError) {
                    console.error(`Failed to update DB for ${post.slug}:`, updateError);
                } else {
                    // console.log(`Updated: ${post.slug} (${blocks.length} blocks)`);
                    successCount++;
                }
            } else {
                failCount++;
            }

        } catch (err) {
            console.error(`Error processing ${post.slug}:`, err.message);
            failCount++;
        }

        // Progress log every 50
        if ((successCount + failCount) % 50 === 0) {
            console.log(`Processed ${successCount + failCount}/${posts.length}...`);
        }
    }

    console.log('--- Migration Complete ---');
    console.log(`Success: ${successCount}`);
    console.log(`Failed/Skipped: ${failCount}`);
}

structureAllContent();
