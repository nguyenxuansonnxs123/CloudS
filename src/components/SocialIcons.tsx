// Icon mạng xã hội dạng outline tối giản (đồng bộ stroke-width với lucide-react)
// vì lucide-react bản mới đã bỏ các icon thương hiệu (Facebook, Instagram...).

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M14 9V6.5C14 5.67 14.67 5 15.5 5H17V2h-2.5A4.5 4.5 0 0 0 10 6.5V9H7v3h3v10h4V12h3.2l.8-3H14Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ThreadsIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3c-5 0-7.5 3-7.5 9s2.5 9 7.5 9c4.2 0 6.7-2.2 7.3-5.3.5-2.6-.6-4.7-3.6-4.9-2.6-.2-4.4 1-4.4 2.8 0 1.3 1 2.1 2.3 2.1 1.6 0 2.6-1.1 2.8-2.6" />
    </svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M15 3v10.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M15 3c0 2.5 2 4.5 4.5 4.5V10c-1.7 0-3.2-.6-4.5-1.5" />
    </svg>
  );
}
