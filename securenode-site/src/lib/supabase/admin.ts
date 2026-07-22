import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cliente con service_role: EXCLUSIVAMENTE de servidor. Bypassa RLS.
// Úsalo solo para operaciones del panel /admin y siempre tras requireAdmin().
// La SUPABASE_SERVICE_ROLE_KEY nunca debe ir en una variable NEXT_PUBLIC_.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}
