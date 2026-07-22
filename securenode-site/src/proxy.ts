import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Protege /admin/* salvo /admin/login. Refresca la sesión de Supabase y aplica
// la allowlist de ADMIN_EMAIL (decisión #4): solo ese email accede al panel,
// aunque exista otro usuario autenticado en la instancia.
// (Convención `proxy` de Next 16, sucesora de `middleware`.)
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const isAdmin =
    !!user?.email && !!adminEmail && user.email.toLowerCase() === adminEmail;

  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";

  // Admin autenticado que visita /login: al dashboard.
  if (isLogin && isAdmin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Cualquier ruta protegida sin admin válido: a login (conservando destino).
  if (!isLogin && !isAdmin) {
    const url = new URL("/admin/login", request.url);
    if (pathname !== "/admin") {
      url.searchParams.set("next", pathname);
    }
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
