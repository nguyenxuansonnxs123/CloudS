import { NextResponse } from "next/server";
import { resolveVoucherCode } from "@/lib/voucher-resolve";
import { getLocale } from "@/lib/i18n";

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code") ?? "";
  if (!code.trim()) {
    return NextResponse.json({ error: "Thiếu mã voucher." }, { status: 400 });
  }

  const locale = await getLocale();
  const resolved = await resolveVoucherCode(code, locale);
  if (!resolved) {
    return NextResponse.json({ error: "Mã giảm giá không hợp lệ." }, { status: 404 });
  }

  return NextResponse.json(resolved);
}
