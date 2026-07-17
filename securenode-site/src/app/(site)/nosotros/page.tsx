import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "SecureNode IT: ingeniería de infraestructura y consultoría tecnológica con trato directo y seguridad de serie.",
};

const values = [
  {
    n: "01",
    title: "Respondemos nosotros",
    body: "No hay call center. La persona que diseñó tu entorno es la que atiende cuando algo falla.",
  },
  {
    n: "02",
    title: "Seguridad de serie",
    body: "El hardening, el cifrado y las copias verificadas no son un extra opcional. Vienen en la base.",
  },
  {
    n: "03",
    title: "Cuentas claras",
    body: "Te explicamos el porqué de cada decisión técnica y de cada euro de la factura cloud.",
  },
  {
    n: "04",
    title: "Sin ataduras",
    body: "Documentamos y entregamos. Si un día quieres internalizar la operación, tienes todo para hacerlo.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 circuit-grid opacity-50" />
        <Container className="relative py-16 sm:py-20">
          <SectionHeading eyebrow="Nosotros" title="Ingeniería que da la cara">
            SecureNode IT nace para las empresas que están hartas de proveedores
            enormes donde nadie conoce su sistema. Somos pocos, técnicos y
            responsables de lo que operamos.
          </SectionHeading>
        </Container>
      </section>

      {/* Historia — split */}
      <section className="py-16 sm:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-line">
            <Image
              src="https://picsum.photos/seed/securenode-team/900/700"
              alt="Equipo de ingeniería de SecureNode IT trabajando"
              width={900}
              height={700}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
              Operamos infraestructura crítica como si fuera nuestra
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-muted">
              <p>
                Trabajamos con empresas que no pueden permitirse una caída: desde
                clínicas y logística hasta estudios de producto digital. Cada
                entorno tiene un responsable con nombre y apellidos.
              </p>
              <p>
                Nuestra sede técnica se apoya en Azure (cuenta fvegacorporation)
                y en el dominio fmvega.net, pero somos agnósticos: elegimos la
                herramienta que mejor resuelve tu caso, no la que más nos conviene
                revender.
              </p>
            </div>
            <ButtonLink href="/contacto" className="mt-7">
              Trabajemos juntos
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Valores — lista numerada */}
      <section className="border-y border-line bg-ink py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
            Cómo trabajamos
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.n} className="bg-surface p-7">
                <span className="font-display text-sm font-bold text-accent">
                  {v.n}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-fg">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
