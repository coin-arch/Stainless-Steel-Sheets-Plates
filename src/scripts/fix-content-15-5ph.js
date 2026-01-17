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

const slug = 'stainless-steel-15-5ph-perforated-sheets-manufacturer-stockist';
const htmlPath = path.resolve(__dirname, '../../public_html/stainless-steel-15-5ph-perforated-sheets-manufacturer-stockist.html');

async function fixContent() {
    console.log(`Fixing content for: ${slug}`);

    if (!fs.existsSync(htmlPath)) {
        console.error('HTML file not found:', htmlPath);
        return;
    }

    const html = fs.readFileSync(htmlPath, 'utf8');
    const $ = cheerio.load(html);

    // Extract content from .services-detail .inner-box
    const container = $('.services-detail .inner-box');
    const blocks = [];

    // Helper to add blocks - Flattened structure to match ContentRenderer
    const addBlock = (type, data) => blocks.push({ type, ...data });

    // 1. Description Text (from .lower-content .text)
    // The structure seems to be: .lower-content -> .bold-text, .text
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
                // ModernDataGrid expects { text: string } objects, not raw strings
                cells.push({ text: $(td).text().trim() });
            });
            if (cells.length > 0) rows.push(cells);
        });

        const caption = $(table).find('caption').text().trim() || $(table).prev('h3').text().trim();

        if (rows.length > 0) {
            addBlock('table', {
                title: caption,
                headers: rows[0], // Assuming first row is header for now, or renderer extracts it
                rows: rows.slice(1)
            });
        }
    });

    console.log(`Extracted ${blocks.length} blocks.`);
    console.log(JSON.stringify(blocks, null, 2));

    // Update Supabase
    const { error } = await supabase
        .from('post')
        .update({
            structured_content: blocks,
            // Also update raw content to be cleaner? optional.
            content: container.html() // update legacy content just in case
        })
        .eq('company_id', COMPANY_ID)
        .eq('slug', slug);

    if (error) {
        console.error('Error updating DB:', error);
    } else {
        console.log('Successfully updated structured_content!');
    }
}

fixContent();
