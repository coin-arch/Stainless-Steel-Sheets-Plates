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

const slug = 'stainless-steel-304-sheets-plates-manufacturer-stockist';

// Find any product with structured_content
const { data: validProduct, error } = await supabase
    .from('post')
    .select('title, slug, structured_content')
    .eq('company_id', COMPANY_ID)
    .not('structured_content', 'is', null) // JSONB check
    .limit(1)
    .single();

if (validProduct) {
    console.log('--- Verification Success: Found Updated Product ---');
    console.log('Slug:', validProduct.slug);
    console.log('Title:', validProduct.title);
    console.log('Structured Content JSON:', JSON.stringify(validProduct.structured_content, null, 2).substring(0, 1000));
} else {
    console.log('Verification Failed: No products have structured_content.');
    console.log('Error:', error);
}

return; // Stop here

// const { data, error } = await supabase...

if (error) {
    console.error('Error fetching product:', error);
    return;
}

if (data) {
    console.log('--- Product Found ---');
    console.log('Title:', data.title);

    if (data.content) {
        console.log('Legacy Content Preview (First 3000 chars):');
        console.log(data.content.substring(0, 3000));
    } else {
        console.log('Legacy Content is NULL');
    }

    console.log('Structured Content Type:', typeof data.structured_content);
} else {
    console.log('Product not found (no data returned)');
}
}

testFetch();
