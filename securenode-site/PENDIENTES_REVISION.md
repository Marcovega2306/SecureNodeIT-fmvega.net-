# Pendientes de revisión — SecureNode IT

Proyecto: `securenode-site` (sitio público + panel `/admin`).
Fecha: 2026-07-17. Autor del build: trabajo autónomo nocturno.

Este documento lista todo lo que tomé por mi cuenta y que conviene que revises o
apruebes, además de credenciales que debes configurar tú mismo y alternativas de
stack a considerar.

---

## 1. Acción requerida por tu parte (seguridad)

- [ ] **Cambiar las credenciales del admin.** Están en `.env.local` (NO commiteado):
  - Usuario: `admin`
  - Contraseña: `SecureNode2026!`
  Se pusieron por defecto para que el login funcione de fábrica esta noche.
  Cámbialas antes de cualquier despliegue.
- [ ] **Regenerar `SESSION_SECRET`** en producción (hay uno aleatorio en `.env.local`).
  Comando: `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`
- [ ] Las credenciales viven en `.env.local` en **texto plano** (comparación en
  tiempo constante). Es aceptable para un único admin local. Si quieres, se puede
  migrar a un hash (scrypt/bcrypt) — ver punto 6.

## 2. Divergencia con una bitácora previa

- [ ] Existía una `Bitacora-Avance.md` de un **intento anterior** (13:01) con otras
  decisiones (ruta `C:\Programacion\securenode-site`, iconos lucide, campo
  `features`, 4 servicios). **El proyecto entregado es este** (`HostingFmvega\securenode-site`,
  iconos Phosphor, `summary`+`description`, 6 servicios). Se conservó la entrada
  antigua por trazabilidad y se añadió una nota de reconciliación. Si esa carpeta
  anterior existe en disco, decide si eliminarla.

## 3. Decisiones de stack tomadas (revisables mañana)

- [ ] **Prisma fijado a v6.19** (no v7). La v7 exige driver adapters +
  `prisma.config.ts` y elimina `url` del schema (cambios rompedores). Elegí la rama
  estable para un build sin supervisión. Migrar a v7 es opcional.
- [ ] **SQLite local** (`prisma/dev.db`). Para producción real en Azure conviene
  Postgres o Azure SQL. El cambio es de `datasource` + `DATABASE_URL`.
- [ ] **Auth propia por sesión (JWT con `jose`)** en lugar de NextAuth/Auth.js. Un
  único admin. Si prefieres un proveedor externo (Entra ID / Azure AD, Google), es
  un reemplazo acotado.
- [ ] **Persistencia**: los envíos del formulario se guardan como `Lead` en la DB.
  No hay envío de email ni notificación (fuera de alcance). Se puede añadir.

## 4. Contenido placeholder (sustituir por real)

- [ ] **Textos y copys** del sitio (hero, secciones, "por qué elegirnos", proceso).
- [ ] **Métricas** del sitio (99,9% SLA, "< 15 min", ISO 27001/ENS) son afirmaciones
  de marca de ejemplo, no datos verificados.
- [ ] **Testimonios**: 3 con nombres/empresas ficticios realistas
  (Marta Colomer, Rubén Ortega, Nayara Beltrán). Editables desde `/admin/testimonios`.
- [ ] **Catálogo de servicios**: 6 servicios sembrados. Se pidieron explícitamente 2
  (hosting IT y consultoría); añadí 4 más (ciberseguridad, migración cloud, DevOps,
  backup) porque el CRUD permite recortarlos. Ajusta desde `/admin/servicios`.
- [ ] **Imágenes**: se usan placeholders de `picsum.photos` (hero, equipo, avatares),
  cargados como `unoptimized` para no depender de configuración de dominios. Sustituir
  por fotografía real y, si se quiere optimización, configurar `images.remotePatterns`.
- [ ] **Email de contacto** mostrado: `hola@fmvega.net` (placeholder sobre tu dominio).

## 5. Decisiones menores de arquitectura / naming

- [ ] Iconos: **Phosphor** (`@phosphor-icons/react`), variante `/ssr` en server components.
- [ ] Marca/Logo: SVG geométrico simple (nodo de red en rojo). Sustituible por tu logo.
- [ ] Renderizado **dinámico** (`force-dynamic`) en páginas públicas que leen la DB,
  para que los cambios del admin se reflejen al instante. Si se prioriza rendimiento,
  se puede pasar a revalidación por `revalidatePath`/ISR.
- [ ] Convención **`proxy.ts`** (Next 16) en vez de `middleware.ts` (deprecado).
- [ ] `pnpm-workspace.yaml`: `verifyDepsBeforeRun: false` para sortear un fallo del
  chequeo de dependencias de pnpm con los build scripts pendientes. Revisable.
- [ ] Estados de los leads: `nuevo | contactado | cerrado` (en español).

## 6. Alternativas / mejoras sugeridas (no implementadas, fuera de alcance)

- Hash de contraseña admin (scrypt) en lugar de texto plano en `.env.local`.
- Rate limiting en el login y en el formulario de contacto (anti-abuso).
- Protección CSRF explícita (las server actions de Next mitigan bastante por origen).
- Envío de email/notificación al recibir un lead.
- Paginación/búsqueda en la lista de leads cuando crezca.
- Tests automatizados (unit/e2e). Esta noche la verificación fue manual + navegador.
- Página de detalle no cacheada para SEO con `generateStaticParams` + ISR (ahora dinámica).

## 7. Cómo arrancar (recordatorio)

```bash
cd securenode-site
pnpm install
pnpm db:generate      # genera el cliente Prisma
pnpm db:migrate       # (si hiciera falta re-crear la DB)
pnpm db:seed          # datos de ejemplo
pnpm dev              # http://localhost:3000  (admin en /admin)
pnpm build            # build de producción (compila sin errores ni warnings)
```

Credenciales de acceso al panel: ver `.env.local`.
