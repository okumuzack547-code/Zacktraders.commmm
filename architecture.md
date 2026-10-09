# Tradescheme MVP Architecture

## 1. Goals

Tradescheme is a web + mobile-friendly trading platform scaffold designed to support:
- vanilla options trading workflows
- paper/demo account flows
- deposit and withdrawal lifecycle management
- wallet and ledger reconciliation
- future broker integrations behind a service boundary

This scaffold intentionally avoids live-money execution until legal, compliance, and brokerage requirements are satisfied.

## 2. System overview

```text
Browser / Mobile App
        |
        v
Frontend (Next.js)
        |
        v
Backend API (Node.js + Express + TypeScript)
        |\
        | \-- Rest API / domain service layer
        |
        +--> PostgreSQL (core transactional store)
        +--> Redis (queues, rate limits, cache)
        +--> Prisma ORM
        +--> Broker Adapter Layer (future provider integration)
```

## 3. Core domains

### Users
- identity and KYC metadata
- role and permissions
- account status (`draft`, `active`, `suspended`, `closed`)

### Wallets
- per-user wallet balances
- fiat and crypto balances tracked separately if needed
- wallet status and ledger synchronization

### Ledger
- append-only accounting system
- immutable entries with `type`, `amount`, `currency`, `reference_id`, `balance_after`
- critical for reconciliation and audit trail

### Orders and trades
- order creation and validation
- trade lifecycle states (`queued`, `filled`, `partial`, `cancelled`, `rejected`)
- associated strategy metadata for future UI displays

### Deposits and withdrawals
- pending, approved, rejected, processed, and failed states
- linked to ledger entries
- operational and compliance review queue

## 4. Data model principles

- transactions are append-only
- balances are derived from ledger history or maintained in a synchronized view
- all external broker calls move through an adapter interface
- no live-money provider credentials are committed to the repo
- secrets are sourced from environment variables or a managed secret store

## 5. API boundaries

### Public API
- `POST /api/demo/accounts`
- `GET /api/demo/accounts/:id`
- `POST /api/deposits`
- `POST /api/withdrawals`
- `GET /api/orders`
- `POST /api/orders`

### Internal service boundaries
- `AuthService`
- `WalletService`
- `LedgerService`
- `OrderService`
- `BrokerAdapter`
- `ComplianceReviewService`

## 6. Deployment checklist

- configure PostgreSQL and Redis in Docker Compose or a managed environment
- store secrets in GitHub Actions secrets or a vault/KMS service
- enable rate limiting, CORS policy, and request validation
- use Prisma migrations for schema changes
- configure log retention and alerting
- define a production readiness gate before any live trading activation

## 7. Security and compliance notes

- do not accept customer funds before legal and KYC review
- do not enable live trading without broker/custodian integration review
- implement server-side validation for every user action affecting funds
- restrict admin routes behind strict authentication and authorization
- encrypt secrets at rest and in transit

## 8. Recommended next milestone

- add auth and session handling
- add ledger entry service tests
- add real broker adapter interfaces with mock implementation
- add kyc workflow and compliance review screens
- prepare OpenAPI and frontend contract generation
