const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
// Proven method from diagnose-content.js
const rootEnvPath = path.resolve(__dirname, '../../.env');
const clientEnvPath = path.resolve(__dirname, '../../.env.local');

// Try loading .env.local first (has the secrets usually)
const localEnv = dotenv.config({ path: clientEnvPath });
// Then .env for defaults
const rootEnv = dotenv.config({ path: rootEnvPath });

console.log('Env loaded.');
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'FOUND' : 'MISSING');
console.log('NEXT_PUBLIC_COMPANY_ID:', process.env.NEXT_PUBLIC_COMPANY_ID);
console.log('SERVICE_ROLE_KEY Present:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
console.log('ANON_KEY Present:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error('CRITICAL: NEXT_PUBLIC_SUPABASE_URL is missing.');
    process.exit(1);
}

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey) {
    console.error('CRITICAL: Supabase Key (Service Role or Anon) is missing.');
    process.exit(1);
}

console.log('Using Key:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SERVICE_ROLE' : 'ANON_PUBLIC');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, supabaseKey);
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;

const missingCategories = [
    {
        title: 'Carbon Steel Sheets & Plates',
        slug: 'carbon-steel-sheets-plates-manufacturer-stockist',
        content: `<h1>Carbon Steel Sheets & Plates</h1><p>We are a leading manufacturer and stockist of high-quality Carbon Steel Sheets, Plates, and Coils. Our products are available in various grades and sizes to meet your industrial requirements.</p>`,
        meta_description: 'Top manufacturer of Carbon Steel Sheets and Plates. High quality standard and custom sizes available.',
        image_mapping: 'carbon-steel-casting-components.jpg' // Best guess from file list
    },
    {
        title: 'Nickel Alloy Sheets & Plates',
        slug: 'nickel-alloy-sheets-plates-manufacturer-stockist',
        content: `<h1>Nickel Alloy Sheets & Plates</h1><p>Explore our premium range of Nickel Alloy Sheets and Plates. We supply Nickel 200, 201, and other high-performance alloys for specialized applications.</p>`,
        meta_description: 'Premier supplier of Nickel Alloy Sheets and Plates. ISO certified stockist.',
        image_mapping: 'nickel-alloys-200-201-strips-sheets-plates-coils.jpg'
    },
    {
        title: 'Titanium Sheets & Plates',
        slug: 'titanium-sheets-plates-manufacturer-stockist',
        content: `<h1>Titanium Sheets & Plates</h1><p>We specialize in Titanium Sheets, Plates, and Coils (Gr2, Gr5, Gr7). Lightweight, strong, and corrosion-resistant materials for aerospace and medical industries.</p>`,
        meta_description: 'Leading Titanium Sheets and Plates manufacturer. Gr2, Gr5, Gr7 available.',
        image_mapping: 'titanium-alloys-gr2-gr5-gr7-strips-sheets-plates-coils.jpg'
    },
    {
        title: 'Aluminium Sheets & Plates',
        slug: 'aluminium-sheets-plates-manufacturer-stockist',
        content: `<h1>Aluminium Sheets & Plates</h1><p>High-grade Aluminium Sheets and Plates for structural and engineering applications. Available in various tempers and alloys.</p>`,
        meta_description: 'Quality Aluminium Sheets and Plates supplier and stockist.',
        image_mapping: null // No generic image found, will rely on logic or default
    },
    {
        title: 'Duplex Steel Sheets & Plates',
        slug: 'duplex-steel-sheets-plates-manufacturer-stockist', // Sidebar likely uses this
        content: `<h1>Duplex Steel Sheets & Plates</h1><p>Duplex and Super Duplex Steel Sheets and Plates offering superior strength and corrosion resistance. Grades 2205, 2507, and more.</p>`,
        meta_description: 'Duplex Steel Sheets and Plates manufacturer and exporter.',
        image_mapping: 'duplex-f51-31803-f53-s32205-sheets-plates-manufacturer-stockist.jpg' // Likely exists
    }
];

async function seed() {
    console.log(`Seeding ${missingCategories.length} missing categories...`);

    for (const cat of missingCategories) {
        console.log(`Processing: ${cat.title}`);

        // Check if exists
        const { data: existing } = await supabase
            .from('post')
            .select('id')
            .eq('slug', cat.slug)
            .eq('company_id', COMPANY_ID)
            .single();

        if (existing) {
            console.log(` - Already exists (ID: ${existing.id})`);
            continue;
        }

        // Insert
        const { error } = await supabase
            .from('post')
            .insert({
                title: cat.title,
                slug: cat.slug,
                content: cat.content,
                meta_description: cat.meta_description,
                type: 'product', // Treat as product to show up in catalogs/sidebar logic
                company_id: COMPANY_ID,
                status: 'published'
            });

        if (error) {
            console.error(` - Error inserting ${cat.slug}:`, error.message);
        } else {
            console.log(` - Created successfully.`);
        }
    }
}

seed();
