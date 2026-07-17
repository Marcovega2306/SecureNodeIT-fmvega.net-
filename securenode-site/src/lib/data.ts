import { prisma } from "@/lib/prisma";

// Consultas de solo lectura para el sitio público. Se ejecutan en el servidor
// y siempre reflejan el estado actual editable desde /admin.

export function getPublishedServices() {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
}

export function getServiceBySlug(slug: string) {
  return prisma.service.findFirst({ where: { slug, published: true } });
}

export function getPublishedTestimonials() {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
}

export type ServiceRecord = Awaited<
  ReturnType<typeof getPublishedServices>
>[number];
export type TestimonialRecord = Awaited<
  ReturnType<typeof getPublishedTestimonials>
>[number];
