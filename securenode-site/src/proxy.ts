import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

// Protege todas las rutas /admin/* salvo la de login. Sin sesión válida,
// redirige a /admin/login conservando el destino original.
// (Convención `proxy` de Next 16, sucesora de `middleware`.)
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLogin = pathname === "/admin/login";
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySession(token);

  // Usuario ya autenticado que visita /login: lo mandamos al dashboard.
  if (isLogin && session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!isLogin && !session) {
    const url = new URL("/admin/login", request.url);
    if (pathname !== "/admin") {
      url.searchParams.set("next", pathname);
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
