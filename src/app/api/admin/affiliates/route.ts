import { NextResponse } from "next/server";
import { isAuthorizedRequest } from "@/lib/admin-auth";
import { createAffiliate, listAffiliates } from "@/lib/affiliates-store";

export async function GET(request: Request) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }
  return NextResponse.json(await listAffiliates());
}

export async function POST(request: Request) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const name = (body?.name ?? "").trim();
  const code = (body?.code ?? "").trim();
  const customerDiscount = Math.floor(Number(body?.customerDiscount));
  const commissionPerOrder = Math.floor(Number(body?.commissionPerOrder));

  if (!name) return NextResponse.json({ error: "Vui lòng nhập tên affiliate." }, { status: 400 });
  if (!code) return NextResponse.json({ error: "Vui lòng nhập mã voucher." }, { status: 400 });
  if (!Number.isFinite(customerDiscount) || customerDiscount <= 0) {
    return NextResponse.json({ error: "Số tiền giảm cho khách không hợp lệ." }, { status: 400 });
  }
  if (!Number.isFinite(commissionPerOrder) || commissionPerOrder <= 0) {
    return NextResponse.json({ error: "Hoa hồng mỗi đơn không hợp lệ." }, { status: 400 });
  }

  try {
    const affiliate = await createAffiliate({ name, code, customerDiscount, commissionPerOrder });
    return NextResponse.json(affiliate, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Tạo affiliate thất bại." },
      { status: 400 }
    );
  }
}
