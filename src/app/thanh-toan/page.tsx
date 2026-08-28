"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { useCart } from "@/components/CartProvider";
import { VoucherSection } from "@/components/VoucherSection";
import { formatPrice } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import { autoAppliedResolvedVouchers, shippingDiscountFor, type ResolvedVoucher } from "@/lib/vouchers";
import { clsx } from "clsx";

type VnProvince = { code: number; name: string };
type VnWard = { code: number; name: string };
type VnAddressData = { provinces: VnProvince[]; wardsByProvince: Record<string, VnWard[]> };

type FormState = {
  name: string;
  email: string;
  phone: string;
  provinceCode: string;
  wardCode: string;
  addressDetail: string;
  note: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  provinceCode: "",
  wardCode: "",
  addressDetail: "",
  note: "",
};

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!form.name.trim()) errors.name = "Vui lòng nhập họ tên.";
  if (!form.email.trim()) {
    errors.email = "Vui lòng nhập email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Email không hợp lệ.";
  }
  if (!form.phone.trim()) {
    errors.phone = "Vui lòng nhập số điện thoại.";
  } else if (!/^(0|\+84)[0-9]{9,10}$/.test(form.phone.replace(/[\s.-]/g, ""))) {
    errors.phone = "Số điện thoại không hợp lệ.";
  }
  if (!form.provinceCode) errors.provinceCode = "Vui lòng chọn Tỉnh/Thành phố.";
  if (!form.wardCode) errors.wardCode = "Vui lòng chọn Phường/Xã.";
  if (!form.addressDetail.trim()) errors.addressDetail = "Vui lòng nhập số nhà, tên đường.";
  return errors;
}

export default function CheckoutPage() {
  const { items, subtotal, clear, isHydrated } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank_transfer">("cod");
  const [vouchers, setVouchers] = useState<ResolvedVoucher[]>(() => autoAppliedResolvedVouchers());
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [addressData, setAddressData] = useState<VnAddressData | null>(null);

  useEffect(() => {
    fetch("/data/vn-address.json")
      .then((res) => res.json())
      .then((data: VnAddressData) => setAddressData(data))
      .catch(() => setAddressData(null));
  }, []);

  const wards = useMemo(() => {
    if (!addressData || !form.provinceCode) return [];
    return addressData.wardsByProvince[form.provinceCode] ?? [];
  }, [addressData, form.provinceCode]);

  const shippingFee = siteConfig.shippingFee;
  const shippingDiscount = shippingDiscountFor(vouchers.map((v) => v.code), shippingFee);
  const affiliateDiscount = vouchers.reduce(
    (sum, v) => sum + (v.kind === "affiliate_discount" ? v.amount : 0),
    0
  );
  const total = subtotal + shippingFee - shippingDiscount - affiliateDiscount;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    const provinceName = addressData?.provinces.find((p) => String(p.code) === form.provinceCode)?.name ?? "";
    const wardName = wards.find((w) => String(w.code) === form.wardCode)?.name ?? "";
    const address = [form.addressDetail.trim(), wardName, provinceName].filter(Boolean).join(", ");

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            address,
            note: form.note,
          },
          items,
          paymentMethod,
          voucherCodes: vouchers.map((v) => v.code),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Đặt hàng thất bại, vui lòng thử lại.");
      }
      const order = await res.json();
      clear();
      router.push(`/dat-hang-thanh-cong/${order.id}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Đặt hàng thất bại, vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isHydrated) return <div className="py-20" />;

  if (items.length === 0) {
    return (
      <Container className="flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="font-display text-2xl text-ink">Giỏ hàng đang trống</h1>
        <p className="max-w-sm text-sm text-ink-soft">Hãy thêm sản phẩm vào giỏ trước khi đặt hàng.</p>
        <Link
          href="/san-pham"
          className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-brand-black px-6 text-sm font-semibold text-brand-cream hover:bg-ink-soft"
        >
          Xem sản phẩm
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-14 sm:py-20">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Thông tin đặt hàng</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <Field label="Họ và tên" htmlFor="name" error={errors.name} required>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={inputClass(Boolean(errors.name))}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </Field>

          <Field label="Email" htmlFor="email" error={errors.email} required>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={inputClass(Boolean(errors.email))}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </Field>

          <Field label="Số điện thoại" htmlFor="phone" error={errors.phone} required>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className={inputClass(Boolean(errors.phone))}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
          </Field>

          <div>
            <p className="text-sm font-semibold text-ink">
              Địa chỉ nhận hàng <span className="text-rose-ink">*</span>
            </p>
            <div className="mt-1.5 grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="provinceCode" className="sr-only">
                  Tỉnh/Thành phố
                </label>
                <select
                  id="provinceCode"
                  value={form.provinceCode}
                  onChange={(e) => setForm((f) => ({ ...f, provinceCode: e.target.value, wardCode: "" }))}
                  className={inputClass(Boolean(errors.provinceCode))}
                  aria-invalid={Boolean(errors.provinceCode)}
                  aria-describedby={errors.provinceCode ? "provinceCode-error" : undefined}
                >
                  <option value="">
                    {addressData ? "Chọn Tỉnh/Thành phố" : "Đang tải danh sách..."}
                  </option>
                  {addressData?.provinces.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.name}
                    </option>
                  ))}
                </select>
                {errors.provinceCode && (
                  <p id="provinceCode-error" className="mt-1 text-xs text-red-600">
                    {errors.provinceCode}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="wardCode" className="sr-only">
                  Phường/Xã
                </label>
                <select
                  id="wardCode"
                  value={form.wardCode}
                  disabled={!form.provinceCode}
                  onChange={(e) => setForm((f) => ({ ...f, wardCode: e.target.value }))}
                  className={clsx(inputClass(Boolean(errors.wardCode)), "disabled:opacity-60")}
                  aria-invalid={Boolean(errors.wardCode)}
                  aria-describedby={errors.wardCode ? "wardCode-error" : undefined}
                >
                  <option value="">{form.provinceCode ? "Chọn Phường/Xã" : "Chọn tỉnh trước"}</option>
                  {wards.map((w) => (
                    <option key={w.code} value={w.code}>
                      {w.name}
                    </option>
                  ))}
                </select>
                {errors.wardCode && (
                  <p id="wardCode-error" className="mt-1 text-xs text-red-600">
                    {errors.wardCode}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3">
              <label htmlFor="addressDetail" className="sr-only">
                Số nhà, tên đường
              </label>
              <input
                id="addressDetail"
                type="text"
                placeholder="Số nhà, tên đường"
                autoComplete="address-line1"
                value={form.addressDetail}
                onChange={(e) => setForm((f) => ({ ...f, addressDetail: e.target.value }))}
                className={inputClass(Boolean(errors.addressDetail))}
                aria-invalid={Boolean(errors.addressDetail)}
                aria-describedby={errors.addressDetail ? "addressDetail-error" : undefined}
              />
              {errors.addressDetail && (
                <p id="addressDetail-error" className="mt-1 text-xs text-red-600">
                  {errors.addressDetail}
                </p>
              )}
            </div>
          </div>

          <Field label="Ghi chú (không bắt buộc)" htmlFor="note">
            <textarea
              id="note"
              rows={2}
              placeholder="Ví dụ: giao giờ hành chính, gọi trước khi giao..."
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
              className={inputClass(false)}
            />
          </Field>

          <fieldset>
            <legend className="text-sm font-semibold text-ink">Phương thức thanh toán</legend>
            <div className="mt-2 space-y-2">
              <label
                className={clsx(
                  "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3",
                  paymentMethod === "cod" ? "border-brand-black" : "border-line"
                )}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="size-4"
                />
                <span className="text-sm text-ink">Thanh toán khi nhận hàng (COD)</span>
              </label>
              <label
                className={clsx(
                  "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3",
                  paymentMethod === "bank_transfer" ? "border-brand-black" : "border-line"
                )}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "bank_transfer"}
                  onChange={() => setPaymentMethod("bank_transfer")}
                  className="size-4"
                />
                <span className="text-sm text-ink">Chuyển khoản ngân hàng (quét mã QR)</span>
              </label>
            </div>
          </fieldset>

          {submitError && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex h-12 w-full items-center justify-center rounded-full bg-brand-black text-sm font-semibold text-brand-cream hover:bg-ink-soft disabled:opacity-60"
          >
            {submitting ? "Đang xử lý..." : "Đặt hàng"}
          </button>
        </form>

        <div className="h-fit space-y-4">
          <div className="rounded-3xl border border-line bg-surface p-6">
            <h2 className="font-display text-lg text-ink">Đơn hàng của bạn</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {items.map((item) => (
                <li key={`${item.slug}-${item.size}`} className="flex justify-between text-ink-soft">
                  <span>
                    {item.name} ({item.size}) x{item.quantity}
                  </span>
                  <span className="text-ink">{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-3 border-t border-line pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Tạm tính</dt>
                <dd className="text-ink">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Phí vận chuyển</dt>
                <dd className="text-ink">{formatPrice(shippingFee)}</dd>
              </div>
              {shippingDiscount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-rose-ink">Giảm giá voucher</dt>
                  <dd className="text-rose-ink">-{formatPrice(shippingDiscount)}</dd>
                </div>
              )}
              {affiliateDiscount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-rose-ink">Giảm giá mã giới thiệu</dt>
                  <dd className="text-rose-ink">-{formatPrice(affiliateDiscount)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
                <dt className="text-ink">Tổng cộng</dt>
                <dd className="text-ink">{formatPrice(total)}</dd>
              </div>
            </dl>
          </div>

          <VoucherSection vouchers={vouchers} onChange={setVouchers} />
        </div>
      </div>
    </Container>
  );
}

function inputClass(hasError: boolean) {
  return clsx(
    "w-full rounded-xl border bg-brand-cream px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-black",
    hasError ? "border-red-400" : "border-line"
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label} {required && <span className="text-rose-ink">*</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
