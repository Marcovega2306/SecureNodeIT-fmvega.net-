import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Acceso · Panel",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const target = next && next.startsWith("/admin") ? next : "/admin";

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-base px-5">
      <div className="pointer-events-none absolute inset-0 circuit-grid opacity-40" />
      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo className="h-11 w-11" />
          <h1 className="mt-4 font-display text-xl font-bold tracking-tight text-fg">
            Panel de administración
          </h1>
          <p className="mt-1 text-sm text-muted">SecureNode IT</p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-7">
          <LoginForm next={target} />
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-fg">
            ← Volver al sitio
          </Link>
        </p>
      </div>
    </main>
  );
}
