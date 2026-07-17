import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/admin/PageHeader";
import { TestimonialForm } from "@/components/admin/TestimonialForm";

export const metadata = { title: "Nuevo testimonio · Panel" };

export default function NuevoTestimonioPage() {
  return (
    <>
      <Link
        href="/admin/testimonios"
        className="mb-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" /> Testimonios
      </Link>
      <PageHeader title="Nuevo testimonio" />
      <div className="max-w-2xl rounded-xl border border-line bg-surface p-6">
        <TestimonialForm />
      </div>
    </>
  );
}
