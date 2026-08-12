# Tradescheme.site

Tradescheme is an options trading platform (vanilla options) scaffold for web + mobile with support for demo (paper) accounts and live trading integrations. This repository will contain the frontend (Next.js), backend (Node/NestJS or Express), Prisma schema for PostgreSQL, and CI/CD deployment configs.

IMPORTANT
- This scaffold does NOT contain any real-money provider credentials or secrets.
- Do NOT enable live trading or accept customer funds until you have a broker/custodian partner, completed KYC/AML and legal reviews, and a security audit.

Next steps
1. Create a branch named `feature/tradescheme-mvp` (I will create this branch and add scaffold files).
2. Add environment secrets in GitHub (DB, Redis, provider API keys, KMS/Vault).
3. Run the dev environment with Docker Compose (postgres + redis + backend + frontend).

Files that will be added in the `feature/tradescheme-mvp` branch:
- `architecture.md` — system architecture, payment rails, ledger model, and deployment checklist
- `prisma/schema.prisma` — initial schema for users, wallets, ledger, deposits, withdrawals, orders, trades
- `backend/` — backend skeleton with API endpoint stubs (deposits, withdrawals, demo)
- `frontend/` — frontend skeleton (Next.js) with basic pages
- `docker-compose.yml` — local dev stack

If you need me to include a full UI mockup, OpenAPI spec, or start broker integrations now, tell me which and I will add them next.
