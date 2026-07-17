"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().trim().min(2, "Indica tu nombre.").max(120),
  email: z.string().trim().email("Introduce un email válido.").max(180),
  company: z.string().trim().max(160).optional(),
  phone: z.string().trim().max(40).optional(),
  service: z.string().trim().max(120).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres).")
    .max(4000),
});

export type ContactState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export async function submitLead(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    phone: formData.get("phone"),
    service: formData.get("service"),
    message: formData.get("message"),
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !errors[key]) {
        errors[key] = issue.message;
      }
    }
    return { ok: false, message: "Revisa los campos marcados.", errors };
  }

  const data = parsed.data;
  try {
    await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company || null,
        phone: data.phone || null,
        service: data.service || null,
        message: data.message,
      },
    });
  } catch {
    return {
      ok: false,
      message: "No se pudo guardar tu mensaje. Inténtalo de nuevo.",
    };
  }

  return {
    ok: true,
    message: "Gracias. Hemos recibido tu mensaje y te responderemos pronto.",
  };
}
