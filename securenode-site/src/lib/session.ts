import { SignJWT, jwtVerify } from "jose";

// Utilidades de sesión basadas en JWT (HS256). No importan next/headers,
// así que funcionan tanto en el runtime de Node como en el middleware (edge).

export const SESSION_COOKIE = "sn_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 días

export type SessionPayload = {
  sub: string; // usuario admin
  role: "admin";
};

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET no está definido en el entorno.");
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ role: payload.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySession(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.role !== "admin" || !payload.sub) return null;
    return { sub: String(payload.sub), role: "admin" };
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE = MAX_AGE_SECONDS;
