import { NextResponse } from "next/server";
import { isKhoAuthorizedRequest } from "@/lib/kho-auth";
import { voidTransaction } from "@/lib/inventory-store";

export async function POST(request: Request, ctx: RouteContext<"/api/kho/transactions/[id]/void">) {
  if (!isKhoAuthorizedRequest(request)) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  const { id } = await ctx.params;
  const body = await request.json().catch(() => null);
  try {
    const tx = await voidTransaction(id, String(body?.by ?? ""));
    return NextResponse.json(tx);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Hủy phiếu thất bại." },
      { status: 400 }
    );
  }
}
