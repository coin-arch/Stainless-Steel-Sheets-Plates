const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Proven environment loading
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

async function diagnoseDuplicates() {
    console.log('--- Diagnosing Duplicates ---');

    const { data: posts, error } = await supabase
        .from('post')
        .select('id, title, slug')
        .eq('company_id', COMPANY_ID)
        .eq('type', 'product');

    if (error) {
        console.error('Error fetching posts:', error);
        return;
    }

    console.log(`Total Products: ${posts.length}`);

    // Map to group likely duplicates
    // Strategy: Normalize title/slug by removing country names? 
    // Or just look for -uae, -bahrain, etc in slug.

    const countrySuffixes = ['-uae', '-bahrain', '-kuwait', '-oman', '-qatar', '-saudi-arabia', '-manufacturer-stockist', '-supplier-stockist'];
    // manufacturer-stockist is essentially the "base" suffix for many, but some might be duplicates even with that.

    // Let's count base slugs.
    const baseSlugMap = {};

    posts.forEach(p => {
        let baseSlug = p.slug;
        const regions = ['-uae', '-bahrain', '-kuwait', '-oman', '-qatar', '-saudi-arabia'];

        for (const region of regions) {
            if (baseSlug.endsWith(region)) {
                baseSlug = baseSlug.replace(region, '');
                break;
            }
        }

        if (!baseSlugMap[baseSlug]) {
            baseSlugMap[baseSlug] = [];
        }
        baseSlugMap[baseSlug].push(p);
    });

    let duplicateGroups = 0;
    let totalDuplicates = 0;

    for (const [base, items] of Object.entries(baseSlugMap)) {
        if (items.length > 1) {
            duplicateGroups++;
            totalDuplicates += (items.length - 1);
            if (duplicateGroups <= 10) {
                console.log(`\nGroup: ${base} (${items.length} items)`);
                items.forEach(i => console.log(` - ${i.slug}`));
            }
        }
    }

    console.log(`\n--- Summary ---`);
    console.log(`Duplicate Groups found: ${duplicateGroups}`);
    console.log(`Total Extra Records to Delete: ${totalDuplicates}`);
}

diagnoseDuplicates();
