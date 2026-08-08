# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Applications

### Swatanya Wellness (`artifacts/swatanya-wellness`)

React + Vite frontend for an elderly care service website targeting major metro cities in India.

**Preview path:** `/`

**Features:**
- Multilingual support for English and Hindi
- Language switcher in navbar with native script labels
- Service sections: Healthcare, Household Chores, Nanny Support, Emergency Support
- Registration form with: name, age, government ID, service type, photo upload, address, city, duration
- Google Forms integration (no-cors POST) for backend data capture
- Credibility section with animated count-up metrics
- Testimonials in multiple Indian languages
- Full FAQ accordion
- Contact section with office locations and emergency hotline
- Sticky navbar with emergency phone CTA
- Warm saffron-green color theme inspired by Indian wellness culture
- Playfair Display + Inter font pairing
- WhatsApp chat widget

**Page sections (single-page app):**
- `Navbar` — sticky nav with language switcher and emergency CTA
- `HeroSection` — above-the-fold intro
- `ServicesSection` — four service categories
- `HowItWorksSection` — step-by-step process
- `CredibilitySection` — animated metric counters
- `RegistrationForm` — service sign-up form
- `TestimonialsSection` — multilingual customer testimonials
- `FAQSection` — accordion FAQ
- `ContactSection` — office locations and contact info
- `Footer` — links and legal
- `WhatsAppChat` — floating WhatsApp button

**Color theme:** Warm saffron-green palette
- Primary: Saffron orange (hsl 28 85% 45%)
- Secondary: Wellness green (hsl 145 45% 42%)
- Background: Warm cream (hsl 42 33% 97%)

**Google Forms:** The form POSTs to Google Forms via no-cors mode. Replace `GOOGLE_FORM_URL` in `RegistrationForm.tsx` with the actual Google Forms action URL and update `entry.*` field names to match your form fields.

**GitHub Pages:** Build with `pnpm --filter @workspace/swatanya-wellness run build`. Output is in `artifacts/swatanya-wellness/dist/public/`. Set `base` in `vite.config.ts` to match your GitHub Pages repo path (e.g. `/swatanya-wellness/`).

---

### API Server (`artifacts/api-server`)

**Preview path:** `/api`

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request/response validation and `@workspace/db` for persistence.

**Current endpoints:**
- `GET /api/healthz` — health check, returns `{ status: string }`

---

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   ├── swatanya-wellness/  # Swatanya Wellness website
│   └── mockup-sandbox/     # Design mockup preview server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

- **Always typecheck from the root** — run `pnpm run typecheck`
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)
Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

### `artifacts/swatanya-wellness` (`@workspace/swatanya-wellness`)
React + Vite single-page app for the Swatanya Wellness website.

### `lib/db` (`@workspace/db`)
Database layer using Drizzle ORM with PostgreSQL.

### `lib/api-spec` (`@workspace/api-spec`)
Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config.
Run codegen: `pnpm --filter @workspace/api-spec run codegen`

## User Preferences
