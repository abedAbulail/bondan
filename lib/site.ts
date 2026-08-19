function env(name: string, fallback: string) {
  const value = process.env[name]?.trim();
  return value || fallback;
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

function withHttps(host: string) {
  const clean = host.trim().replace(/\/$/, "");
  if (!clean) return "";
  return /^https?:\/\//i.test(clean) ? clean : `https://${clean}`;
}

export const site = {
  nameAr: "كوكتيل بوندان",
  nameEn: "Cocktail Bondan",
  tagline: "خليك منعش مع بوندان",
  siteUrl: withHttps(env("NEXT_PUBLIC_SITE_URL", "")),
  facebook: env(
    "NEXT_PUBLIC_FACEBOOK_URL",
    "https://www.facebook.com/profile.php?id=61592462105920",
  ),
  instagram: env(
    "NEXT_PUBLIC_INSTAGRAM_URL",
    "https://www.instagram.com/cocktailbondan1/",
  ),
  instagramHandle: env("NEXT_PUBLIC_INSTAGRAM_HANDLE", "@cocktailbondan1"),
  whatsapp: digits(env("NEXT_PUBLIC_WHATSAPP", "970592341356")),
  phoneDisplay: env("NEXT_PUBLIC_PHONE_DISPLAY", "0592 341 356"),
  phoneTel: env("NEXT_PUBLIC_PHONE_TEL", "+970592341356"),
};

export function publicOrigin() {
  if (site.siteUrl) return site.siteUrl;
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}

export function publicUrl(path = "/") {
  const origin = publicOrigin().replace(/\/$/, "");
  const suffix = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${origin}${suffix}`;
}

export function whatsappLink(
  message = "مرحبا كوكتيل بوندان، بدي أطلب 🍹",
) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
