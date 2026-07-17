"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SquaresFour,
  Tray,
  Stack,
  ChatCircleText,
  SignOut,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import { Logo } from "@/components/site/Logo";
import { logout } from "@/app/admin/actions";

const nav = [
  { href: "/admin", label: "Resumen", icon: SquaresFour, exact: true },
  { href: "/admin/leads", label: "Leads", icon: Tray },
  { href: "/admin/servicios", label: "Servicios", icon: Stack },
  { href: "/admin/testimonios", label: "Testimonios", icon: ChatCircleText },
];

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="flex flex-col gap-1 border-b border-line bg-ink px-3 py-4 lg:h-[100dvh] lg:w-60 lg:border-b-0 lg:border-r">
      <Link
        href="/admin"
        className="mb-4 flex items-center gap-2.5 px-2 py-1"
      >
        <Logo className="h-7 w-7" />
        <span className="font-display text-sm font-bold tracking-tight text-fg">
          SecureNode<span className="text-accent">·</span>IT
        </span>
      </Link>

      <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
        {nav.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                active
                  ? "bg-surface text-fg"
                  : "text-muted hover:bg-surface/60 hover:text-fg"
              }`}
            >
              <item.icon
                className="h-[18px] w-[18px]"
                weight={active ? "fill" : "regular"}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto hidden flex-col gap-1 border-t border-line pt-3 lg:flex">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-fg"
        >
          <ArrowSquareOut className="h-[18px] w-[18px]" />
          Ver sitio público
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-accent-soft"
          >
            <SignOut className="h-[18px] w-[18px]" />
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  );
}
