import Link from "next/link";
import { type ComponentProps, type ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold tracking-tight transition-all duration-200 active:translate-y-px focus-visible:outline-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Rojo de marca + texto blanco (bold), contraste AA para texto grande.
  primary:
    "bg-accent text-white shadow-[0_8px_30px_-8px_rgba(239,43,61,0.6)] hover:bg-accent-soft hover:shadow-[0_10px_36px_-8px_rgba(239,43,61,0.75)]",
  outline:
    "border border-line text-fg hover:border-accent hover:text-white bg-transparent",
  ghost: "text-muted hover:text-fg bg-transparent",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
} & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
