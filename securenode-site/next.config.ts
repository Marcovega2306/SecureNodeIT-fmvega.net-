import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fija la raíz del workspace a esta app. Evita que Next infiera mal la raíz
  // por lockfiles ajenos en carpetas superiores (p. ej. el package-lock.json
  // que crea la herramienta de skills en la raíz del repo).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
