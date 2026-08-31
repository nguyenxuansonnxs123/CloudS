import type { getDictionary } from "./dictionaries";

export function getNavLinks(t: ReturnType<typeof getDictionary>) {
  return [
    { href: "/san-pham", label: t.nav.products },
    { href: "/ve-clouds", label: t.nav.about },
    { href: "/uu-dai", label: t.nav.offers },
    { href: "/ctv", label: t.nav.ctv },
    { href: "/tin-tuc", label: t.nav.news },
    { href: "/lien-he", label: t.nav.contact },
    { href: "/sd-housing", label: t.nav.sdHousing },
  ] as const;
}
