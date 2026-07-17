"use client";

// Interruptor de publicación. Envía el estado deseado (contrario al actual)
// a la server action recibida por prop.
export function PublishToggle({
  id,
  published,
  action,
}: {
  id: string;
  published: boolean;
  action: (formData: FormData) => void | Promise<void>;
}) {
  return (
    <form action={action} className="shrink-0">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="published" value={published ? "false" : "true"} />
      <button
        type="submit"
        role="switch"
        aria-checked={published}
        aria-label={published ? "Despublicar" : "Publicar"}
        title={published ? "Publicado — clic para ocultar" : "Oculto — clic para publicar"}
        className={`relative inline-flex h-6 w-11 items-center rounded-full border transition-colors ${
          published
            ? "border-accent/50 bg-accent/30"
            : "border-line bg-base"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full transition-transform ${
            published
              ? "translate-x-5 bg-accent"
              : "translate-x-1 bg-faint"
          }`}
        />
      </button>
    </form>
  );
}
