import { NextResponse } from "next/server";
import { isKhoAuthorizedRequest } from "@/lib/kho-auth";
import { addTransaction } from "@/lib/inventory-store";

export async function POST(request: Request) {
  if (!isKhoAuthorizedRequest(request)) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  try {
    const tx = await addTransaction({
      type: body?.type,
      sku: String(body?.sku ?? ""),
      warehouseId: String(body?.warehouseId ?? ""),
      qty: Number(body?.qty),
      operator: String(body?.operator ?? ""),
      note: typeof body?.note === "string" ? body.note : "",
    });
    return NextResponse.json(tx, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Ghi phiếu thất bại." },
      { status: 400 }
    );
  }
}
