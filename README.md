Deployment notes

I have applied several repository fixes to make the Vercel deployment pick up the frontend Next.js app located in /frontend and to improve build reliability.

What I changed
- Replaced vercel.json with an empty config so Vercel auto-detects the frontend app (previous overrides were causing STATIC_BUILD_NO_OUT_DIR)
- Added .nvmrc (Node 18) and engines: { node: "18.x" } in frontend/package.json to ensure Node 18 is used
- Added a minimal frontend/next.config.js
- Added frontend/.env.example showing NEXT_PUBLIC_API_URL (do NOT commit secrets)
- Added .vercelignore to prevent backend files from confusing Vercel

What you must do in Vercel (one-time)
1. Re-import the project or update project settings:
   - Root Directory: frontend
   - Framework Preset: Next.js
   - Install Command: npm install
   - Build Command: npm run build
   - Output Directory: .next (optional)
2. Add Environment Variable (Production): NEXT_PUBLIC_API_URL = https://<your-backend-url>
3. Redeploy (Clear cache) and watch the build logs

If the build still fails, copy the first ~40 lines of the build log and paste them here and I will fix the exact remaining issues.
