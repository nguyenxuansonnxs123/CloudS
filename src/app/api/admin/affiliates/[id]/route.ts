import { NextResponse } from "next/server";
import { isAuthorizedRequest } from "@/lib/admin-auth";
import { deleteAffiliate, updateAffiliate } from "@/lib/affiliates-store";

export async function PATCH(
  request: Request,
  context: RouteContext<"/api/admin/affiliates/[id]">
) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const patch: Parameters<typeof updateAffiliate>[1] = {};
  if (typeof body?.active === "boolean") patch.active = body.active;
  if (typeof body?.name === "string" && body.name.trim()) patch.name = body.name.trim();
  if (Number.isFinite(Number(body?.customerDiscount))) patch.customerDiscount = Math.floor(Number(body.customerDiscount));
  if (Number.isFinite(Number(body?.commissionPerOrder))) patch.commissionPerOrder = Math.floor(Number(body.commissionPerOrder));

  const affiliate = await updateAffiliate(id, patch);
  if (!affiliate) return NextResponse.json({ error: "Không tìm thấy affiliate." }, { status: 404 });
  return NextResponse.json(affiliate);
}

export async function DELETE(
  request: Request,
  context: RouteContext<"/api/admin/affiliates/[id]">
) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  const { id } = await context.params;
  await deleteAffiliate(id);
  return NextResponse.json({ ok: true });
}
