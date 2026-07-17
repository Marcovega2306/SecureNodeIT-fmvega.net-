import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";

// Defensa en profundidad: además del middleware, verificamos la sesión aquí.
export const dynamic = "force-dynamic";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-[100dvh] flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
