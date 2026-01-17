const fs = require('fs');
const path = require('path');
const glob = require('glob');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables from .env and client-site/.env.local
// Load environment variables from .env and .env.local in root
const rootEnvPath = path.join(__dirname, '../../.env');
const clientEnvPath = path.join(__dirname, '../../.env.local');

dotenv.config({ path: rootEnvPath });
// Override or append with client env (useful for Company ID)
const clientEnvConfig = dotenv.config({ path: clientEnvPath }).parsed;
if (clientEnvConfig) {
    for (const k in clientEnvConfig) {
        process.env[k] = clientEnvConfig[k];
    }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// Fallback to Anon key if Service Role not present, but might fail RLS.
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;

const missingVars = [];
if (!SUPABASE_URL) missingVars.push('NEXT_PUBLIC_SUPABASE_URL');
if (!SUPABASE_KEY) missingVars.push('SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)');
if (!COMPANY_ID) missingVars.push('NEXT_PUBLIC_COMPANY_ID');

if (missingVars.length > 0) {
    console.error('Error: Missing required environment variables:');
    missingVars.forEach(v => console.error(` - ${v}`));
    console.error('Please ensure .env files are correctly placed and contain these keys.');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const PUBLIC_HTML_DIR = path.join(__dirname, '../../public_html');
const EXCLUDED_FILES = [
    'index.html',
    'contact-us.html',
    'about-us.html',
    'sitemap.html',
    'thank-you.html',
    'googlef006c00a2c7879ea.html'
];

async function migrate() {
    console.log('Starting migration...');

    // Find all HTML files
    const files = glob.sync('*.html', { cwd: PUBLIC_HTML_DIR });

    let successCount = 0;
    let failCount = 0;

    for (const file of files) {
        if (EXCLUDED_FILES.includes(file)) {
            console.log(`Skipping excluded file: ${file}`);
            continue;
        }

        try {
            const filePath = path.join(PUBLIC_HTML_DIR, file);
            const html = fs.readFileSync(filePath, 'utf8');
            const $ = cheerio.load(html);

            // Extract Metadata
            const title = $('title').text().trim() || null;
            const meta_description = $('meta[name="description"]').attr('content') || null;
            const keywords = $('meta[name="keywords"]').attr('content') || null;
            const canonical_url = $('link[rel="canonical"]').attr('href') || null;

            // Extract Slug (filename without extension)
            const slug = path.basename(file, '.html');

            // Extract Main Content
            // Try .col-sm-9 first (products), then fallback to .col-sm-12 (full width pages like Quality)
            let content = $('.col-sm-9').html();
            if (!content || !content.trim()) {
                content = $('.col-sm-12').html();
            }

            if (!content) {
                console.warn(`No content found in .col-sm-9 or .col-sm-12 for ${file}`);
                // Fallback attempt?
                failCount++;
                continue;
            }

            // Cleanup content (optional: remove scripts inside content)
            const content$ = cheerio.load(content, null, false); // decodeEntities: false
            content$('script').remove();
            content$('style').remove();
            content$('link[rel="stylesheet"]').remove(); // Remove legacy plugin CSS


            // Fix Relative Images & Links
            content$('img').each((i, el) => {
                const src = content$(el).attr('src');
                if (src && !src.startsWith('http') && !src.startsWith('/')) {
                    content$(el).attr('src', '/' + src);
                }
            });

            content$('a').each((i, el) => {
                const href = content$(el).attr('href');
                // Fix internal links to point to new structure
                if (href && href.endsWith('.html')) {
                    const linkSlug = path.basename(href, '.html');
                    // Avoid loops for same page
                    if (linkSlug !== slug) {
                        // Simple heuristic: map .html links to /products/slug
                        // Logic: "contact-us.html" -> "/contact-us" (handled by next.config redirects? No, better to direct link)
                        if (href === 'index.html') content$(el).attr('href', '/');
                        else if (href === 'contact-us.html') content$(el).attr('href', '/contact-us');
                        else if (href === 'about-us.html') content$(el).attr('href', '/about-us');
                        else content$(el).attr('href', `/products/${linkSlug}`);
                    }
                }
            });

            content = content$.html();

            // Insert into Supabase
            // Check if exists first to avoid duplicates or update?
            // "slug" + "company_id" should be unique ideally, but typically slug is unique.

            // We will upsert based on slug? Post table usually uses ID.
            // We'll try to select existing.
            const { data: existing } = await supabase
                .from('post')
                .select('id')
                .eq('slug', slug)
                .eq('company_id', COMPANY_ID)
                .single();

            const postData = {
                type: 'product',
                title: title,
                content: content,
                slug: slug,
                company_id: COMPANY_ID,
                published_at: new Date().toISOString(),
                meta_title: title, // Use title tag as meta_title
                meta_description: meta_description,
                keywords: keywords ? keywords.split(',').map(k => k.trim()) : [],
                canonical_url: canonical_url
            };

            let error;
            if (existing) {
                // Update
                const res = await supabase.from('post').update(postData).eq('id', existing.id);
                error = res.error;
            } else {
                // Insert
                const res = await supabase.from('post').insert(postData);
                error = res.error;
            }

            if (error) {
                console.error(`Error saving ${file}:`, error.message);
                failCount++;
            } else {
                console.log(`Migrated: ${file}`);
                successCount++;
            }

        } catch (err) {
            console.error(`Exception processing ${file}:`, err);
            failCount++;
        }
    }

    console.log(`Migration Complete. Success: ${successCount}, Failed: ${failCount}`);
}

migrate();
