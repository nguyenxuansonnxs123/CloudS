import { NextResponse } from "next/server";
import {
  KHO_COOKIE_NAME,
  checkKhoCredentials,
  clearLoginFailures,
  createKhoSessionToken,
  getClientIp,
  isLoginBlocked,
  recordLoginFailure,
} from "@/lib/kho-auth";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isLoginBlocked(ip)) {
    return NextResponse.json(
      { error: "Đăng nhập sai quá nhiều lần. Vui lòng thử lại sau 15 phút." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!checkKhoCredentials(username, password)) {
    recordLoginFailure(ip);
    return NextResponse.json({ error: "Sai tên đăng nhập hoặc mật khẩu." }, { status: 401 });
  }

  clearLoginFailures(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(KHO_COOKIE_NAME, createKhoSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return res;
}
