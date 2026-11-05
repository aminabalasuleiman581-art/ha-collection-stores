-- H&A Collection initial schema. Run in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  price numeric(12,2) not null check (price >= 0),
  category text not null default 'General',
  image_url text not null default '',
  colors text[] not null default '{}',
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  is_active boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order integer not null default 0
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  delivery_address text not null,
  city text,
  state text,
  notes text,
  subtotal numeric(12,2) not null check (subtotal >= 0),
  delivery_fee numeric(12,2) not null default 0 check (delivery_fee >= 0),
  total numeric(12,2) not null check (total >= 0),
  status text not null default 'pending' check (status in ('pending','confirmed','processing','shipped','delivered','cancelled')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','pending','paid','failed','refunded')),
  payment_reference text unique,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  unit_price numeric(12,2) not null check (unit_price >= 0),
  quantity integer not null check (quantity > 0),
  line_total numeric(12,2) not null check (line_total >= 0)
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  rating integer not null check (rating between 1 and 5),
  comment text not null,
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products(category);
create index if not exists products_active_idx on public.products(is_active);
create index if not exists orders_user_idx on public.orders(user_id);
create index if not exists orders_created_idx on public.orders(created_at desc);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.reviews enable row level security;
alter table public.newsletter_subscribers enable row level security;

create policy "Profiles read own or admin" on public.profiles for select using (auth.uid() = id or public.is_admin());
create policy "Profiles update own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "Public read categories" on public.categories for select using (true);
create policy "Admin manage categories" on public.categories for all using (public.is_admin()) with check (public.is_admin());
create policy "Public read active products" on public.products for select using (is_active = true or public.is_admin());
create policy "Admin manage products" on public.products for all using (public.is_admin()) with check (public.is_admin());
create policy "Public read product images" on public.product_images for select using (true);
create policy "Admin manage product images" on public.product_images for all using (public.is_admin()) with check (public.is_admin());
create policy "Customer read own orders" on public.orders for select using (auth.uid() = user_id or public.is_admin());
create policy "Admin manage orders" on public.orders for all using (public.is_admin()) with check (public.is_admin());
create policy "Customer read own order items" on public.order_items for select using (exists(select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_admin())));
create policy "Admin manage order items" on public.order_items for all using (public.is_admin()) with check (public.is_admin());
create policy "Public read approved reviews" on public.reviews for select using (is_approved = true or auth.uid() = user_id or public.is_admin());
create policy "Signed-in customers create reviews" on public.reviews for insert with check (auth.uid() = user_id);
create policy "Admin manage reviews" on public.reviews for all using (public.is_admin()) with check (public.is_admin());
create policy "Anyone subscribe newsletter" on public.newsletter_subscribers for insert with check (true);
create policy "Admin read subscribers" on public.newsletter_subscribers for select using (public.is_admin());

-- Create a private admin profile only after the user has signed up:
-- update public.profiles set role = 'admin' where id = '<AUTH_USER_UUID>';
-- Do not expose the service role key in browser code.
