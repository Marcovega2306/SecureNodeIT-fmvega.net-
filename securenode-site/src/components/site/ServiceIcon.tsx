import {
  HardDrives,
  Strategy,
  ShieldCheck,
  CloudArrowUp,
  GearSix,
  Database,
  Cube,
  LockKey,
  Lightning,
  ChartLineUp,
  Terminal,
  Cpu,
} from "@phosphor-icons/react/dist/ssr";
import { type IconProps } from "@phosphor-icons/react";
import { type ComponentType } from "react";

// Mapa nombre -> componente Phosphor. Se usa la variante /ssr para permitir
// renderizado en Server Components sin marcar todo como cliente.
const MAP: Record<string, ComponentType<IconProps>> = {
  HardDrives,
  Strategy,
  ShieldCheck,
  CloudArrowUp,
  GearSix,
  Database,
  Cube,
  LockKey,
  Lightning,
  ChartLineUp,
  Terminal,
  Cpu,
};

export const ICON_NAMES = Object.keys(MAP);

export function ServiceIcon({
  name,
  className,
  weight = "duotone",
}: {
  name: string;
  className?: string;
  weight?: IconProps["weight"];
}) {
  const Icon = MAP[name] ?? Cube;
  return <Icon className={className} weight={weight} aria-hidden />;
}
