import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import links from "../public/links.json";

export function middleware(request: NextRequest) {
  // Obtener la ruta de la URL (excluyendo el dominio y la barra inicial)
  const path = request.nextUrl.pathname.substring(1);

  // Si la ruta está vacía (es la página principal) o es una ruta del sistema, no hacer nada
  if (
    path === "" ||
    path.startsWith("_next") ||
    path.startsWith("api") ||
    path.includes(".") ||
    path.startsWith("redirect")
  ) {
    return NextResponse.next();
  }

  // Buscar si existe un enlace acortado que coincida con la ruta
  const linkData = links.find((link) => link.shortened === path);

  // Si se encuentra, redirigir a la URL original
  if (linkData) {
    // Redirige a la página intermedia
    return NextResponse.redirect(new URL(`/redirect/${path}`, request.url));
  }

  // Si no se encuentra, continuar con el flujo normal (que mostrará 404 o la página principal)
  return NextResponse.redirect(new URL("/", request.url));
}

// Configurar el middleware para que se ejecute en todas las rutas excepto las de redirect
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
