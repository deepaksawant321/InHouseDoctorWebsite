# PROJECT_CONTEXT.md — InHouseDoctorWebsite (Web)

Related project: [in-house-doctor-backend](../in-house-doctor-backend/PROJECT_CONTEXT.md) (NestJS API)

## A. Project Overview

"Doctor Doorstep" — a home-doctor-visit booking platform (public marketing site + patient dashboard + admin panel) for the Mumbai market.

- **Stack**: Next.js 16.2.7 (App Router, custom fork — see note below), React 19.2.4, TypeScript, MUI 9, Emotion, TanStack Query v5, React Hook Form, Axios, Recharts, Framer Motion.
- **Architecture**: Single Next.js app serving three surfaces from one `src/app`: public site, patient `dashboard`, and `admin` panel (all client-rendered against a separate NestJS API, no server actions/DB access in this repo).
- ⚠️ **Non-standard Next.js**: [AGENTS.md](AGENTS.md) states this is a modified Next.js with breaking changes vs. the public docs — consult `node_modules/next/dist/docs/` before assuming stock behavior. Confirmed difference: middleware is authored as **`src/proxy.ts`** (default-exported `proxy()` function + `config.matcher`), not `middleware.ts`.

## B. Project Structure

| Path | Purpose |
|---|---|
| `src/app/` | Route segments (App Router). Public pages, `book/*` (multi-step booking flow), `dashboard/*` (patient area), `admin/*` (admin area, has its own `login` and a `(dashboard)` route group) |
| `src/app/blog`, `src/app/locations` | Newer/untracked additions (SEO content) |
| `src/app/sitemap.ts`, `src/app/robots.ts` | Next.js metadata route conventions |
| `src/proxy.ts` | Middleware equivalent — currently only forces `doctordoorstep.com` → `https://www.doctordoorstep.com` |
| `src/providers/` | `AppProvider` (root composition), `ThemeProvider` (MUI theme), `BookingProvider` (booking wizard state) |
| `src/services/api.ts` | **Single source of truth for all backend calls**, grouped by domain (`authApi`, `adminApi`, `bookingsApi`, `paymentsApi`, `doctorsApi`, `cmsApi`, etc.) |
| `src/services/apiClient.ts` | Axios instance: base URL from `NEXT_PUBLIC_API_URL`, attaches JWT from `localStorage` (`adminToken` on `/admin/*` paths, `token` elsewhere), 401 interceptor redirects to `/login` or `/admin/login` and clears the token |
| `src/features/home/*` | Landing-page sections (Hero, TrustBar, ServicesSection, FaqSection, Testimonials, CtaBanner, DoctorProfiles, etc.) |
| `src/features/booking/*` | `BookingStepper`, `OTPInput`, `UploadZone` — used across `book/*` steps |
| `src/features/admin/*` | Admin chrome/widgets: `AdminHeader`, `AdminSidebar`, `DataTable`, `StatsCard`, `ChartCard`, `StatusBadge` |
| `src/components/layout/` | `Header`, `Footer` (site chrome, in root layout) |
| `src/components/{common,landing,ui}` | Shared presentational components |

## C. Web Application

- **Routing**: App Router, file-based. Route groups: `admin/(dashboard)` separates the authenticated admin shell from `admin/login`. Dynamic segments: `admin/(dashboard)/bookings/[id]`, `admin/(dashboard)/doctors/[id]`, `dashboard/patients/edit/[id]`, `blog/[slug]`.
- **Booking flow** (`app/book/*`): linear wizard — `service` → `patient` → `address` → `schedule` → `payment` → `prescription` → `booking-success`. Wizard state lives in `BookingProvider` (React context, in-memory only — patientId/name, serviceId/name/amount, addressId, symptoms, scheduledDate). Has its own `layout.tsx` to wrap the steps.
- **State management**: TanStack Query for server state (client instantiated once in `AppProvider`), React Context for the booking wizard, `localStorage` for auth tokens (no global client-state library like Redux/Zustand).
- **API integration**: All HTTP calls go through `src/services/api.ts` → `apiClient` (Axios). No direct `fetch`/`axios` calls expected elsewhere — new backend calls should be added to `api.ts` following the existing per-domain export pattern.
- **Auth model**: Two independent JWTs stored in `localStorage` — `token` (patient) and `adminToken` (admin) — selected by whether the current path starts with `/admin`. Login is OTP-based for patients (`authApi.sendOtp`/`loginWithOtp`), email+password for admins (`adminAuthApi.login`).
- **UI conventions**: MUI as the component library + theme (`ThemeProvider`), Emotion for styling, Inter font via `next/font/google`, Framer Motion for animation, Recharts for admin dashboard charts.
- **SEO**: Centralized metadata in root `layout.tsx` (canonical domain `https://www.doctordoorstep.com`, OG/Twitter cards); `sitemap.ts`/`robots.ts` present.

## D. API Application

See [in-house-doctor-backend/PROJECT_CONTEXT.md](../in-house-doctor-backend/PROJECT_CONTEXT.md) for full detail. Summary: NestJS + TypeORM + MSSQL, JWT auth, base URL default `https://api.doctordoorstep.com/api` (overridable via `NEXT_PUBLIC_API_URL`), default dev port 3001.

## E. Database

Not accessed directly from this repo — all persistence is via the NestJS API.

## F. Business Logic

- Booking is a multi-step client-side wizard that only calls the API at the final `bookingsApi.create` step (plus a separate payment step). Intermediate steps just populate `BookingProvider` state.
- Admin and patient dashboards are both under this single app but gated only by which token is present — there is no server-side route protection in this repo (Next.js side); authorization is enforced by the API returning 401 and the Axios interceptor redirecting.

## G. Development Guidelines

- Add new backend calls to `src/services/api.ts` in the matching domain block; don't call `apiClient`/`axios` directly from components.
- Treat `src/proxy.ts` as this fork's middleware entry point, not `middleware.ts`.
- Before using any Next.js API you're unsure about, check `node_modules/next/dist/docs/01-app/` (this fork deviates from public Next.js docs per [AGENTS.md](AGENTS.md)).
- Follow the existing per-file default export + named sub-component pattern in `features/*`.

## H. Known Issues and Pending Work

- `PROJECT_CONTEXT.md` was empty/uninitialized until this pass.
- Several files show as modified/untracked in git with no clear commit boundary yet: `about`, `contact`, `faq`, `layout`, `page`, `services` pages, `Footer`, `Header`, and new `blog/`, `locations/`, `robots.ts`, `sitemap.ts`, `DoctorProfiles.tsx`, `TestimonialsSection.tsx`, `proxy.ts` — likely mid-feature (SEO/content expansion) work in progress.
- `test_services.html` at repo root looks like a scratch/manual test file, not part of the app.
- No visible automated test setup (no test script in `package.json`).

## I. Important File References

- Root layout / SEO: [src/app/layout.tsx](src/app/layout.tsx)
- Middleware: [src/proxy.ts](src/proxy.ts)
- API layer: [src/services/api.ts](src/services/api.ts), [src/services/apiClient.ts](src/services/apiClient.ts)
- Providers: [src/providers/AppProvider.tsx](src/providers/AppProvider.tsx), [src/providers/BookingProvider.tsx](src/providers/BookingProvider.tsx)
- Booking wizard: `src/app/book/*`
- Admin shell: `src/app/admin/(dashboard)/layout.tsx`, `src/features/admin/*`
- Non-standard Next.js notice: [AGENTS.md](AGENTS.md), `node_modules/next/dist/docs/`
