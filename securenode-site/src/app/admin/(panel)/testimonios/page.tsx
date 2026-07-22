import Link from "next/link";
import { Plus, PencilSimple, ChatCircleText } from "@phosphor-icons/react/dist/ssr";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Testimonial } from "@/lib/types";
import { PageHeader } from "@/components/admin/PageHeader";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { toggleTestimonialPublished } from "./actions";

export const metadata = { title: "Testimonios · Panel" };
export const dynamic = "force-dynamic";

export default async function AdminTestimoniosPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("Testimonial")
    .select("*")
    .order("order", { ascending: true })
    .order("createdAt", { ascending: true })
    .returns<Testimonial[]>();
  if (error) throw error;
  const testimonials = data ?? [];

  return (
    <>
      <PageHeader
        title="Testimonios"
        description="Reseñas de clientes que aparecen en el sitio público."
        action={
          <Link
            href="/admin/testimonios/nuevo"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-soft active:translate-y-px"
          >
            <Plus className="h-4 w-4" weight="bold" />
            Nuevo testimonio
          </Link>
        }
      />

      {testimonials.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line bg-surface px-6 py-16 text-center">
          <ChatCircleText className="h-8 w-8 text-faint" />
          <p className="text-sm text-muted">
            No hay testimonios todavía. Añade el primero.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex items-start gap-4 rounded-xl border border-line bg-surface p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-base font-semibold text-fg">
                    {t.author}
                  </h2>
                  <span className="text-xs text-muted">
                    {t.role}, {t.company}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted">
                  “{t.quote}”
                </p>
              </div>

              <PublishToggle
                id={t.id}
                published={t.published}
                action={toggleTestimonialPublished}
              />

              <Link
                href={`/admin/testimonios/${t.id}`}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-accent/50 hover:text-fg"
                aria-label={`Editar testimonio de ${t.author}`}
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
