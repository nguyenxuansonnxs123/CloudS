import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import { createOrder, type PaymentMethod } from "@/lib/orders-store";
import { findAffiliateByCode } from "@/lib/affiliates-store";
import { sendOrderNotificationEmail, sendCustomerThankYouEmail } from "@/lib/order-email";
import { submitOrderToSheet } from "@/lib/order-sheet";
import { autoAppliedVoucherCodes, shippingDiscountFor } from "@/lib/vouchers";
import { resolveVoucherCode } from "@/lib/voucher-resolve";
import type { CartItem } from "@/lib/cart";

const MAX_QUANTITY_PER_ITEM = 10;

type RequestBody = {
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    note?: string;
  };
  items?: { slug?: string; size?: string; quantity?: number }[];
  paymentMethod?: string;
  voucherCodes?: string[];
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  return /^(0|\+84)[0-9]{9,10}$/.test(value.replace(/[\s.-]/g, ""));
}

export async function POST(request: Request) {
  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  const customer = body.customer ?? {};
  const name = (customer.name ?? "").trim();
  const email = (customer.email ?? "").trim();
  const phone = (customer.phone ?? "").trim();
  const address = (customer.address ?? "").trim();
  const note = (customer.note ?? "").trim();

  if (!name) return NextResponse.json({ error: "Vui lòng nhập họ tên." }, { status: 400 });
  if (!email || !isValidEmail(email))
    return NextResponse.json({ error: "Email không hợp lệ." }, { status: 400 });
  if (!phone || !isValidPhone(phone))
    return NextResponse.json({ error: "Số điện thoại không hợp lệ." }, { status: 400 });
  if (!address) return NextResponse.json({ error: "Vui lòng nhập địa chỉ nhận hàng." }, { status: 400 });

  const paymentMethod = body.paymentMethod === "bank_transfer" ? "bank_transfer" : "cod";

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Giỏ hàng đang trống." }, { status: 400 });
  }

  // Không tin dữ liệu giá/tên từ client — tính lại toàn bộ từ dữ liệu sản phẩm trên server.
  const verifiedItems: CartItem[] = [];
  for (const raw of body.items) {
    const product = raw.slug ? getProductBySlug(raw.slug) : undefined;
    if (!product) {
      return NextResponse.json({ error: `Sản phẩm không tồn tại: ${raw.slug ?? ""}` }, { status: 400 });
    }
    const size = raw.size ?? "";
    if (!product.sizes.includes(size)) {
      return NextResponse.json({ error: `Size không hợp lệ cho ${product.name}.` }, { status: 400 });
    }
    const quantity = Math.floor(Number(raw.quantity) || 0);
    if (quantity < 1 || quantity > MAX_QUANTITY_PER_ITEM) {
      return NextResponse.json({ error: `Số lượng không hợp lệ cho ${product.name}.` }, { status: 400 });
    }
    verifiedItems.push({
      slug: product.slug,
      name: product.name,
      color: product.color,
      size,
      price: product.price,
      quantity,
      image: product.images.main,
      sku: product.skuBySize?.[size],
    });
  }

  // Không tin danh sách voucher/giảm giá từ client — tra lại từng mã trên server (voucher tĩnh
  // hoặc mã affiliate), và luôn đảm bảo các voucher tự động áp dụng được tính dù client có gửi
  // lên hay không. Chỉ tính TỐI ĐA 1 mã affiliate mỗi đơn (khách chỉ do 1 người giới thiệu).
  const requestedCodes = Array.isArray(body.voucherCodes) ? body.voucherCodes : [];
  const resolvedCodes = await Promise.all(
    requestedCodes.filter((c) => typeof c === "string").map((c) => resolveVoucherCode(c))
  );
  const validCodes = resolvedCodes.filter((r): r is NonNullable<typeof r> => r !== null).map((r) => r.code);
  const appliedVouchers = Array.from(new Set([...autoAppliedVoucherCodes(), ...validCodes]));

  const affiliateVoucher = resolvedCodes.find((r) => r?.kind === "affiliate_discount");
  const affiliateDiscount = affiliateVoucher?.kind === "affiliate_discount" ? affiliateVoucher.amount : 0;

  const subtotal = verifiedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = siteConfig.shippingFee;
  const shippingDiscount = shippingDiscountFor(appliedVouchers, shippingFee);
  const total = subtotal + shippingFee - shippingDiscount - affiliateDiscount;

  let affiliateCommission: number | undefined;
  if (affiliateVoucher) {
    const affiliate = await findAffiliateByCode(affiliateVoucher.code);
    affiliateCommission = affiliate?.commissionPerOrder;
  }

  const order = await createOrder({
    customer: { name, email, phone, address, note },
    items: verifiedItems,
    subtotal,
    shippingFee,
    shippingDiscount,
    appliedVouchers,
    total,
    paymentMethod: paymentMethod as PaymentMethod,
    affiliateCode: affiliateVoucher?.code,
    affiliateDiscount: affiliateVoucher ? affiliateDiscount : undefined,
    affiliateCommission,
  });

  // Email báo cho CloudS luôn gửi ngay để chủ shop biết có đơn mới (kể cả đơn chuyển khoản
  // chưa nhận được tiền) — không chặn phản hồi cho khách, lỗi ở đây không làm hỏng đơn đã lưu.
  void sendOrderNotificationEmail(order);

  // Ghi Google Sheet + gửi email cảm ơn khách chỉ khi đơn đã "thành công": COD thì ngay lập tức
  // (paymentConfirmed đã true từ createOrder), chuyển khoản thì chờ admin xác nhận đã nhận tiền
  // qua /api/admin/orders/[id]/confirm-payment.
  if (order.paymentConfirmed) {
    void submitOrderToSheet(order);
    void sendCustomerThankYouEmail(order);
  }

  return NextResponse.json(order, { status: 201 });
}
