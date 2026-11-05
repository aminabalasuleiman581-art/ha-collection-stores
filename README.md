# H&A Collection — E-commerce starter

A responsive Next.js storefront starter for H&A Collection, a handmade bags and bedsheets business in Jos, Nigeria.

## Included
- Responsive home, shop, product, about, contact and cart pages.
- Demo product catalogue (replace with real products, prices and images).
- Cart state for the current browser session.
- WhatsApp order handoff using the business number.
- Optional OpenAI-powered shopping assistant API route.
- Supabase-ready product query and initial SQL schema with RLS policies.
- Cream, cocoa and warm-neutral visual identity.

## Important status
This ZIP is a **starter application**, not a fully configured production store. You must connect your own Supabase and OpenAI projects, enter credentials, add real product data, configure storage and test the app. Paystack checkout, customer sign-in, order creation and a complete admin dashboard are not implemented in this starter yet. Do not accept online payments until server-side payment initialization and verification have been implemented and tested.

## Requirements
- Node.js 20.9 or newer
- npm
- A Supabase project (optional for local preview)
- OpenAI API key (optional; without it the assistant gives a contact fallback)

## Run locally
1. Extract the ZIP.
2. Open the extracted `ha-collection-store` folder in VS Code.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local`.
5. Add your Supabase URL and anon key if using Supabase.
6. Run `npm run dev`.
7. Open http://localhost:3000.

Without Supabase credentials, the storefront uses the sample catalogue in `lib/products.ts`.

## Supabase setup
1. Create a Supabase project.
2. Open SQL Editor and run `supabase/migrations/001_initial_schema.sql`.
3. In Project Settings → API, copy the Project URL and anon/public key into `.env.local`.
4. Create a public Storage bucket named `product-images` if you plan to add product image uploads later.
5. Add products to `public.products`. Required fields include `name`, `slug`, `description`, `price`, `category`, `image_url`, `is_active`, `featured`, `stock_quantity`.
6. The app reads active products from Supabase and falls back to demo products if the database is empty or unavailable.

### Admin role
The schema includes a `profiles.role` field and an `is_admin()` helper. Create a user through Supabase Auth, create their matching profile row, then set their role to `admin` from the SQL editor. Never allow public users to update their own role. For a production admin dashboard, implement server-side authorization and carefully scoped policies before exposing management actions.

## OpenAI setup
Add `OPENAI_API_KEY` to `.env.local` (local) and Vercel Environment Variables (deployment). It is used only by `app/api/chat/route.ts` on the server. Never add it to a `NEXT_PUBLIC_` variable.

## Vercel deployment
1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Set the environment variables from `.env.example`.
4. Deploy.
5. Add the deployed site URL as `NEXT_PUBLIC_SITE_URL`.

## Business details
- H&A Collection
- Phone / WhatsApp: 09017652705
- WhatsApp link: https://wa.me/2349017652705
- Address: Rikkos New Layout, Jos North LGA, Plateau State, Nigeria.
- Currency: Nigerian Naira (NGN)

## Before launch checklist
- Replace demo product descriptions, prices and images with verified business information.
- Confirm product availability, colour options, sizes and delivery fees with the business.
- Add proper customer authentication and secure order creation.
- Build and test the admin dashboard.
- Implement Paystack initialization and server-side verification before accepting card/bank payments.
- Review Supabase RLS policies and storage policies.
- Add privacy policy, terms, delivery and returns information.
- Run `npm run build` and test on mobile and desktop.
