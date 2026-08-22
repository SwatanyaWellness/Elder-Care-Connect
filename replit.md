# Swatanya Wellness

## Project overview

Swatanya Wellness is a React + Vite single-page website for elderly care services in Gwalior, Madhya Pradesh. The site provides service information, a multilingual English/Hindi experience, caregiver registration, testimonials, FAQs, contact details, and a WhatsApp contact widget.

The live website is the deployable artifact at `artifacts/swatanya-wellness` and is served at the root preview path `/`.

## Technology

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Wouter for the single-page route
- Lucide React for icons
- pnpm workspace package management

## Website features

- English and Hindi language switching
- Responsive navigation with mobile menu
- Hero section with calls to action and trust metrics
- Healthcare, household, nanny, and emergency service information
- Step-by-step care process
- Animated credibility metrics
- Caregiver registration form with validation
- Government ID, city, duration, and photo fields
- Google Forms submission hook in the registration form
- English and Hindi family testimonials
- FAQ accordion
- Emergency hotline and contact information
- Floating WhatsApp chat panel
- Custom saffron, green, and cream visual theme

## Website folder and file reference

```text
artifacts/swatanya-wellness/
├── .replit-artifact/
│   └── artifact.toml
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ContactSection.tsx
│   │   ├── CredibilitySection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── RegistrationForm.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── WhatsAppChat.tsx
│   ├── lib/
│   │   ├── LanguageContext.tsx
│   │   └── translations.ts
│   ├── pages/
│   │   └── not-found.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .replit-artifact/artifact.toml
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Root files

- `index.html` — HTML shell loaded by Vite. Sets the page title, viewport, favicon, font preconnects, root element, and React entry script.
- `package.json` — Website package name, development/build/serve/typecheck commands, and the small set of dependencies required by the website.
- `tsconfig.json` — TypeScript settings for the website. It includes only `src` and has no dependency on the unused workspace API libraries.
- `vite.config.ts` — Vite, React, Tailwind, path alias, development server, preview server, and production output configuration. It reads `PORT` and `BASE_PATH` from the managed artifact workflow.
- `.replit-artifact/artifact.toml` — Replit artifact registration, root preview path, managed web service, development command, production build command, static output directory, and SPA rewrite.

### Public files

- `public/favicon.svg` — Browser tab icon referenced by `index.html`.

### Application entry files

- `src/main.tsx` — Creates the React root and imports the global stylesheet.
- `src/App.tsx` — Creates the page shell, configures the root Wouter route, mounts all website sections in order, and provides the language context.
- `src/index.css` — Tailwind import, theme tokens, typography, palette, shadows, animations, gradients, and global layout styles.

### Page components

- `src/components/Navbar.tsx` — Sticky desktop/mobile navigation, English/Hindi selector, emergency phone link, and registration CTA.
- `src/components/HeroSection.tsx` — Main introduction, primary actions, trust badge, and top-level statistics.
- `src/components/ServicesSection.tsx` — Presents the four care service categories and links visitors toward registration.
- `src/components/HowItWorksSection.tsx` — Explains the three-step registration, caregiver matching, and care-start process.
- `src/components/CredibilitySection.tsx` — Displays animated service metrics and trust indicators.
- `src/components/RegistrationForm.tsx` — Collects caregiver-service requests, validates fields, handles photo selection, and submits form data to Google Forms.
- `src/components/TestimonialsSection.tsx` — Displays family testimonials and the overall rating summary.
- `src/components/FAQSection.tsx` — Provides expandable answers to common service questions.
- `src/components/ContactSection.tsx` — Shows emergency contact actions, email, phone, office information, and availability.
- `src/components/Footer.tsx` — Displays branding, contact details, navigation links, social links, and legal links.
- `src/components/WhatsAppChat.tsx` — Provides the floating WhatsApp button, greeting bubble, quick replies, and WhatsApp launch actions in English and Hindi.

### Shared application files

- `src/lib/LanguageContext.tsx` — Stores the active language, exposes `setLang`, and provides `t`/`tNested` lookup helpers to all components.
- `src/lib/translations.ts` — The only translation data file. It defines the `en` and `hi` language types, selector labels, and all English/Hindi copy used by the site.
- `src/pages/not-found.tsx` — Fallback page rendered by the router for unknown paths.

## Deliberately removed website files

The following were removed because the live website does not use them:

- Unused generated UI component scaffold under `src/components/ui/`
- Unused toast and mobile helper files under `src/hooks/`
- Unused class-name utility under `src/lib/utils.ts`
- Unused `components.json` generator configuration
- Unused GitHub Pages-specific `vite.config.github.ts`
- Unused GitHub Pages `public/404.html`
- Unused `public/opengraph.jpg`
- Unused `@assets` Vite alias
- Unused API client project reference from the website TypeScript configuration
- Unused UI, charting, form, animation, and Radix dependencies from the website package

No test files, demo files, mock data files, or unused UI scaffold files are retained inside the website artifact.

## Configuration values to update

### Google Forms

`src/components/RegistrationForm.tsx` contains the `GOOGLE_FORM_URL` constant and the `entry.*` field names. Replace the placeholder form URL and field names with the real Google Forms submission endpoint before using the form in production.

### WhatsApp

`src/components/WhatsAppChat.tsx` contains the `WHATSAPP_NUMBER` constant. Keep it in international format without the plus sign.

## Commands

Run these from the workspace root:

```bash
pnpm --filter @workspace/swatanya-wellness run typecheck
pnpm --filter @workspace/swatanya-wellness run dev
pnpm --filter @workspace/swatanya-wellness run build
```

The managed website workflow supplies `PORT` and `BASE_PATH` for development and production configuration.

## Other workspace artifacts

The workspace may still contain separately registered API and Canvas preview artifacts created by the Replit environment. They are not imported by, required by, or included in the Swatanya Wellness website. The website can be maintained and deployed independently using the files documented above.

## User preferences