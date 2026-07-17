import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/site/ServiceIcon";
import { getServiceBySlug } from "@/lib/data";

// Render dinámico: los servicios se editan desde /admin y deben reflejarse
// de inmediato en el sitio público.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Servicio no encontrado" };
  return { title: service.title, description: service.summary };
}

export default async function ServicioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 circuit-grid opacity-40" />
      <Container className="relative py-16 sm:py-20">
        <Link
          href="/servicios"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" /> Todos los servicios
        </Link>

        <div className="mt-8 flex items-center gap-4">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-line bg-surface text-accent">
            <ServiceIcon name={service.icon} className="h-8 w-8" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {service.title}
          </h1>
        </div>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {service.summary}
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h2 className="font-display text-lg font-semibold text-fg">
              En qué consiste
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              {service.description}
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-ink p-7">
            <h2 className="font-display text-lg font-semibold text-fg">
              Incluye siempre
            </h2>
            <ul className="mt-4 space-y-3">
              {[
                "Interlocución con ingeniería directa",
                "Monitorización y alertas útiles",
                "Documentación entregable",
                "Revisión periódica de seguridad",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                  <CheckCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    weight="fill"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/contacto" className="mt-6 w-full">
              Consultar este servicio
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
