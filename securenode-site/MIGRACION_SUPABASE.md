# Migración Prisma/SQLite → Supabase (self-hosted)

Estado: **Fase 2 — código completo y compila** (`pnpm build` en verde).
Verificación de runtime (login real + RLS + insert de lead) **pendiente** de una
instancia Supabase viva con las claves en `.env.local`.
Fechas: decisiones 2026-07-21 · implementación 2026-07-22.

Todo el trabajo está en la rama **`feat/supabase-migration`**. `main` queda intacto.

---

## Auditoría (verificada contra el código real)

- Next.js 16.2.10 + React 19 (App Router, Server Actions).
- Prisma 6.19.3 sobre **SQLite** (`file:./dev.db`). Modelos: `Service`, `Testimonial`, `Lead`.
  IDs `cuid()`; timestamps `@default(now())` / `@updatedAt`.
- Auth real: comparación en tiempo constante contra `ADMIN_USER`/`ADMIN_PASSWORD`
  (`src/lib/auth.ts`) + JWT propio HS256 con `jose`, cookie `sn_session`
  (`src/lib/session.ts`) + `src/proxy.ts` (Next 16) protegiendo `/admin/*`.
- Login por **usuario** (`type="text"`), no email.
- **Sin** storage, **sin** realtime, **sin** uploads (nada que migrar ahí).
- 12 call sites de Prisma (lista completa más abajo).
- Tipos `ServiceRecord`/`TestimonialRecord` derivados de los tipos de retorno de
  Prisma en `src/lib/data.ts`. `ServiceCard`/`QuoteCard` NO usan campos `Date`.
  Único punto sensible al cambio `Date → string`: `formatDate(lead.createdAt)`.

## Decisiones fijadas (preguntas abiertas 1-6)

1. **Naming de columnas** → camelCase entre comillas (`"avatarSeed"`, `"createdAt"`,
   `"updatedAt"`). Cero cambios en referencias de campos de la app.
2. **IDs** → `text primary key default gen_random_uuid()::text`. Mantiene el tipado
   `id: string`. Sin extensión (gen_random_uuid es nativo en PG13+).
3. **Campo de login** → relabel "Usuario" → **"Email"** (Supabase Auth es por email).
4. **Autorización admin** → **NO** "cualquier usuario autenticado". Se añade var
   `ADMIN_EMAIL` y `requireAdmin()` comprueba que el email autenticado coincide
   (allowlist de 1 email). Elimina la dependencia de "signups deshabilitados".
5. **Storage** → sin buckets (no se sube nada hoy).
6. **Realtime** → sin realtime (la frescura del panel ya la da `revalidatePath` +
   `force-dynamic`).

## Cambios previstos en Fase 2 (aún NO aplicados)

- `supabase/migrations/0001_init.sql` — 3 tablas en Postgres (camelCase citado,
  IDs text+uuid, `updatedAt` vía trigger `set_updated_at()`, índice único `Service.slug`).
- `supabase/migrations/0002_rls.sql` — RLS: `anon SELECT` donde `published=true`
  en Service/Testimonial; `anon INSERT` en Lead; sin lectura anon de Lead. CRUD admin
  vía service-role (bypass RLS) tras `requireAdmin()`.
- `supabase/seed.sql` — traducción idempotente de `prisma/seed.ts` (6 servicios + 3 testimonios).
- `src/lib/supabase/server.ts` (@supabase/ssr) y `src/lib/supabase/admin.ts`
  (service-role, **con `import "server-only"`**).
- Reescritura de los 12 call sites a `supabase-js`. `formatDate` envuelto en `new Date(...)`.
- Auth: `signInWithPassword` / `signOut` / `getUser`; `proxy.ts` con refresh de sesión
  Supabase (verificar runtime edge). `ADMIN_EMAIL` en `requireAdmin()`.
- Env: +`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAIL`. Deprecar `DATABASE_URL`, `ADMIN_USER`,
  `ADMIN_PASSWORD`, `SESSION_SECRET`.
- Deps: +`@supabase/supabase-js`, `@supabase/ssr`. Retirar (tras confirmar)
  `@prisma/client`, `prisma`, `jose`. `schema.prisma` → `.bak`.

## Advertencias registradas

- **No hay migración de datos existentes**: se re-siembra. Los leads reales en `dev.db`
  (si los hay) se perderían. Confirmar que todo es placeholder.
- **Verificación**: `pnpm build` no valida RLS ni login. Hace falta la instancia Supabase
  viva para probar de verdad. No se puede declarar "hecho" solo con build en verde.
- `admin.ts` debe llevar `import "server-only"`. La `SERVICE_ROLE_KEY` nunca en `NEXT_PUBLIC`.

## 12 call sites de Prisma a reescribir

| Archivo | Operaciones |
|---|---|
| `src/lib/prisma.ts` | singleton (se elimina) |
| `src/lib/data.ts` | service.findMany/findFirst, testimonial.findMany |
| `src/app/(site)/contacto/actions.ts` | lead.create |
| `src/app/admin/(panel)/page.tsx` | lead.count ×2, service.count, testimonial.count, lead.findMany |
| `src/app/admin/(panel)/leads/page.tsx` | lead.findMany |
| `src/app/admin/(panel)/leads/actions.ts` | lead.update, lead.delete |
| `src/app/admin/(panel)/servicios/page.tsx` | service.findMany |
| `src/app/admin/(panel)/servicios/[id]/page.tsx` | service.findUnique |
| `src/app/admin/(panel)/servicios/actions.ts` | service.findFirst/create/update/delete + publish toggle |
| `src/app/admin/(panel)/testimonios/page.tsx` | testimonial.findMany |
| `src/app/admin/(panel)/testimonios/[id]/page.tsx` | testimonial.findUnique |
| `src/app/admin/(panel)/testimonios/actions.ts` | testimonial.create/update/delete + publish toggle |

## Runbook: aplicar y verificar (cuando la instancia esté viva)

1. **Rellena `securenode-site/.env.local`** con los 4 valores (URL Kong, anon key,
   service_role key, `ADMIN_EMAIL`). El archivo ya existe como plantilla y está en `.gitignore`.
2. **Aplica el esquema** a tu Postgres de Supabase, en orden, con Studio (SQL Editor),
   `psql` o el CLI:
   - `supabase/migrations/0001_init.sql`
   - `supabase/migrations/0002_rls.sql`
   - `supabase/seed.sql`
3. **Crea el usuario admin** en Studio → Authentication → Users → Add user
   (email = `ADMIN_EMAIL`, con Auto Confirm). Pon `DISABLE_SIGNUP=true` en el `.env`
   del stack de Supabase.
4. **Verifica en local:**
   ```bash
   pnpm dev     # http://localhost:3000
   ```
   - Home / `/servicios` muestran los 6 servicios y 3 testimonios (lectura anon vía RLS).
   - Envía el formulario de `/contacto` → debe crear un Lead (anon INSERT).
   - `/admin` redirige a login; entra con `ADMIN_EMAIL` + contraseña → ves el panel.
   - Prueba CRUD de servicios/testimonios y cambio de estado/borrado de leads.
   - Comprueba que un email distinto de `ADMIN_EMAIL` **no** entra (allowlist #4).

## Limpieza pendiente (requiere tu OK)

- [ ] Retirar dependencias huérfanas: `@prisma/client`, `prisma`, `jose`
  (`pnpm remove @prisma/client prisma jose`). Ya no las importa nada; se dejaron
  instaladas por precaución.
- [ ] Borrar definitivamente `prisma/schema.prisma.bak`, `prisma/seed.ts.bak` y
  `prisma/migrations/` (SQLite) cuando confirmes que no los necesitas de referencia.
- [ ] Limpiar los scripts `db:*` de `package.json` (apuntan a Prisma).

## Estado de las tareas de Fase 2 (código)

- [x] `supabase/migrations/0001_init.sql`, `0002_rls.sql`, `supabase/seed.sql`
- [x] Clientes `src/lib/supabase/server.ts` (anon) y `admin.ts` (service_role, server-only)
- [x] Tipos `src/lib/types.ts`; `data.ts` reescrito (reads públicos vía RLS)
- [x] 12 call sites migrados a `supabase-js`; `formatDate(new Date(...))`
- [x] Auth: `getAdmin`/`requireAdmin` con allowlist `ADMIN_EMAIL`; login/logout Supabase;
  `proxy.ts` con refresco de sesión + allowlist en el edge; layout del panel con `getAdmin`
- [x] Login `Usuario → Email`
- [x] `prisma.ts`/`session.ts` borrados; `schema.prisma`/`seed.ts` → `.bak`; `.env.example` actualizado
- [x] `pnpm build` compila sin errores ni warnings
- [ ] Verificación de runtime contra instancia viva (login + RLS + insert)
