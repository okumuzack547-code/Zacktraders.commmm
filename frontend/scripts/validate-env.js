// Validates build-time environment variables required by the frontend.
// This script runs before `npm run build` via the `prebuild` npm script.

const required = [
  'NEXT_PUBLIC_API_URL'
];

let missing = [];
for (const key of required) {
  if (!process.env[key]) missing.push(key);
}

if (missing.length) {
  console.error('\nERROR: Missing required build-time environment variables: ' + missing.join(', '));
  console.error('Set them in Vercel Project → Settings → Environment Variables (Production) and redeploy.');
  process.exit(1);
}

console.log('Build environment check passed. NEXT_PUBLIC_API_URL=' + process.env.NEXT_PUBLIC_API_URL);
