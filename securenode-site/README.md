# SecureNode IT — `securenode-site`

Sitio público + panel de administración para **SecureNode IT** (hosting IT y
consultoría tecnológica, dominio `fmvega.net`).

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind v4
- Prisma 6 + SQLite (`prisma/dev.db`)
- Autenticación por sesión (JWT con `jose`), un único usuario admin
- Iconos Phosphor · pnpm

## Puesta en marcha

```bash
pnpm install
pnpm db:generate     # genera el cliente Prisma
pnpm db:seed         # datos de ejemplo (servicios + testimonios)
pnpm dev             # http://localhost:3000
```

Panel de administración en `/admin`. Credenciales en `.env.local`
(ver `.env.example` para la plantilla). **Cambia la contraseña por defecto.**

## Scripts

| Script | Descripción |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm start` | Sirve el build |
| `pnpm db:generate` | Genera el cliente Prisma |
| `pnpm db:migrate` | Crea/aplica migraciones |
| `pnpm db:seed` | Siembra datos de ejemplo |
| `pnpm db:reset` | Reinicia la base de datos |

## Estructura

```
src/
  app/
    (site)/        Sitio público (home, servicios, nosotros, proceso, contacto)
    admin/
      login/       Acceso al panel
      (panel)/     Dashboard + CRUD (leads, servicios, testimonios)
  components/      UI del sitio y del panel
  lib/             prisma, auth, sesión, consultas
  proxy.ts         Protege /admin/* (convención Next 16)
prisma/
  schema.prisma    Modelos Service, Testimonial, Lead
  seed.ts          Datos de ejemplo
```

## Notas

- El contenido editable (servicios, testimonios) se lee dinámicamente de la base
  de datos, por lo que los cambios del panel se reflejan al instante en el sitio.
- Las imágenes usan `picsum.photos` como placeholder. Sustituir por assets reales.
- Sin despliegue real a Azure/DNS: son solo referencia en el contenido.
- Decisiones tomadas de forma autónoma y credenciales a configurar: ver
  `PENDIENTES_REVISION.md`.
