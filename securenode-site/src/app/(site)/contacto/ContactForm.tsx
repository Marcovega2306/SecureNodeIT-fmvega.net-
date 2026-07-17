"use client";

import { useActionState } from "react";
import { CheckCircle, WarningCircle, PaperPlaneTilt } from "@phosphor-icons/react";
import { submitLead, type ContactState } from "./actions";

const initialState: ContactState = { ok: false };

const inputClass =
  "w-full rounded-md border border-line bg-base px-3.5 py-2.5 text-sm text-fg placeholder:text-faint transition-colors focus:border-accent focus:outline-none";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-xs text-accent-soft">{msg}</p>;
}

export function ContactForm({ services }: { services: string[] }) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  if (state.ok) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-accent/30 bg-surface p-10 text-center">
        <CheckCircle className="h-12 w-12 text-accent" weight="fill" />
        <h2 className="font-display text-xl font-bold text-fg">
          Mensaje enviado
        </h2>
        <p className="max-w-sm text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.message && !state.ok && (
        <div className="flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-fg">
          <WarningCircle className="h-5 w-5 shrink-0 text-accent-soft" />
          {state.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-fg">
            Nombre <span className="text-accent">*</span>
          </label>
          <input id="name" name="name" type="text" required className={inputClass} />
          <FieldError msg={state.errors?.name} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-fg">
            Email <span className="text-accent">*</span>
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
          <FieldError msg={state.errors?.email} />
        </div>
        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium text-fg">
            Empresa
          </label>
          <input id="company" name="company" type="text" className={inputClass} />
          <FieldError msg={state.errors?.company} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-fg">
            Teléfono
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} />
          <FieldError msg={state.errors?.phone} />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="mb-2 block text-sm font-medium text-fg">
          Servicio de interés
        </label>
        <select id="service" name="service" className={inputClass} defaultValue="">
          <option value="">Selecciona una opción (opcional)</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
          <option value="Otro / No estoy seguro">Otro / No estoy seguro</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-fg">
          Cuéntanos qué necesitas <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${inputClass} resize-y`}
        />
        <FieldError msg={state.errors?.message} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(239,43,61,0.6)] transition-all hover:bg-accent-soft active:translate-y-px disabled:opacity-60 sm:w-auto"
      >
        {pending ? (
          "Enviando..."
        ) : (
          <>
            Enviar mensaje
            <PaperPlaneTilt className="h-4 w-4" weight="fill" />
          </>
        )}
      </button>
    </form>
  );
}
