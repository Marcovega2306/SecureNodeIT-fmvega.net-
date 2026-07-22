"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";
import { ICON_NAMES } from "@/components/site/ServiceIcon";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const schema = z.object({
  title: z.string().trim().min(2, "El título es obligatorio.").max(120),
  slug: z.string().trim().max(140).optional(),
  summary: z.string().trim().min(10, "Resumen demasiado corto.").max(400),
  description: z
    .string()
    .trim()
    .min(10, "La descripción es demasiado corta.")
    .max(4000),
  icon: z.string().trim().default("Cube"),
  order: z.coerce.number().int().min(0).max(999).default(0),
  published: z.coerce.boolean().default(false),
});

export type ServiceFormState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
};

function revalidateService() {
  revalidatePath("/admin/servicios");
  revalidatePath("/servicios");
  revalidatePath("/");
}

export async function saveService(
  _prev: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const parsed = schema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    icon: formData.get("icon"),
    order: formData.get("order") ?? 0,
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !errors[key]) errors[key] = issue.message;
    }
    return { ok: false, message: "Revisa los campos marcados.", errors };
  }

  const data = parsed.data;
  const icon = ICON_NAMES.includes(data.icon) ? data.icon : "Cube";
  const slug = slugify(data.slug || data.title);
  if (!slug) {
    return { ok: false, errors: { slug: "No se pudo generar un slug válido." } };
  }

  const supabase = createAdminClient();

  // Comprueba unicidad del slug (excluyendo el propio registro en edición).
  let clashQuery = supabase.from("Service").select("id").eq("slug", slug);
  if (id) clashQuery = clashQuery.neq("id", id);
  const { data: clash, error: clashError } = await clashQuery.maybeSingle();
  if (clashError) throw clashError;
  if (clash) {
    return { ok: false, errors: { slug: "Ya existe un servicio con ese slug." } };
  }

  const payload = {
    title: data.title,
    slug,
    summary: data.summary,
    description: data.description,
    icon,
    order: data.order,
    published: data.published,
  };

  if (id) {
    const { error } = await supabase
      .from("Service")
      .update(payload)
      .eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("Service").insert(payload);
    if (error) throw error;
  }

  revalidateService();
  redirect("/admin/servicios");
}

export async function deleteService(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();
  const { error } = await supabase.from("Service").delete().eq("id", id);
  if (error) throw error;
  revalidateService();
  redirect("/admin/servicios");
}

export async function toggleServicePublished(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const next = formData.get("published") === "true";
  if (!id) return;
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("Service")
    .update({ published: next })
    .eq("id", id);
  if (error) throw error;
  revalidateService();
}
