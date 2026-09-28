import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/admin-auth";
import { KHO_COOKIE_NAME, verifyKhoSessionToken } from "@/lib/kho-auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (!verifySessionToken(token)) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/kho") && pathname !== "/kho/login") {
    const token = request.cookies.get(KHO_COOKIE_NAME)?.value;
    if (!verifyKhoSessionToken(token)) {
      const loginUrl = new URL("/kho/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/kho/:path*"],
};
