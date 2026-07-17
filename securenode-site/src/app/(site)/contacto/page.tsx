import type { Metadata } from "next";
import { EnvelopeSimple, MapPin, Clock } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ContactForm } from "./ContactForm";
import { getPublishedServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntanos tu proyecto de infraestructura o consultoría. Te respondemos con una propuesta técnica.",
};

export const dynamic = "force-dynamic";

export default async function ContactoPage() {
  const services = await getPublishedServices();
  const serviceNames = services.map((s) => s.title);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 circuit-grid opacity-50" />
        <Container className="relative py-16 sm:py-20">
          <SectionHeading eyebrow="Contacto" title="Hablemos de tu infraestructura">
            Cuéntanos dónde estás y qué te preocupa. Te respondemos con una
            valoración técnica honesta, no con un presupuesto genérico.
          </SectionHeading>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <ContactForm services={serviceNames} />
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-line bg-ink p-6">
              <h2 className="font-display text-lg font-semibold text-fg">
                Otras vías
              </h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <EnvelopeSimple className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-fg">Email</p>
                    <p className="text-muted">hola@fmvega.net</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-fg">Respuesta</p>
                    <p className="text-muted">
                      Días laborables, normalmente en menos de 24 h
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-fg">Operación</p>
                    <p className="text-muted">Azure (fvegacorporation) · fmvega.net</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-accent/30 bg-surface p-6">
              <p className="text-sm leading-relaxed text-muted">
                <span className="font-semibold text-fg">Urgencia real.</span>{" "}
                Si tienes un incidente en producción y ya eres cliente, usa el
                canal de guardia que te entregamos en el onboarding.
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
