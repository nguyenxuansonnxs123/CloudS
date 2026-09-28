import { NextResponse } from "next/server";
import { KHO_COOKIE_NAME } from "@/lib/kho-auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(KHO_COOKIE_NAME);
  return res;
}
