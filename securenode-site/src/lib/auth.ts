import "server-only";
import { createClient } from "@/lib/supabase/server";

export type AdminUser = { id: string; email: string };

// Devuelve el usuario admin autenticado, o null.
// Decisión #4 (hardening): solo el email de ADMIN_EMAIL se considera admin,
// aunque exista otro usuario autenticado en Supabase.
export async function getAdmin(): Promise<AdminUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || user.email.toLowerCase() !== adminEmail.toLowerCase()) {
    return null;
  }

  return { id: user.id, email: user.email };
}

// Guard para server actions: aborta si no hay admin válido.
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdmin();
  if (!admin) {
    throw new Error("No autorizado.");
  }
  return admin;
}
