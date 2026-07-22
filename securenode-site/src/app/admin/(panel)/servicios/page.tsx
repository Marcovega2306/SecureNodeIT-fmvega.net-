import Link from "next/link";
import { Plus, PencilSimple, Stack } from "@phosphor-icons/react/dist/ssr";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Service } from "@/lib/types";
import { PageHeader } from "@/components/admin/PageHeader";
import { ServiceIcon } from "@/components/site/ServiceIcon";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { toggleServicePublished } from "./actions";

export const metadata = { title: "Servicios · Panel" };
export const dynamic = "force-dynamic";

export default async function AdminServiciosPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("Service")
    .select("*")
    .order("order", { ascending: true })
    .order("createdAt", { ascending: true })
    .returns<Service[]>();
  if (error) throw error;
  const services = data ?? [];

  return (
    <>
      <PageHeader
        title="Servicios"
        description="Gestiona los servicios que se muestran en el sitio público."
        action={
          <Link
            href="/admin/servicios/nuevo"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-soft active:translate-y-px"
          >
            <Plus className="h-4 w-4" weight="bold" />
            Nuevo servicio
          </Link>
        }
      />

      {services.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line bg-surface px-6 py-16 text-center">
          <Stack className="h-8 w-8 text-faint" />
          <p className="text-sm text-muted">
            No hay servicios todavía. Crea el primero.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4"
            >
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-base text-accent">
                <ServiceIcon name={service.icon} className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="truncate font-display text-base font-semibold text-fg">
                    {service.title}
                  </h2>
                  <span className="hidden text-xs text-faint sm:inline">
                    /{service.slug}
                  </span>
                </div>
                <p className="truncate text-sm text-muted">{service.summary}</p>
              </div>

              <PublishToggle
                id={service.id}
                published={service.published}
                action={toggleServicePublished}
              />

              <Link
                href={`/admin/servicios/${service.id}`}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-accent/50 hover:text-fg"
                aria-label={`Editar ${service.title}`}
              >
                <PencilSimple className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
