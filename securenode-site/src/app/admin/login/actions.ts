"use server";

import { redirect } from "next/navigation";
import { verifyCredentials, createSession } from "@/lib/auth";

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const user = String(formData.get("user") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!verifyCredentials(user, password)) {
    return { error: "Usuario o contraseña incorrectos." };
  }

  await createSession(user);
  // Solo permitimos redirecciones internas al panel.
  const target = next.startsWith("/admin") ? next : "/admin";
  redirect(target);
}
