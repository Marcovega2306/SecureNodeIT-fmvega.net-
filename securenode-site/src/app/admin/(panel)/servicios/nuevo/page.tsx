import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/admin/PageHeader";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { ICON_NAMES } from "@/components/site/ServiceIcon";

export const metadata = { title: "Nuevo servicio · Panel" };

export default function NuevoServicioPage() {
  return (
    <>
      <Link
        href="/admin/servicios"
        className="mb-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" /> Servicios
      </Link>
      <PageHeader title="Nuevo servicio" />
      <div className="max-w-2xl rounded-xl border border-line bg-surface p-6">
        <ServiceForm iconNames={ICON_NAMES} />
      </div>
    </>
  );
}
