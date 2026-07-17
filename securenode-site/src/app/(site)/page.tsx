import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Pulse,
  Clock,
  Certificate,
  CloudArrowUp,
  Lightning,
} from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceCard } from "@/components/site/ServiceCard";
import { QuoteCard } from "@/components/site/QuoteCard";
import { Reveal } from "@/components/site/Reveal";
import { getPublishedServices, getPublishedTestimonials } from "@/lib/data";

// Contenido editable desde /admin: render dinámico para reflejar cambios.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [services, testimonials] = await Promise.all([
    getPublishedServices(),
    getPublishedTestimonials(),
  ]);

  const stats = [
    { icon: Pulse, value: "99,9%", label: "SLA de disponibilidad" },
    { icon: Clock, value: "< 15 min", label: "Respuesta en incidentes" },
    { icon: ShieldCheck, value: "24/7", label: "Guardia gestionada" },
    { icon: Certificate, value: "ISO 27001", label: "y Esquema Nacional de Seguridad" },
  ];

  const reasons = [
    {
      icon: Lightning,
      title: "Ingeniería, no tickets",
      body: "Hablas directamente con quien opera tu infraestructura. Sin niveles de soporte que rebotan tu problema.",
    },
    {
      icon: ShieldCheck,
      title: "Seguridad desde el día cero",
      body: "Cada entorno nace con hardening, cifrado y trazabilidad. No es un extra que se factura aparte.",
    },
    {
      icon: CloudArrowUp,
      title: "Sin dependencia forzada",
      body: "Documentamos todo y te lo entregamos. Si algún día quieres llevarte la operación, puedes.",
    },
  ];

  return (
    <>
      {/* ---------- Hero: split asimétrico ---------- */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 circuit-grid opacity-60" />
        <div className="pointer-events-none absolute inset-0 radial-accent" />
        <Container className="relative grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div className="reveal">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 text-xs font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Hosting IT y consultoría · fmvega.net
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl">
              Tu infraestructura,{" "}
              <span className="text-accent text-glow">siempre en pie</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Gestionamos, aseguramos y escalamos los sistemas que sostienen tu
              negocio. Tú te dedicas a tu producto; nosotros a que no se caiga.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contacto" variant="primary">
                Hablar con un ingeniero
                <ArrowRight className="h-4 w-4" weight="bold" />
              </ButtonLink>
              <ButtonLink href="/servicios" variant="outline">
                Ver servicios
              </ButtonLink>
            </div>
          </div>

          <div className="reveal relative">
            <div className="glow-accent overflow-hidden rounded-2xl border border-line">
              <Image
                src="https://picsum.photos/seed/securenode-datacenter/900/1000"
                alt="Sala de servidores gestionada por SecureNode IT"
                width={900}
                height={1000}
                className="h-full w-full object-cover opacity-90"
                priority
                unoptimized
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base via-base/30 to-transparent" />
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Franja de métricas ---------- */}
      <section className="border-b border-line bg-ink">
        <Container className="grid grid-cols-2 gap-px overflow-hidden py-0 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-2 px-2 py-8 sm:px-6"
            >
              <s.icon className="h-6 w-6 text-accent" weight="duotone" />
              <p className="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                {s.value}
              </p>
              <p className="text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* ---------- Servicios (dinámico) ---------- */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Qué hacemos" title="Servicios">
            De la máquina virtual a la estrategia de nube. Todo lo que necesitas
            para operar sin sobresaltos, bajo un mismo equipo.
          </SectionHeading>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 60}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Por qué elegirnos (bento) ---------- */}
      <section className="border-y border-line bg-ink py-20 sm:py-24">
        <Container>
          <SectionHeading title="Por qué elegirnos">
            No somos el proveedor más grande. Somos el que responde el teléfono a
            las 3 de la mañana y sabe exactamente qué está pasando.
          </SectionHeading>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="rounded-xl border border-line bg-surface p-6"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-base text-accent">
                  <r.icon className="h-6 w-6" weight="duotone" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-fg">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Testimonios (dinámico) ---------- */}
      {testimonials.length > 0 && (
        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading eyebrow="Clientes" title="Lo que dicen de nosotros" />
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={t.id} delay={i * 60}>
                  <QuoteCard item={t} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ---------- CTA final ---------- */}
      <section className="pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-surface px-6 py-14 text-center sm:px-12">
            <div className="pointer-events-none absolute inset-0 radial-accent" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
                ¿Hablamos de tu infraestructura?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
                Una primera conversación técnica, sin compromiso, para entender
                dónde estás y qué haría falta.
              </p>
              <div className="mt-8 flex justify-center">
                <ButtonLink href="/contacto" variant="primary">
                  Solicitar diagnóstico
                  <ArrowRight className="h-4 w-4" weight="bold" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
