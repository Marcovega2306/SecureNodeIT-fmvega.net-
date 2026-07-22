import Link from "next/link";
import {
  Tray,
  Stack,
  ChatCircleText,
  DotOutline,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Lead } from "@/lib/types";
import { PageHeader } from "@/components/admin/PageHeader";

export const metadata = { title: "Resumen · Panel" };
export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default async function DashboardPage() {
  const supabase = createAdminClient();

  const [leadCountRes, newLeadCountRes, serviceCountRes, testimonialCountRes, recentLeadsRes] =
    await Promise.all([
      supabase.from("Lead").select("*", { count: "exact", head: true }),
      supabase
        .from("Lead")
        .select("*", { count: "exact", head: true })
        .eq("status", "nuevo"),
      supabase.from("Service").select("*", { count: "exact", head: true }),
      supabase.from("Testimonial").select("*", { count: "exact", head: true }),
      supabase
        .from("Lead")
        .select("*")
        .order("createdAt", { ascending: false })
        .limit(5)
        .returns<Lead[]>(),
    ]);

  if (recentLeadsRes.error) throw recentLeadsRes.error;

  const leadCount = leadCountRes.count ?? 0;
  const newLeadCount = newLeadCountRes.count ?? 0;
  const serviceCount = serviceCountRes.count ?? 0;
  const testimonialCount = testimonialCountRes.count ?? 0;
  const recentLeads = recentLeadsRes.data ?? [];

  const stats = [
    {
      label: "Leads totales",
      value: leadCount,
      hint: `${newLeadCount} sin atender`,
      icon: Tray,
      href: "/admin/leads",
    },
    {
      label: "Servicios",
      value: serviceCount,
      hint: "publicados y borradores",
      icon: Stack,
      href: "/admin/servicios",
    },
    {
      label: "Testimonios",
      value: testimonialCount,
      hint: "en el sitio",
      icon: ChatCircleText,
      href: "/admin/testimonios",
    },
  ];

  return (
    <>
      <PageHeader
        title="Resumen"
        description="Estado general del sitio y de los contactos recibidos."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/50"
          >
            <div className="flex items-center justify-between">
              <s.icon className="h-5 w-5 text-accent" weight="duotone" />
              <ArrowRight className="h-4 w-4 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-fg" />
            </div>
            <p className="mt-4 font-display text-3xl font-bold tracking-tight text-fg">
              {s.value}
            </p>
            <p className="mt-1 text-sm text-fg">{s.label}</p>
            <p className="text-xs text-muted">{s.hint}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-line bg-surface">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-base font-semibold text-fg">
            Últimos leads
          </h2>
          <Link
            href="/admin/leads"
            className="text-sm font-medium text-accent hover:text-accent-soft"
          >
            Ver todos
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-muted">
            Aún no hay leads. Los envíos del formulario de contacto aparecerán
            aquí.
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {recentLeads.map((lead) => (
              <li
                key={lead.id}
                className="flex items-center justify-between gap-4 px-5 py-3.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-fg">
                    {lead.name}
                    {lead.company ? (
                      <span className="text-muted"> · {lead.company}</span>
                    ) : null}
                  </p>
                  <p className="truncate text-xs text-muted">{lead.email}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {lead.status === "nuevo" && (
                    <span className="inline-flex items-center gap-0.5 rounded-full border border-accent/40 bg-accent/10 py-0.5 pr-2 pl-1 text-xs font-medium text-accent-soft">
                      <DotOutline weight="fill" className="h-4 w-4" /> Nuevo
                    </span>
                  )}
                  <span className="hidden text-xs text-faint sm:block">
                    {formatDate(new Date(lead.createdAt))}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
