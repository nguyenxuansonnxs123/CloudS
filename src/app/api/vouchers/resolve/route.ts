import { NextResponse } from "next/server";
import { resolveVoucherCode } from "@/lib/voucher-resolve";

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code") ?? "";
  if (!code.trim()) {
    return NextResponse.json({ error: "Thiếu mã voucher." }, { status: 400 });
  }

  const resolved = await resolveVoucherCode(code);
  if (!resolved) {
    return NextResponse.json({ error: "Mã giảm giá không hợp lệ." }, { status: 404 });
  }

  return NextResponse.json(resolved);
}
