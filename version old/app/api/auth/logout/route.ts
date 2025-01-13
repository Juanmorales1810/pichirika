import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const response = new NextResponse();
  response.cookies.set("auth_cookie", "", {
    maxAge: -1, // Esto hará que la cookie expire inmediatamente
    path: "/",
  });
  // Configura las cabeceras para prevenir el almacenamiento en caché
  response.headers.set("Cache-Control", "no-store, max-age=0");
  return response;
}
