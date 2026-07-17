import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/site/Logo";

const columns = [
  {
    title: "Servicios",
    links: [
      { href: "/servicios", label: "Hosting gestionado" },
      { href: "/servicios", label: "Consultoría tecnológica" },
      { href: "/servicios", label: "Ciberseguridad" },
      { href: "/servicios", label: "Migración a la nube" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { href: "/nosotros", label: "Nosotros" },
      { href: "/proceso", label: "Proceso de trabajo" },
      { href: "/contacto", label: "Contacto" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line bg-ink">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="font-display text-base font-bold tracking-tight text-fg">
                SecureNode<span className="text-accent">·</span>IT
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Infraestructura gestionada, ciberseguridad y consultoría para
              empresas que dependen de que sus sistemas no se caigan.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l, i) => (
                  <li key={`${l.label}-${i}`}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-fg"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-sm text-faint sm:flex-row sm:items-center">
          <p>© {year} SecureNode IT. Todos los derechos reservados.</p>
          <p>
            <span className="text-muted">fmvega.net</span> · Alojado en Azure
            (fvegacorporation)
          </p>
        </div>
      </Container>
    </footer>
  );
}
