import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceCard } from "@/components/site/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/site/Reveal";
import { getPublishedServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Hosting gestionado, consultoría tecnológica, ciberseguridad, migración a la nube y operaciones 24/7.",
};

export const dynamic = "force-dynamic";

export default async function ServiciosPage() {
  const services = await getPublishedServices();

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 circuit-grid opacity-50" />
        <Container className="relative py-16 sm:py-20">
          <SectionHeading eyebrow="Servicios" title="Todo lo que sostiene tu operación">
            Un único equipo para infraestructura, seguridad y estrategia. Sin
            proveedores que se pasan la pelota.
          </SectionHeading>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 50}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>

          {services.length === 0 && (
            <p className="rounded-xl border border-line bg-surface p-8 text-center text-muted">
              Todavía no hay servicios publicados.
            </p>
          )}

          <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-line bg-ink px-6 py-12 text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg">
              ¿No sabes por dónde empezar?
            </h2>
            <p className="max-w-md text-muted">
              Cuéntanos tu situación y te decimos qué haría falta, sin humo.
            </p>
            <ButtonLink href="/contacto">Solicitar diagnóstico</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
