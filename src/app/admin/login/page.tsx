"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/Container";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Đăng nhập thất bại.");
      }
      router.push(searchParams.get("from") || "/admin/orders");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container className="flex min-h-[60vh] items-center justify-center py-20">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-3xl border border-line bg-surface p-8">
        <h1 className="font-display text-2xl text-ink">Đăng nhập quản trị</h1>
        <p className="mt-1 text-sm text-ink-soft">Khu vực nội bộ CloudS.</p>
        <label htmlFor="password" className="mt-6 block text-sm font-semibold text-ink">
          Mật khẩu
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-line bg-brand-cream px-4 py-2.5 text-sm text-ink outline-none focus:border-brand-black"
        />
        {error && (
          <p role="alert" className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="mt-5 flex h-11 w-full items-center justify-center rounded-full bg-brand-black text-sm font-semibold text-brand-cream hover:bg-ink-soft disabled:opacity-60"
        >
          {submitting ? "Đang kiểm tra..." : "Đăng nhập"}
        </button>
      </form>
    </Container>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
