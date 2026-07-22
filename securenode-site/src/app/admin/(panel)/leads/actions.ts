"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";

const STATUSES = ["nuevo", "contactado", "cerrado"] as const;

export async function updateLeadStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !STATUSES.includes(status as (typeof STATUSES)[number])) return;

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("Lead")
    .update({ status })
    .eq("id", id);
  if (error) throw error;

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function deleteLead(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createAdminClient();
  const { error } = await supabase.from("Lead").delete().eq("id", id);
  if (error) throw error;

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}
