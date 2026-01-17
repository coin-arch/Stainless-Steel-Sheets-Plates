const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const rootEnvPath = path.resolve(__dirname, '../../.env');
const clientEnvPath = path.resolve(__dirname, '../../.env.local');
dotenv.config({ path: clientEnvPath });
dotenv.config({ path: rootEnvPath });

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, supabaseKey);
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;

async function generateNav() {
    console.log('Fetching products for navigation...');

    const { data: products, error } = await supabase
        .from('post')
        .select('title, slug')
        .eq('company_id', COMPANY_ID)
        .eq('type', 'product');

    if (error) {
        console.error('Error:', error);
        return;
    }

    // Logic to categorize - Optimized for Sheets/Plates focus
    const categories = {
        'Stainless Steel': [],
        'Duplex & Super Duplex': [],
        'Nickel Alloys': [],
        'Product Forms': [] // Chequered, Perforated, Strips
    };

    products.forEach(p => {
        const t = p.title.toLowerCase();

        // --- 1. SPECIAL FORMS (Add to their own category) ---
        if (t.includes('chequered') || t.includes('perforated') || t.includes('strip') || t.includes('coil') || t.includes('shim')) {
            categories['Product Forms'].push(p);
        }

        // --- 2. MATERIAL CLASSIFICATION ---
        if (t.includes('stainless steel')) {
            categories['Stainless Steel'].push(p);
        } else if (t.includes('duplex') || t.includes('super duplex')) {
            categories['Duplex & Super Duplex'].push(p);
        } else if (t.includes('nickel') || t.includes('inconel') || t.includes('monel') || t.includes('hastelloy') || t.includes('alloy 20') || t.includes('alloy 200')) {
            categories['Nickel Alloys'].push(p);
        }
        // Exclude Carbon, Titanium, Aluminium as per Client Request
    });

    // Convert to simple menu structure
    const menuData = Object.keys(categories).map(key => ({
        label: key,
        // Sort items?
        items: categories[key].map(p => ({ label: p.title, href: `/products/${p.slug}` }))
    }));

    const outputPath = path.resolve(__dirname, '../lib/nav-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(menuData, null, 2));

    console.log(`Navigation data saved to ${outputPath}`);
    console.log('Categories:', menuData.map(c => `${c.label}: ${c.items.length}`));
}

generateNav();
