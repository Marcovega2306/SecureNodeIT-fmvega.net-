"use client";

import { useRef } from "react";
import { Trash } from "@phosphor-icons/react";
import { updateLeadStatus, deleteLead } from "@/app/admin/(panel)/leads/actions";

const statuses = [
  { value: "nuevo", label: "Nuevo" },
  { value: "contactado", label: "Contactado" },
  { value: "cerrado", label: "Cerrado" },
];

export function LeadControls({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const statusFormRef = useRef<HTMLFormElement>(null);

  return (
    <div className="flex items-center gap-2">
      <form ref={statusFormRef} action={updateLeadStatus}>
        <input type="hidden" name="id" value={id} />
        <select
          name="status"
          defaultValue={status}
          onChange={() => statusFormRef.current?.requestSubmit()}
          className="rounded-md border border-line bg-base px-2.5 py-1.5 text-xs font-medium text-fg focus:border-accent focus:outline-none"
          aria-label="Cambiar estado del lead"
        >
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </form>

      <form
        action={deleteLead}
        onSubmit={(e) => {
          if (!confirm("¿Eliminar este lead de forma permanente?")) {
            e.preventDefault();
          }
        }}
      >
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line text-faint transition-colors hover:border-accent/50 hover:text-accent-soft"
          aria-label="Eliminar lead"
        >
          <Trash className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
