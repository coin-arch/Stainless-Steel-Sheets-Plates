const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

const rootEnvPath = path.resolve(__dirname, '../../.env');
const clientEnvPath = path.resolve(__dirname, '../../.env.local');
dotenv.config({ path: clientEnvPath });
dotenv.config({ path: rootEnvPath });

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error('CRITICAL: NEXT_PUBLIC_SUPABASE_URL is missing.');
    process.exit(1);
}

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, supabaseKey);
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;

async function cleanupDuplicates() {
    console.log('--- Cleaning Up Duplicates ---');

    // 1. Fetch all products
    const { data: posts, error } = await supabase
        .from('post')
        .select('id, slug')
        .eq('company_id', COMPANY_ID)
        .eq('type', 'product');

    if (error) {
        console.error('Error fetching posts:', error);
        return;
    }

    const countrySuffixes = ['-uae', '-bahrain', '-kuwait', '-oman', '-qatar', '-saudi-arabia'];

    // Identify IDs to delete
    const idsToDelete = [];

    posts.forEach(p => {
        for (const region of countrySuffixes) {
            if (p.slug.endsWith(region)) {
                // Check if this is a "regional" variant of a base slug?
                // Actually, duplicate logic was: base + region. 
                // We want to delete ANYTHING ending in these regions, because we only want the global page.
                idsToDelete.push(p.id);
                // console.log(`Marking for deletion: ${p.slug}`);
                break;
            }
        }
    });

    console.log(`Found ${idsToDelete.length} records to delete.`);

    if (idsToDelete.length > 0) {
        // Delete in chunks to be safe
        const CHUNK_SIZE = 50;
        for (let i = 0; i < idsToDelete.length; i += CHUNK_SIZE) {
            const chunk = idsToDelete.slice(i, i + CHUNK_SIZE);
            const { error: delError } = await supabase
                .from('post')
                .delete()
                .in('id', chunk);

            if (delError) {
                console.error(`Error deleting chunk ${i}:`, delError);
            } else {
                console.log(`Deleted chunk ${i} - ${i + chunk.length}`);
            }
        }
    }

    console.log('--- Cleanup Complete ---');
}

cleanupDuplicates();
