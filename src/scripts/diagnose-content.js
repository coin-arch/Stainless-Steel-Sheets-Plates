
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const companyId = process.env.NEXT_PUBLIC_COMPANY_ID;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Image Mapper Logic (replicated from src/lib/image-mapper.ts for Node environment)
const SPECIFIC_MAPPINGS = {
    // Homepage "Category" Slugs -> Specific Legacy Grade Images
    'stainless-steel-sheets-plates-manufacturer-stockist': 'stainless-steel-304-304l-304h-sheets-plates-manufacturer-stockist.jpg',
    'carbon-steel-sheets-plates-manufacturer-stockist': 'mild-carbon-steel-perforated-sheets.jpg',
    'duplex-steel-sheets-plates-manufacturer-stockist': 'duplex-super-duplex-steel-2205-2507-sheets-plates-manufacturer-stockist.jpg',
    'nickel-alloy-sheets-plates-manufacturer-stockist': 'nickel-alloy-200-201-sheets-plates-manufacturer-stockist.jpg',
    'titanium-sheets-plates-manufacturer-stockist': 'titanium-alloy-gr2-gr5-gr7-sheets-plates-manufacturer-stockist.jpg',
    'strips-coils-manufacturer-stockist': 'strips-coils.jpg',
    'perforated-sheets-manufacturer-stockist': 'perforated-sheets.jpg',
    'stainless-steel-chequered-plates-manufacturer-stockist': 'chequered-plates.jpg',
    'aluminium-sheets-plates-manufacturer-stockist': 'aluminium-alloy-5083-5086-6013-6061-perforated-sheets.jpg',
};

function getImageForProduct(slug) {
    if (!slug) return 'MISSING_SLUG';
    const cleanSlug = slug.toLowerCase();

    // 1. Explicit
    if (SPECIFIC_MAPPINGS[cleanSlug]) {
        return SPECIFIC_MAPPINGS[cleanSlug];
    }

    // 2. Logic
    // Try to find the file in the file list (not implemented here, just returning the guess)
    if (cleanSlug.includes('socket-weld')) {
        return `${cleanSlug.replace('socket-weld', 'socketweld').replace('manufacturer', 'supplier')}.jpg`;
    }
    return `${cleanSlug.replace('manufacturer', 'supplier')}.jpg`;
}

async function diagnose() {
    console.log('--- Starting Diagnosis ---');

    // 1. Fetch Slugs
    const { data: posts, error } = await supabase
        .from('post')
        .select('slug, title, type')
        .eq('company_id', companyId)
        .eq('type', 'product');

    if (error) {
        console.error('Error fetching posts:', error);
        return;
    }

    console.log(`Found ${posts.length} products in database.`);

    // 2. Load Local Images
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    let localImages = [];
    try {
        localImages = fs.readdirSync(imagesDir);
    } catch (e) {
        console.error('Error reading images directory:', e);
    }

    // 3. Analyze
    let missingImagesCount = 0;
    let successImagesCount = 0;
    let brokenLinksPotential = [];

    // Sample output for verifying mappings
    const samples = [];

    posts.forEach(post => {
        const mappedImage = getImageForProduct(post.slug);
        const exists = localImages.includes(mappedImage);

        if (exists) {
            successImagesCount++;
        } else {
            missingImagesCount++;
        }

        if (samples.length < 20 && !exists) {
            samples.push({
                slug: post.slug,
                mappedTo: mappedImage,
                exists: exists
            });
        }
    });

    console.log('\n--- Image Analysis ---');
    console.log(`Total Products: ${posts.length}`);
    console.log(`Images Found: ${successImagesCount}`);
    console.log(`Images Missing: ${missingImagesCount}`);

    console.log('\n--- Missing Image Samples (First 20) ---');
    console.table(samples);

    console.log('\n--- Categories/Slugs Check ---');
    console.log('\n--- Searching for "Category" Page Slugs ---');
    const searchTerms = ['titanium', 'carbon', 'nickel', 'aluminium', 'stainless'];

    // We want to find slugs that might be the 'main' page for these.
    // Usually they are short or contain 'sheets-plates' without specific grades like '304'.

    let potentialCategoryPages = [];

    posts.forEach(p => {
        // Filter for things that look like category pages
        if (p.slug.includes('sheets-plates') || p.slug.includes('strips-coils')) {
            potentialCategoryPages.push(p.slug);
        }
    });

    console.log(`Found ${potentialCategoryPages.length} potential category slugs.`);

    searchTerms.forEach(term => {
        console.log(`\n-- ${term.toUpperCase()} Matches --`);
        const matches = potentialCategoryPages.filter(s => s.includes(term));
        // Sort by length to find the shortest ones (usually the main category)
        matches.sort((a, b) => a.length - b.length);
        matches.slice(0, 10).forEach(m => console.log(m));
    });

    console.log('\n--- Checking SEEDED Slugs ---');
    const seededSlugs = [
        'titanium-sheets-plates-manufacturer-stockist',
        'carbon-steel-sheets-plates-manufacturer-stockist',
        'nickel-alloy-sheets-plates-manufacturer-stockist',
        'aluminium-sheets-plates-manufacturer-stockist',
        'duplex-steel-sheets-plates-manufacturer-stockist'
    ];

    for (const slug of seededSlugs) {
        const { data } = await supabase
            .from('post')
            .select('id, title, company_id')
            .eq('slug', slug)
            .eq('company_id', companyId)
            .maybeSingle();

        console.log(`Slug: ${slug} -> ${data ? 'EXISTS (ID: ' + data.id + ')' : 'MISSING'}`);
    }

    console.log('\n--- Checking File Existence for Sample Slugs ---');
    // Check if we can find images for some mapped slugs using the improved logic we want to implement
    searchTerms.forEach(term => {
        const match = potentialCategoryPages.find(s => s.includes(term));
        if (match) {
            const exact = `${match}.jpg`;
            const swap = `${match.replace('manufacturer', 'supplier')}.jpg`;
            console.log(`Slug: ${match}`);
            console.log(`  Exact (${exact}): ${localImages.includes(exact)}`);
            console.log(`  Swap  (${swap}): ${localImages.includes(swap)}`);
        }
    });
    console.log('\n--- Product Counts by Material ---');
    const materials = ['Stainless', 'Carbon', 'Nickel', 'Titanium', 'Aluminium', 'Duplex'];

    for (const mat of materials) {
        const { count } = await supabase
            .from('post')
            .select('*', { count: 'exact', head: true })
            .eq('company_id', companyId)
            .ilike('title', `%${mat}%`);

        console.log(`${mat}: ${count}`);
    }
}

diagnose();
