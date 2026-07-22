import { createClient } from "@/lib/supabase/server";
import type { Service, Testimonial } from "@/lib/types";

// Consultas de solo lectura para el sitio público. Se ejecutan en el servidor
// con la anon key; RLS solo expone las filas publicadas (published = true).

export async function getPublishedServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Service")
    .select("*")
    .order("order", { ascending: true })
    .order("createdAt", { ascending: true })
    .returns<Service[]>();
  if (error) throw error;
  return data ?? [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Service")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<Service>();
  if (error) throw error;
  return data;
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Testimonial")
    .select("*")
    .order("order", { ascending: true })
    .order("createdAt", { ascending: true })
    .returns<Testimonial[]>();
  if (error) throw error;
  return data ?? [];
}

// Alias conservados para compatibilidad con ServiceCard / QuoteCard.
export type ServiceRecord = Service;
export type TestimonialRecord = Testimonial;
