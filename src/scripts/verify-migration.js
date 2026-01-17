const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

const rootEnvPath = path.resolve(__dirname, '../../.env');
const clientEnvPath = path.resolve(__dirname, '../../.env.local');
dotenv.config({ path: clientEnvPath });
dotenv.config({ path: rootEnvPath });

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, supabaseKey);
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;

async function verify() {
    console.log('--- Verifying Content Migration ---');

    // Fetch ONE product that HAS structured content
    const { data: post, error } = await supabase
        .from('post')
        .select('slug, title, structured_content')
        .eq('company_id', COMPANY_ID)
        .not('structured_content', 'is', null)
        .limit(1)
        .single();

    if (error) {
        console.error('Error:', error);
        return;
    }

    if (post) {
        console.log(`Product: ${post.title}`);
        console.log(`Structured Content Type: ${typeof post.structured_content}`);

        if (Array.isArray(post.structured_content) && post.structured_content.length > 0) {
            console.log(`Success! Found ${post.structured_content.length} blocks.`);
            console.log('First Block:', JSON.stringify(post.structured_content[0], null, 2));

            // Check for table
            const table = post.structured_content.find(b => b.type === 'table');
            if (table) {
                console.log('Table found:', table.data ? table.data.title : (table.title || 'Untitled'));
                // Check row format
                if (table.rows && table.rows.length > 0) {
                    console.log('Row 0 Cell 0:', JSON.stringify(table.rows[0][0]));
                }
            } else {
                console.log('No table found in this product.');
            }

            // Check for Summary Section
            const summary = post.structured_content.find(b => b.type === 'section' && b.variant === 'summary');
            if (summary) {
                console.log('Summary Section found:', summary.title);
                console.log('Summary Content Preview:', summary.content.substring(0, 100));
            } else {
                console.log('No summary section found.');
            }
        } else {
            console.log('Structured Content is empty array or invalid.');
        }
    } else {
        console.log('Product not found.');
    }
}

verify();
