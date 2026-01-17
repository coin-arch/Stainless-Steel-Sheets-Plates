const path = require('path');
const dotenv = require('dotenv');

const rootEnvPath = path.join(__dirname, '../../.env');
const clientEnvPath = path.join(__dirname, '../../.env.local');

console.log('--- Debug Environment ---');
console.log('Root Env Path:', rootEnvPath);
console.log('Client Env Path:', clientEnvPath);

const rootConfig = dotenv.config({ path: rootEnvPath });
console.log('Root .env loaded:', rootConfig.error ? 'NO' : 'YES');
if (rootConfig.parsed) console.log('Root keys:', Object.keys(rootConfig.parsed));

const clientConfig = dotenv.config({ path: clientEnvPath });
console.log('Client .env.local loaded:', clientConfig.error ? 'NO' : 'YES');
if (clientConfig.parsed) {
    console.log('Client keys:', Object.keys(clientConfig.parsed));
    // Print first few chars of important keys to verify content without leaking
    if (clientConfig.parsed.NEXT_PUBLIC_COMPANY_ID) console.log('COMPANY_ID starts with:', clientConfig.parsed.NEXT_PUBLIC_COMPANY_ID.substring(0, 4));
} else {
    console.log('Client parsed is undefined/null');
}
console.log('--- End Debug ---');
