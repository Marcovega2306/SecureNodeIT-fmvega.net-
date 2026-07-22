import { Tray } from "@phosphor-icons/react/dist/ssr";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Lead } from "@/lib/types";
import { PageHeader } from "@/components/admin/PageHeader";
import { LeadControls } from "@/components/admin/LeadControls";

export const metadata = { title: "Leads · Panel" };
export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

const statusStyles: Record<string, string> = {
  nuevo: "border-accent/40 bg-accent/10 text-accent-soft",
  contactado: "border-line bg-surface-2 text-fg",
  cerrado: "border-line bg-base text-faint",
};

export default async function LeadsPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("Lead")
    .select("*")
    .order("createdAt", { ascending: false })
    .returns<Lead[]>();
  if (error) throw error;
  const leads = data ?? [];

  return (
    <>
      <PageHeader
        title="Leads"
        description={`${leads.length} contacto${leads.length === 1 ? "" : "s"} recibido${leads.length === 1 ? "" : "s"} desde el formulario público.`}
      />

      {leads.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line bg-surface px-6 py-16 text-center">
          <Tray className="h-8 w-8 text-faint" />
          <p className="text-sm text-muted">
            Todavía no hay leads. Cuando alguien envíe el formulario de
            contacto, aparecerá en esta lista.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <article
              key={lead.id}
              className="rounded-xl border border-line bg-surface p-5"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-base font-semibold text-fg">
                      {lead.name}
                    </h2>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${
                        statusStyles[lead.status] ?? statusStyles.cerrado
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-sm text-muted">
                    <a
                      href={`mailto:${lead.email}`}
                      className="hover:text-fg"
                    >
                      {lead.email}
                    </a>
                    {lead.phone && <span>{lead.phone}</span>}
                    {lead.company && <span>{lead.company}</span>}
                  </div>
                </div>
                <LeadControls id={lead.id} status={lead.status} />
              </div>

              {lead.service && (
                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-faint">
                  Interés: <span className="text-muted">{lead.service}</span>
                </p>
              )}

              <p className="mt-3 rounded-lg border border-line bg-base p-3.5 text-sm leading-relaxed text-fg/90">
                {lead.message}
              </p>

              <p className="mt-3 text-xs text-faint">
                {formatDate(new Date(lead.createdAt))}
              </p>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
