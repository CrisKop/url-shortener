import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Obtener la ruta de la URL (excluyendo el dominio y la barra inicial)
  const path = request.nextUrl.pathname.substring(1);

  // Si la ruta está vacía (es la página principal) o es una ruta del sistema, no hacer nada
  if (
    path === "" ||
    path.startsWith("result") ||
    path.startsWith("_next") ||
    path.startsWith("api") ||
    path.includes(".") ||
    path.startsWith("redirect")
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(`/redirect/${path}`, request.url));
}

// Configurar el middleware para que se ejecute en todas las rutas excepto las de redirect
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
