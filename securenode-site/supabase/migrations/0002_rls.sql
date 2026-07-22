-- 0002_rls.sql — Row Level Security + privilegios
--
-- Modelo de acceso:
--   Service / Testimonial : lectura pública (anon) SOLO de filas publicadas.
--   Lead                  : alta pública (anon INSERT) desde el formulario; sin lectura anon.
--   CRUD admin            : lo hace la app con la service_role key (bypassa RLS) tras requireAdmin().
--
-- PostgREST necesita GRANT ADEMÁS de las políticas: sin GRANT la tabla ni
-- siquiera es accesible; las políticas solo deciden qué FILAS se ven una vez accesible.

-- Activar RLS en las 3 tablas (están en el schema public, expuesto por la Data API).
alter table "Service"     enable row level security;
alter table "Testimonial" enable row level security;
alter table "Lead"        enable row level security;

-- Privilegios mínimos para los roles públicos.
grant select on "Service"     to anon, authenticated;
grant select on "Testimonial" to anon, authenticated;
grant insert on "Lead"        to anon, authenticated;      -- alta de leads, nada más
-- Nota: NO se concede SELECT sobre "Lead" a anon/authenticated → nadie público lee leads.

-- El panel admin opera con service_role (bypassa RLS). Grant explícito por si el
-- self-hosted no trae los defaults de Supabase.
grant all on "Service", "Testimonial", "Lead" to service_role;

-- === Políticas ===

-- Lectura pública solo de filas publicadas.
create policy "Service public read" on "Service"
  for select
  to anon, authenticated
  using (published = true);

create policy "Testimonial public read" on "Testimonial"
  for select
  to anon, authenticated
  using (published = true);

-- Alta pública de leads. Sin política de SELECT: los leads no son legibles por
-- roles públicos (solo el service_role del panel los lee).
create policy "Lead public insert" on "Lead"
  for insert
  to anon, authenticated
  with check (true);
