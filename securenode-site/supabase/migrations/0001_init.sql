-- 0001_init.sql — Esquema inicial SecureNode IT (Postgres / Supabase)
-- Traducción de prisma/schema.prisma (SQLite) a Postgres.
--   Decisión #1: identificadores camelCase entre comillas (cero cambios de campo en la app).
--   Decisión #2: IDs text con default gen_random_uuid()::text (mantiene id: string).
-- gen_random_uuid() es nativo en Postgres 13+ (sin extensiones).

-- Función de trigger que emula el @updatedAt de Prisma.
create or replace function set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new."updatedAt" = now();
  return new;
end;
$$;

-- === Service ===
create table if not exists "Service" (
  id          text primary key default gen_random_uuid()::text,
  slug        text not null unique,
  title       text not null,
  summary     text not null,
  description text not null,
  icon        text not null default 'Cube',   -- nombre de icono Phosphor
  "order"     integer not null default 0,
  published   boolean not null default true,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create trigger service_set_updated_at
  before update on "Service"
  for each row execute function set_updated_at();

-- === Testimonial ===
create table if not exists "Testimonial" (
  id           text primary key default gen_random_uuid()::text,
  author       text not null,
  role         text not null,
  company      text not null,
  quote        text not null,
  "avatarSeed" text not null default 'securenode',
  "order"      integer not null default 0,
  published    boolean not null default true,
  "createdAt"  timestamptz not null default now(),
  "updatedAt"  timestamptz not null default now()
);

create trigger testimonial_set_updated_at
  before update on "Testimonial"
  for each row execute function set_updated_at();

-- === Lead ===  (sin updatedAt, igual que en el schema Prisma)
create table if not exists "Lead" (
  id          text primary key default gen_random_uuid()::text,
  name        text not null,
  email       text not null,
  company     text,
  phone       text,
  service     text,
  message     text not null,
  status      text not null default 'nuevo',   -- nuevo | contactado | cerrado
  "createdAt" timestamptz not null default now()
);
