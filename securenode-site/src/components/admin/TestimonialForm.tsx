"use client";

import { useActionState } from "react";
import Link from "next/link";
import { WarningCircle, FloppyDisk } from "@phosphor-icons/react";
import {
  saveTestimonial,
  type TestimonialFormState,
} from "@/app/admin/(panel)/testimonios/actions";

type TestimonialData = {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatarSeed: string;
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

export function TestimonialForm({
  testimonial,
}: {
  testimonial?: TestimonialData;
}) {
  const [state, formAction, pending] = useActionState<
    TestimonialFormState,
    FormData
  >(saveTestimonial, { ok: false });

  return (
    <form action={formAction} className="space-y-5">
      {testimonial && <input type="hidden" name="id" value={testimonial.id} />}

      {state.message && (
        <div className="flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-fg">
          <WarningCircle className="h-5 w-5 shrink-0 text-accent-soft" />
          {state.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="author" className={labelClass}>
            Nombre <span className="text-accent">*</span>
          </label>
          <input
            id="author"
            name="author"
            defaultValue={testimonial?.author}
            required
            className={inputClass}
          />
          <FieldError msg={state.errors?.author} />
        </div>
        <div>
          <label htmlFor="role" className={labelClass}>
            Cargo <span className="text-accent">*</span>
          </label>
          <input
            id="role"
            name="role"
            defaultValue={testimonial?.role}
            required
            className={inputClass}
          />
          <FieldError msg={state.errors?.role} />
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          Empresa <span className="text-accent">*</span>
        </label>
        <input
          id="company"
          name="company"
          defaultValue={testimonial?.company}
          required
          className={inputClass}
        />
        <FieldError msg={state.errors?.company} />
      </div>

      <div>
        <label htmlFor="quote" className={labelClass}>
          Testimonio <span className="text-accent">*</span>
        </label>
        <textarea
          id="quote"
          name="quote"
          defaultValue={testimonial?.quote}
          rows={4}
          required
          className={`${inputClass} resize-y`}
        />
        <FieldError msg={state.errors?.quote} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="avatarSeed" className={labelClass}>
            Semilla de avatar
          </label>
          <input
            id="avatarSeed"
            name="avatarSeed"
            defaultValue={testimonial?.avatarSeed}
            placeholder="Se genera del nombre si lo dejas vacío"
            className={inputClass}
          />
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
            defaultValue={testimonial?.order ?? 0}
            className={inputClass}
          />
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-md border border-line bg-base px-3.5 py-3">
        <input
          type="checkbox"
          name="published"
          defaultChecked={testimonial?.published ?? true}
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
          {pending ? "Guardando..." : "Guardar testimonio"}
        </button>
        <Link
          href="/admin/testimonios"
          className="rounded-md px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:text-fg"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
