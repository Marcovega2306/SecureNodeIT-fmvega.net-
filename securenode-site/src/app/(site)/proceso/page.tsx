import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import {
  MagnifyingGlass,
  PenNib,
  Wrench,
  Gauge,
  ArrowsClockwise,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Proceso de trabajo",
  description:
    "Cómo trabajamos: diagnóstico, diseño, implementación, operación y mejora continua.",
};

const steps = [
  {
    icon: MagnifyingGlass,
    title: "Diagnóstico",
    body: "Auditamos tu infraestructura, dependencias y riesgos. Salimos con un mapa real de dónde estás y qué duele.",
  },
  {
    icon: PenNib,
    title: "Diseño",
    body: "Proponemos una arquitectura por fases, con coste y riesgo estimados. Decides con datos, no con intuiciones.",
  },
  {
    icon: Wrench,
    title: "Implementación",
    body: "Ejecutamos por olas, con ventanas de cambio controladas y rollback preparado. Sin sorpresas en producción.",
  },
  {
    icon: Gauge,
    title: "Operación",
    body: "Monitorizamos, parcheamos y respondemos a incidentes 24/7 con tiempos comprometidos.",
  },
  {
    icon: ArrowsClockwise,
    title: "Mejora continua",
    body: "Revisamos coste, rendimiento y seguridad cada trimestre. La infraestructura evoluciona con tu negocio.",
  },
];

export default function ProcesoPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 circuit-grid opacity-50" />
        <Container className="relative py-16 sm:py-20">
          <SectionHeading eyebrow="Proceso" title="De la incertidumbre a la calma operativa">
            Un método repetible que aplicamos con cada cliente. Sin improvisar,
            sin dependencias ocultas.
          </SectionHeading>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <ol className="relative space-y-8 border-l border-line pl-8 sm:pl-10">
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="absolute -left-[43px] flex h-8 w-8 items-center justify-center rounded-full border border-accent/50 bg-base text-accent sm:-left-[51px]">
                  <s.icon className="h-4 w-4" weight="bold" />
                </span>
                <div className="rounded-xl border border-line bg-surface p-6">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm font-bold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-fg">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-accent/30 bg-surface px-6 py-12 text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg">
              Empecemos por el diagnóstico
            </h2>
            <p className="max-w-md text-muted">
              La primera conversación es gratuita y sin compromiso.
            </p>
            <ButtonLink href="/contacto">Solicitar diagnóstico</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
