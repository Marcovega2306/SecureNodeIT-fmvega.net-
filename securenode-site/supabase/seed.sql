-- seed.sql — datos de ejemplo (6 servicios + 3 testimonios). Idempotente.
-- Traducción de prisma/seed.ts. Ejecutar tras 0001/0002.

-- Servicios: clave natural = slug → upsert (igual que el seed original).
insert into "Service" (slug, title, summary, description, icon, "order") values
  ('hosting-gestionado', 'Hosting IT gestionado',
   'Infraestructura cloud administrada de extremo a extremo: aprovisionamos, monitorizamos y escalamos tus servidores para que tu equipo no toque una consola.',
   'Diseñamos y operamos la infraestructura que sostiene tus aplicaciones críticas. Servidores dedicados y virtuales, balanceo de carga, contenedores y bases de datos con parcheo automático, alta disponibilidad y un SLA de 99,9%. Tú te centras en tu producto; nosotros en que nunca se caiga.',
   'HardDrives', 1),
  ('consultoria-tecnologica', 'Consultoría tecnológica',
   'Auditamos tu stack, identificamos cuellos de botella y trazamos una hoja de ruta técnica priorizada por impacto de negocio.',
   'Acompañamos a dirección y a los equipos técnicos en decisiones de arquitectura, elección de proveedores y modernización de sistemas heredados. Entregables concretos: diagnóstico, plan por fases y estimación de coste y riesgo. Sin PowerPoints vacíos.',
   'Strategy', 2),
  ('ciberseguridad', 'Ciberseguridad y cumplimiento',
   'Hardening, gestión de accesos y respuesta a incidentes alineados con ENS, ISO 27001 y RGPD.',
   'Revisamos superficie de ataque, configuramos MFA y segmentación de red, y dejamos trazabilidad para auditorías. Incluye pruebas de intrusión controladas y un plan de respuesta ante incidentes con roles y tiempos definidos.',
   'ShieldCheck', 3),
  ('migracion-cloud', 'Migración a la nube',
   'Movemos tus cargas a Azure con corte mínimo, controlando coste, rendimiento y dependencias antes de tocar producción.',
   'Inventariamos aplicaciones y datos, definimos la estrategia (rehost, replatform o rearquitectura) y ejecutamos la migración por olas. Optimizamos gasto con dimensionado correcto y reservas, y validamos cada carga antes del cambio definitivo.',
   'CloudArrowUp', 4),
  ('devops-operaciones', 'DevOps y operaciones 24/7',
   'Automatizamos despliegues, observabilidad y guardias para que publicar deje de dar miedo.',
   'Pipelines de CI/CD, infraestructura como código y monitorización con alertas útiles, no ruido. Ofrecemos guardia gestionada con tiempos de respuesta comprometidos y post-mortems sin culpables para que cada incidente deje aprendizaje.',
   'GearSix', 5),
  ('backup-continuidad', 'Backup y continuidad',
   'Copias verificadas, cifradas y con restauraciones probadas de verdad, no solo programadas.',
   'Diseñamos la política 3-2-1, ciframos en origen y destino y ejecutamos simulacros periódicos de recuperación. Un backup que no se ha restaurado nunca no es un backup: nosotros lo probamos por ti y documentamos el RTO y RPO reales.',
   'Database', 6)
on conflict (slug) do update set
  title       = excluded.title,
  summary     = excluded.summary,
  description = excluded.description,
  icon        = excluded.icon,
  "order"     = excluded."order";

-- Testimonios: sin clave natural única. Se siembran solo si la tabla está vacía
-- (mismo criterio que el seed original), de modo que re-ejecutar no duplica.
insert into "Testimonial" (author, role, company, quote, "avatarSeed", "order")
select * from (values
  ('Marta Colomer', 'CTO', 'Grupo Levantina Logística',
   'Migraron nuestro ERP a Azure sin un minuto de parada en horario laboral. La factura cloud bajó un 30% el primer trimestre.',
   'marta-colomer', 1),
  ('Rubén Ortega', 'Director de Sistemas', 'Clínica Dental Vallès',
   'Pasamos una auditoría de RGPD sin sobresaltos gracias a su trabajo de hardening y trazabilidad. Responden a los incidentes antes de que los detectemos nosotros.',
   'ruben-ortega', 2),
  ('Nayara Beltrán', 'Responsable de Producto', 'Tinkora Studios',
   'Publicar dejó de ser un evento de riesgo. Sus pipelines y su guardia nos devolvieron las noches y las semanas de despliegue.',
   'nayara-beltran', 3)
) as t(author, role, company, quote, "avatarSeed", "order")
where not exists (select 1 from "Testimonial");
