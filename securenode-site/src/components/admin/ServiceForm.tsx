"use client";

import { useActionState } from "react";
import Link from "next/link";
import { WarningCircle, FloppyDisk } from "@phosphor-icons/react";
import { saveService, type ServiceFormState } from "@/app/admin/(panel)/servicios/actions";

type ServiceData = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  icon: string;
  order: number;
  published: boolean;
};

const inputClass =
  "w-full rounded-md border border-line bg-base px-3.5 py-2.5 text-sm text-fg placeholder:text-faint transition-colors focus:border-accent focus:outline-none";
const labelClass = "mb-2 block text-sm font-medium text-fg";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-xs text-accent-soft">{msg}</p>;
}

export function ServiceForm({
  service,
  iconNames,
}: {
  service?: ServiceData;
  iconNames: string[];
}) {
  const [state, formAction, pending] = useActionState<
    ServiceFormState,
    FormData
  >(saveService, { ok: false });

  return (
    <form action={formAction} className="space-y-5">
      {service && <input type="hidden" name="id" value={service.id} />}

      {state.message && (
        <div className="flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-fg">
          <WarningCircle className="h-5 w-5 shrink-0 text-accent-soft" />
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="title" className={labelClass}>
          Título <span className="text-accent">*</span>
        </label>
        <input
          id="title"
          name="title"
          defaultValue={service?.title}
          required
          className={inputClass}
        />
        <FieldError msg={state.errors?.title} />
      </div>

      <div>
        <label htmlFor="slug" className={labelClass}>
          Slug (URL)
        </label>
        <input
          id="slug"
          name="slug"
          defaultValue={service?.slug}
          placeholder="Se genera del título si lo dejas vacío"
          className={inputClass}
        />
        <FieldError msg={state.errors?.slug} />
      </div>

      <div>
        <label htmlFor="summary" className={labelClass}>
          Resumen <span className="text-accent">*</span>
        </label>
        <textarea
          id="summary"
          name="summary"
          defaultValue={service?.summary}
          rows={2}
          required
          className={`${inputClass} resize-y`}
        />
        <FieldError msg={state.errors?.summary} />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Descripción <span className="text-accent">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={service?.description}
          rows={5}
          required
          className={`${inputClass} resize-y`}
        />
        <FieldError msg={state.errors?.description} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="icon" className={labelClass}>
            Icono
          </label>
          <select
            id="icon"
            name="icon"
            defaultValue={service?.icon ?? "Cube"}
            className={inputClass}
          >
            {iconNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="order" className={labelClass}>
            Orden
          </label>
          <input
            id="order"
            name="order"
            type="number"
            min={0}
            defaultValue={service?.order ?? 0}
            className={inputClass}
          />
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-md border border-line bg-base px-3.5 py-3">
        <input
          type="checkbox"
          name="published"
          defaultChecked={service?.published ?? true}
          className="h-4 w-4 accent-[var(--color-accent)]"
        />
        <span className="text-sm text-fg">
          Publicado (visible en el sitio público)
        </span>
      </label>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-soft active:translate-y-px disabled:opacity-60"
        >
          <FloppyDisk className="h-4 w-4" weight="bold" />
          {pending ? "Guardando..." : "Guardar servicio"}
        </button>
        <Link
          href="/admin/servicios"
          className="rounded-md px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:text-fg"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
