import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const services = [
  {
    slug: "hosting-gestionado",
    title: "Hosting IT gestionado",
    summary:
      "Infraestructura cloud administrada de extremo a extremo: aprovisionamos, monitorizamos y escalamos tus servidores para que tu equipo no toque una consola.",
    description:
      "Diseñamos y operamos la infraestructura que sostiene tus aplicaciones críticas. Servidores dedicados y virtuales, balanceo de carga, contenedores y bases de datos con parcheo automático, alta disponibilidad y un SLA de 99,9%. Tú te centras en tu producto; nosotros en que nunca se caiga.",
    icon: "HardDrives",
    order: 1,
  },
  {
    slug: "consultoria-tecnologica",
    title: "Consultoría tecnológica",
    summary:
      "Auditamos tu stack, identificamos cuellos de botella y trazamos una hoja de ruta técnica priorizada por impacto de negocio.",
    description:
      "Acompañamos a dirección y a los equipos técnicos en decisiones de arquitectura, elección de proveedores y modernización de sistemas heredados. Entregables concretos: diagnóstico, plan por fases y estimación de coste y riesgo. Sin PowerPoints vacíos.",
    icon: "Strategy",
    order: 2,
  },
  {
    slug: "ciberseguridad",
    title: "Ciberseguridad y cumplimiento",
    summary:
      "Hardening, gestión de accesos y respuesta a incidentes alineados con ENS, ISO 27001 y RGPD.",
    description:
      "Revisamos superficie de ataque, configuramos MFA y segmentación de red, y dejamos trazabilidad para auditorías. Incluye pruebas de intrusión controladas y un plan de respuesta ante incidentes con roles y tiempos definidos.",
    icon: "ShieldCheck",
    order: 3,
  },
  {
    slug: "migracion-cloud",
    title: "Migración a la nube",
    summary:
      "Movemos tus cargas a Azure con corte mínimo, controlando coste, rendimiento y dependencias antes de tocar producción.",
    description:
      "Inventariamos aplicaciones y datos, definimos la estrategia (rehost, replatform o rearquitectura) y ejecutamos la migración por olas. Optimizamos gasto con dimensionado correcto y reservas, y validamos cada carga antes del cambio definitivo.",
    icon: "CloudArrowUp",
    order: 4,
  },
  {
    slug: "devops-operaciones",
    title: "DevOps y operaciones 24/7",
    summary:
      "Automatizamos despliegues, observabilidad y guardias para que publicar deje de dar miedo.",
    description:
      "Pipelines de CI/CD, infraestructura como código y monitorización con alertas útiles, no ruido. Ofrecemos guardia gestionada con tiempos de respuesta comprometidos y post-mortems sin culpables para que cada incidente deje aprendizaje.",
    icon: "GearSix",
    order: 5,
  },
  {
    slug: "backup-continuidad",
    title: "Backup y continuidad",
    summary:
      "Copias verificadas, cifradas y con restauraciones probadas de verdad, no solo programadas.",
    description:
      "Diseñamos la política 3-2-1, ciframos en origen y destino y ejecutamos simulacros periódicos de recuperación. Un backup que no se ha restaurado nunca no es un backup: nosotros lo probamos por ti y documentamos el RTO y RPO reales.",
    icon: "Database",
    order: 6,
  },
];

const testimonials = [
  {
    author: "Marta Colomer",
    role: "CTO",
    company: "Grupo Levantina Logística",
    quote:
      "Migraron nuestro ERP a Azure sin un minuto de parada en horario laboral. La factura cloud bajó un 30% el primer trimestre.",
    avatarSeed: "marta-colomer",
    order: 1,
  },
  {
    author: "Rubén Ortega",
    role: "Director de Sistemas",
    company: "Clínica Dental Vallès",
    quote:
      "Pasamos una auditoría de RGPD sin sobresaltos gracias a su trabajo de hardening y trazabilidad. Responden a los incidentes antes de que los detectemos nosotros.",
    avatarSeed: "ruben-ortega",
    order: 2,
  },
  {
    author: "Nayara Beltrán",
    role: "Responsable de Producto",
    company: "Tinkora Studios",
    quote:
      "Publicar dejó de ser un evento de riesgo. Sus pipelines y su guardia nos devolvieron las noches y las semanas de despliegue.",
    avatarSeed: "nayara-beltran",
    order: 3,
  },
];

async function main() {
  console.log("Sembrando servicios...");
  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  console.log("Sembrando testimonios...");
  // Los testimonios no tienen clave natural única; solo sembramos si está vacío.
  const count = await prisma.testimonial.count();
  if (count === 0) {
    for (const t of testimonials) {
      await prisma.testimonial.create({ data: t });
    }
  }

  console.log("Seed completado.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
