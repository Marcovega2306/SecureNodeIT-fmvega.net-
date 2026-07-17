import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteTestimonial } from "../actions";

export const metadata = { title: "Editar testimonio · Panel" };
export const dynamic = "force-dynamic";

export default async function EditarTestimonioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <>
      <Link
        href="/admin/testimonios"
        className="mb-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" /> Testimonios
      </Link>
      <PageHeader
        title="Editar testimonio"
        description={`${testimonial.author} · ${testimonial.company}`}
        action={
          <DeleteButton
            id={testimonial.id}
            action={deleteTestimonial}
            label="Eliminar"
            confirmMessage={`¿Eliminar el testimonio de ${testimonial.author}? Esta acción no se puede deshacer.`}
          />
        }
      />
      <div className="max-w-2xl rounded-xl border border-line bg-surface p-6">
        <TestimonialForm testimonial={testimonial} />
      </div>
    </>
  );
}
