"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const schema = z.object({
  author: z.string().trim().min(2, "El nombre es obligatorio.").max(120),
  role: z.string().trim().min(2, "Indica el cargo.").max(120),
  company: z.string().trim().min(2, "Indica la empresa.").max(160),
  quote: z
    .string()
    .trim()
    .min(10, "El testimonio es demasiado corto.")
    .max(600),
  avatarSeed: z.string().trim().max(80).optional(),
  order: z.coerce.number().int().min(0).max(999).default(0),
  published: z.coerce.boolean().default(false),
});

export type TestimonialFormState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
};

function revalidateTestimonials() {
  revalidatePath("/admin/testimonios");
  revalidatePath("/");
}

export async function saveTestimonial(
  _prev: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const parsed = schema.safeParse({
    author: formData.get("author"),
    role: formData.get("role"),
    company: formData.get("company"),
    quote: formData.get("quote"),
    avatarSeed: formData.get("avatarSeed"),
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
  const avatarSeed =
    (data.avatarSeed && data.avatarSeed.length > 0
      ? data.avatarSeed
      : data.author.toLowerCase().replace(/\s+/g, "-")) || "securenode";

  const payload = {
    author: data.author,
    role: data.role,
    company: data.company,
    quote: data.quote,
    avatarSeed,
    order: data.order,
    published: data.published,
  };

  if (id) {
    await prisma.testimonial.update({ where: { id }, data: payload });
  } else {
    await prisma.testimonial.create({ data: payload });
  }

  revalidateTestimonials();
  redirect("/admin/testimonios");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.testimonial.delete({ where: { id } });
  revalidateTestimonials();
  redirect("/admin/testimonios");
}

export async function toggleTestimonialPublished(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const next = formData.get("published") === "true";
  if (!id) return;
  await prisma.testimonial.update({ where: { id }, data: { published: next } });
  revalidateTestimonials();
}
