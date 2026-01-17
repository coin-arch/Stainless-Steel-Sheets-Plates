
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkTables() {
    console.log('Checking tables...');
    // There isn't a direct "list tables" in js client easily for public schema without admin, 
    // but we can try to select from likely technical tables.
    const tablesToCheck = ['technical', 'technical_data', 'specifications', 'specs', 'pages', 'content'];

    for (const table of tablesToCheck) {
        const { data, error } = await supabase.from(table).select('*').limit(1);
        if (error) {
            console.log(`Table '${table}': Not found or Error: ${error.message}`);
        } else {
            console.log(`Table '${table}': FOUND! (Rows: ${data.length})`);
            if (data.length > 0) console.log('Sample:', data[0]);
        }
    }
}

checkTables();
