import Link from "next/link";
import { clsx } from "clsx";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  external?: boolean;
  icon?: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-brand-black text-brand-cream hover:bg-ink-soft",
  secondary: "bg-blush text-brand-black hover:bg-blush-dark",
  ghost: "border border-line bg-transparent text-ink hover:border-ink hover:bg-surface",
};

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
  icon,
}: ButtonProps) {
  const classes = clsx(base, variants[variant], sizes[size], className);

  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href || "#"}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  );
}
