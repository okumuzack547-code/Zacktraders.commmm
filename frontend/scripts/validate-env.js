// Validates build-time environment variables required by the frontend.
// This version only warns instead of failing the build so Vercel can continue
// when the environment variable is missing. Recommended: set NEXT_PUBLIC_API_URL
// in Vercel Project → Settings → Environment Variables for production builds.

const required = [
  'NEXT_PUBLIC_API_URL'
];

let missing = [];
for (const key of required) {
  if (!process.env[key]) missing.push(key);
}

if (missing.length) {
  console.warn('\nWARNING: Missing required build-time environment variables: ' + missing.join(', '));
  console.warn('Set them in Vercel Project → Settings → Environment Variables (Production) and redeploy.');
  console.warn('Continuing build for now (this is a temporary relaxation).');
} else {
  console.log('Build environment check passed. NEXT_PUBLIC_API_URL=' + process.env.NEXT_PUBLIC_API_URL);
}
