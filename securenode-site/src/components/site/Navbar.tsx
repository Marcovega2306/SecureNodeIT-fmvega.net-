"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/site/Logo";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/proceso", label: "Proceso" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-base/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="SecureNode IT, inicio">
          <Logo className="h-7 w-7" />
          <span className="font-display text-[15px] font-bold tracking-tight text-fg">
            SecureNode<span className="text-accent">·</span>IT
          </span>
        </Link>

        {/* Enlaces desktop — una sola línea */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(l.href)
                  ? "text-fg"
                  : "text-muted hover:text-fg"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <ButtonLink href="/contacto" className="ml-3" variant="primary">
            Contacto
          </ButtonLink>
        </div>

        {/* Botón menú móvil */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-fg md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </nav>

      {/* Menú móvil desplegable */}
      {open && (
        <div className="border-t border-line/70 bg-base md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm font-medium ${
                  isActive(l.href) ? "bg-surface text-fg" : "text-muted"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <ButtonLink
              href="/contacto"
              className="mt-2 w-full"
              onClick={() => setOpen(false)}
            >
              Contacto
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
