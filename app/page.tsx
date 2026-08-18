import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  MenuIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { LinktreeBackground } from "@/components/linktree-bg";
import { QrButtons } from "@/components/qr-section";
import { ShareButton } from "@/components/share-button";
import { site, whatsappLink } from "@/lib/site";

const links = [
  {
    href: "/menu",
    label: "القائمة",
    hint: "شوف المنيو والاسعار",
    icon: MenuIcon,
    className: "bg-[#fecf02] text-[#2f6b28]",
    external: false,
  },
  {
    href: whatsappLink(),
    label: "واتساب",
    hint: "اطلب الآن",
    icon: WhatsAppIcon,
    className: "bg-[#25D366] text-white",
    external: true,
  },
  {
    href: site.facebook,
    label: "فيسبوك",
    hint: "كوكتيل بوندان",
    icon: FacebookIcon,
    className: "bg-[#1877F2] text-white",
    external: true,
  },
  {
    href: site.instagram,
    label: "إنستغرام",
    hint: site.instagramHandle,
    icon: InstagramIcon,
    className:
      "bg-[linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)] text-white",
    external: true,
  },
  {
    href: `tel:${site.phoneTel}`,
    label: "اتصال",
    hint: site.phoneDisplay,
    icon: PhoneIcon,
    className: "bg-[#4d9a40] text-white",
    external: false,
  },
] as const;

export default function HomePage() {
  return (
    <>
      <LinktreeBackground />
      <main className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col items-center px-4 pb-12 pt-8 sm:max-w-lg">
        <div className="relative mb-4">
        <div className="absolute -inset-3 rounded-full bg-[#fecf02]/50 blur-md" />
        <Image
          src="/logo.png"
          alt={site.nameEn}
          width={180}
          height={180}
          priority
          className="relative h-36 w-36 rounded-full border-[5px] border-[#4d9a40] bg-white object-cover shadow-[0_12px_30px_rgba(45,106,40,0.25)] sm:h-44 sm:w-44"
        />
      </div>

      <h1 className="text-3xl font-black text-[#2f6b28] sm:text-4xl">{site.nameAr}</h1>
      <p className="mt-1 text-sm font-extrabold tracking-[0.18em] text-[#4d9a40]">
        {site.nameEn.toUpperCase()}
      </p>
      <p className="mt-3 rounded-full border-2 border-[#4d9a40] bg-white px-4 py-1.5 text-sm font-bold text-[#2f6b28]">
        {site.tagline}
      </p>
      <QrButtons />

      <nav className="mt-8 flex w-full flex-col gap-3">
        {links.map((link) => {
          const Icon = link.icon;
          const classes = `flex items-center justify-between gap-3 rounded-[1.4rem] px-4 py-3.5 shadow-[0_8px_22px_rgba(45,106,40,0.16)] transition hover:-translate-y-0.5 ${link.className}`;

          const content = (
            <>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20">
                <Icon className="h-6 w-6" />
              </span>
              <span className="flex-1 text-right">
                <span className="block text-lg font-black leading-none">{link.label}</span>
                <span className="mt-1 block text-xs font-bold opacity-80">{link.hint}</span>
              </span>
            </>
          );

          if (link.external) {
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
              >
                {content}
              </a>
            );
          }

          if (link.href.startsWith("tel:")) {
            return (
              <a key={link.label} href={link.href} className={classes}>
                {content}
              </a>
            );
          }

          return (
            <Link key={link.label} href={link.href} className={classes}>
              {content}
            </Link>
          );
        })}
      </nav>
      <ShareButton />
      </main>
    </>
  );
}
