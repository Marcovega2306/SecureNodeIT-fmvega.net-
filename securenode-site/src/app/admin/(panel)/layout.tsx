import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";

// Defensa en profundidad: además del proxy, verificamos el admin aquí.
export const dynamic = "force-dynamic";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

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
