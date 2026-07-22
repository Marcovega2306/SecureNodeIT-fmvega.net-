"use client";

import { useActionState } from "react";
import { WarningCircle, SignIn } from "@phosphor-icons/react";
import { login, type LoginState } from "./actions";

const inputClass =
  "w-full rounded-md border border-line bg-base px-3.5 py-2.5 text-sm text-fg placeholder:text-faint transition-colors focus:border-accent focus:outline-none";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next} />

      {state.error && (
        <div className="flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-fg">
          <WarningCircle className="h-5 w-5 shrink-0 text-accent-soft" />
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-fg">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-fg"
        >
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-soft active:translate-y-px disabled:opacity-60"
      >
        {pending ? (
          "Entrando..."
        ) : (
          <>
            <SignIn className="h-4 w-4" weight="bold" />
            Entrar
          </>
        )}
      </button>
    </form>
  );
}
