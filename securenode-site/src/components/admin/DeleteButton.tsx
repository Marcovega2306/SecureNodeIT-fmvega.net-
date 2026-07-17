"use client";

import { Trash } from "@phosphor-icons/react";

export function DeleteButton({
  id,
  action,
  label,
  confirmMessage,
}: {
  id: string;
  action: (formData: FormData) => void | Promise<void>;
  label: string;
  confirmMessage: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-md border border-line px-3.5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent/50 hover:text-accent-soft"
      >
        <Trash className="h-4 w-4" />
        {label}
      </button>
    </form>
  );
}
