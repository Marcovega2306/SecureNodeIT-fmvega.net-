import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Service } from "@/lib/types";
import { PageHeader } from "@/components/admin/PageHeader";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { ICON_NAMES } from "@/components/site/ServiceIcon";
import { deleteService } from "../actions";

export const metadata = { title: "Editar servicio · Panel" };
export const dynamic = "force-dynamic";

export default async function EditarServicioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data: service, error } = await supabase
    .from("Service")
    .select("*")
    .eq("id", id)
    .maybeSingle<Service>();
  if (error) throw error;
  if (!service) notFound();

  return (
    <>
      <Link
        href="/admin/servicios"
        className="mb-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" /> Servicios
      </Link>
      <PageHeader
        title="Editar servicio"
        description={service.title}
        action={
          <DeleteButton
            id={service.id}
            action={deleteService}
            label="Eliminar servicio"
            confirmMessage={`¿Eliminar "${service.title}"? Esta acción no se puede deshacer.`}
          />
        }
      />
      <div className="max-w-2xl rounded-xl border border-line bg-surface p-6">
        <ServiceForm service={service} iconNames={ICON_NAMES} />
      </div>
    </>
  );
}
