import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ServiceIcon } from "@/components/site/ServiceIcon";
import { type ServiceRecord } from "@/lib/data";

export function ServiceCard({
  service,
  featured = false,
}: {
  service: ServiceRecord;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/servicios/${service.slug}`}
      className={`group relative flex flex-col rounded-xl border border-line bg-surface p-6 transition-all duration-200 hover:border-accent/60 hover:bg-surface-2 ${
        featured ? "sm:col-span-2 sm:flex-row sm:items-start sm:gap-6" : ""
      }`}
    >
      <div className="mb-4 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-base text-accent transition-colors group-hover:border-accent/50 sm:mb-0">
        <ServiceIcon name={service.icon} className="h-6 w-6" />
      </div>
      <div className={featured ? "sm:pt-1" : ""}>
        <h3 className="font-display text-lg font-semibold tracking-tight text-fg">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {service.summary}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
          Ver detalle
          <ArrowRight className="h-4 w-4" weight="bold" />
        </span>
      </div>
    </Link>
  );
}
