"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { useCart } from "@/components/CartProvider";
import { VoucherSection } from "@/components/VoucherSection";
import { useLocale, useDictionary } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/locale";
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

const pageContent = {
  vi: {
    emptyTitle: "Giỏ hàng đang trống",
    emptyDetail: "Hãy thêm sản phẩm vào giỏ trước khi đặt hàng.",
    browseProducts: "Xem sản phẩm",
    heading: "Thông tin đặt hàng",
    nameLabel: "Họ và tên",
    emailLabel: "Email",
    phoneLabel: "Số điện thoại",
    shippingAddressLabel: "Địa chỉ nhận hàng",
    provinceSrLabel: "Tỉnh/Thành phố",
    provincePlaceholder: "Chọn Tỉnh/Thành phố",
    provinceLoading: "Đang tải danh sách...",
    wardSrLabel: "Phường/Xã",
    wardPlaceholder: "Chọn Phường/Xã",
    wardPlaceholderDisabled: "Chọn tỉnh trước",
    addressDetailSrLabel: "Số nhà, tên đường",
    addressDetailPlaceholder: "Số nhà, tên đường",
    noteLabel: "Ghi chú (không bắt buộc)",
    notePlaceholder: "Ví dụ: giao giờ hành chính, gọi trước khi giao...",
    paymentMethodLegend: "Phương thức thanh toán",
    paymentCod: "Thanh toán khi nhận hàng (COD)",
    paymentBankTransfer: "Chuyển khoản ngân hàng (quét mã QR)",
    submitting: "Đang xử lý...",
    submit: "Đặt hàng",
    orderTitle: "Đơn hàng của bạn",
    errors: {
      name: "Vui lòng nhập họ tên.",
      emailRequired: "Vui lòng nhập email.",
      emailInvalid: "Email không hợp lệ.",
      phoneRequired: "Vui lòng nhập số điện thoại.",
      phoneInvalid: "Số điện thoại không hợp lệ.",
      province: "Vui lòng chọn Tỉnh/Thành phố.",
      ward: "Vui lòng chọn Phường/Xã.",
      addressDetail: "Vui lòng nhập số nhà, tên đường.",
      submitFailed: "Đặt hàng thất bại, vui lòng thử lại.",
    },
  },
  en: {
    emptyTitle: "Your cart is empty",
    emptyDetail: "Please add products to your cart before checking out.",
    browseProducts: "Browse products",
    heading: "Checkout information",
    nameLabel: "Full name",
    emailLabel: "Email",
    phoneLabel: "Phone number",
    shippingAddressLabel: "Shipping address",
    provinceSrLabel: "Province/City",
    provincePlaceholder: "Select province/city",
    provinceLoading: "Loading list...",
    wardSrLabel: "Ward/Commune",
    wardPlaceholder: "Select ward/commune",
    wardPlaceholderDisabled: "Select a province first",
    addressDetailSrLabel: "Street address",
    addressDetailPlaceholder: "House number, street name",
    noteLabel: "Note (optional)",
    notePlaceholder: "E.g. deliver during office hours, call before delivery...",
    paymentMethodLegend: "Payment method",
    paymentCod: "Cash on delivery (COD)",
    paymentBankTransfer: "Bank transfer (scan QR code)",
    submitting: "Processing...",
    submit: "Place order",
    orderTitle: "Your order",
    errors: {
      name: "Please enter your full name.",
      emailRequired: "Please enter your email.",
      emailInvalid: "Invalid email address.",
      phoneRequired: "Please enter your phone number.",
      phoneInvalid: "Invalid phone number.",
      province: "Please select a Province/City.",
      ward: "Please select a Ward/Commune.",
      addressDetail: "Please enter your house number and street name.",
      submitFailed: "Order failed, please try again.",
    },
  },
} satisfies Record<Locale, unknown>;

function validate(form: FormState, errorText: (typeof pageContent)["vi"]["errors"]) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!form.name.trim()) errors.name = errorText.name;
  if (!form.email.trim()) {
    errors.email = errorText.emailRequired;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = errorText.emailInvalid;
  }
  if (!form.phone.trim()) {
    errors.phone = errorText.phoneRequired;
  } else if (!/^(0|\+84)[0-9]{9,10}$/.test(form.phone.replace(/[\s.-]/g, ""))) {
    errors.phone = errorText.phoneInvalid;
  }
  if (!form.provinceCode) errors.provinceCode = errorText.province;
  if (!form.wardCode) errors.wardCode = errorText.ward;
  if (!form.addressDetail.trim()) errors.addressDetail = errorText.addressDetail;
  return errors;
}

export default function CheckoutPage() {
  const locale = useLocale();
  const t = useDictionary();
  const p = pageContent[locale];
  const { items, subtotal, clear, isHydrated } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank_transfer">("cod");
  const [vouchers, setVouchers] = useState<ResolvedVoucher[]>(() => autoAppliedResolvedVouchers(locale));
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
    const fieldErrors = validate(form, p.errors);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    const provinceName = addressData?.provinces.find((prov) => String(prov.code) === form.provinceCode)?.name ?? "";
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
        throw new Error(data?.error || p.errors.submitFailed);
      }
      const order = await res.json();
      clear();
      router.push(`/dat-hang-thanh-cong/${order.id}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : p.errors.submitFailed);
    } finally {
      setSubmitting(false);
    }
  }

  if (!isHydrated) return <div className="py-20" />;

  if (items.length === 0) {
    return (
      <Container className="flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="font-display text-2xl text-ink">{p.emptyTitle}</h1>
        <p className="max-w-sm text-sm text-ink-soft">{p.emptyDetail}</p>
        <Link
          href="/san-pham"
          className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-brand-black px-6 text-sm font-semibold text-brand-cream hover:bg-ink-soft"
        >
          {p.browseProducts}
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-14 sm:py-20">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">{p.heading}</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <Field label={p.nameLabel} htmlFor="name" error={errors.name} required>
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

          <Field label={p.emailLabel} htmlFor="email" error={errors.email} required>
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

          <Field label={p.phoneLabel} htmlFor="phone" error={errors.phone} required>
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
              {p.shippingAddressLabel} <span className="text-rose-ink">*</span>
            </p>
            <div className="mt-1.5 grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="provinceCode" className="sr-only">
                  {p.provinceSrLabel}
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
                    {addressData ? p.provincePlaceholder : p.provinceLoading}
                  </option>
                  {addressData?.provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
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
                  {p.wardSrLabel}
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
                  <option value="">{form.provinceCode ? p.wardPlaceholder : p.wardPlaceholderDisabled}</option>
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
                {p.addressDetailSrLabel}
              </label>
              <input
                id="addressDetail"
                type="text"
                placeholder={p.addressDetailPlaceholder}
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

          <Field label={p.noteLabel} htmlFor="note">
            <textarea
              id="note"
              rows={2}
              placeholder={p.notePlaceholder}
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
              className={inputClass(false)}
            />
          </Field>

          <fieldset>
            <legend className="text-sm font-semibold text-ink">{p.paymentMethodLegend}</legend>
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
                <span className="text-sm text-ink">{p.paymentCod}</span>
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
                <span className="text-sm text-ink">{p.paymentBankTransfer}</span>
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
            {submitting ? p.submitting : p.submit}
          </button>
        </form>

        <div className="h-fit space-y-4">
          <div className="rounded-3xl border border-line bg-surface p-6">
            <h2 className="font-display text-lg text-ink">{p.orderTitle}</h2>
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
                <dt className="text-ink-soft">{t.cart.subtotal}</dt>
                <dd className="text-ink">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">{t.cart.shippingFee}</dt>
                <dd className="text-ink">{formatPrice(shippingFee)}</dd>
              </div>
              {shippingDiscount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-rose-ink">{t.cart.voucherDiscount}</dt>
                  <dd className="text-rose-ink">-{formatPrice(shippingDiscount)}</dd>
                </div>
              )}
              {affiliateDiscount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-rose-ink">{t.cart.referralDiscount}</dt>
                  <dd className="text-rose-ink">-{formatPrice(affiliateDiscount)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
                <dt className="text-ink">{t.cart.total}</dt>
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
