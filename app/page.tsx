import Image from "next/image";
import Link from "next/link";
import {
  BookIcon,
  ChevronLeftIcon,
  FacebookIcon,
  InstagramIcon,
  JuiceIcon,
  LeafIcon,
  MedalIcon,
  PhoneIcon,
  ScooterIcon,
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
    hint: "تصفح المنيو والأسعار",
    icon: BookIcon,
    iconWrap: "bg-[#1a6b32] text-white",
    className: "bg-white text-[#1a3321]",
    external: false,
  },
  {
    href: whatsappLink(),
    label: "واتساب",
    hint: "اطلب الآن عبر واتساب",
    icon: WhatsAppIcon,
    iconWrap: "bg-[#1f8f4a] text-white",
    className: "bg-[#e8f7ee] text-[#1a3321]",
    external: true,
  },
  {
    href: site.facebook,
    label: "فيسبوك",
    hint: "تابعنا على فيسبوك",
    icon: FacebookIcon,
    iconWrap: "bg-[#1877F2] text-white",
    className: "bg-[#e8f1fc] text-[#1a3321]",
    external: true,
  },
  {
    href: site.instagram,
    label: "إنستغرام",
    hint: "تابعنا على إنستغرام",
    icon: InstagramIcon,
    iconWrap: "bg-white/20 text-white",
    className:
      "bg-[linear-gradient(90deg,#f9ce34,#ee2a7b,#6228d7)] text-white",
    external: true,
  },
  {
    href: `tel:${site.phoneTel}`,
    label: "اتصل بنا",
    hint: site.phoneDisplay,
    icon: PhoneIcon,
    iconWrap: "bg-[#1a6b32] text-white",
    className: "bg-[#f4eee0] text-[#1a3321]",
    external: false,
  },
] as const;

const features = [
  { icon: ScooterIcon, title: "توصيل سريع", hint: "خدمة سريعة" },
  { icon: JuiceIcon, title: "طعم منعش", hint: "نكهات لا تنسى" },
  { icon: MedalIcon, title: "جودة عالية", hint: "أفضل المكونات" },
] as const;

export default function HomePage() {
  return (
    <>
      <LinktreeBackground />
      <main className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col items-center px-4 pb-12 pt-8 sm:max-w-lg">
        <Image
          src="/logo.png"
          alt={site.nameEn}
          width={160}
          height={160}
          priority
          className="h-32 w-32 rounded-full border-[4px] border-[#4d9a40] bg-white object-cover shadow-[0_10px_24px_rgba(45,106,40,0.2)] sm:h-36 sm:w-36"
        />

        <h1 className="mt-4 text-3xl font-black text-[#1f6b32] sm:text-4xl">{site.nameAr}</h1>
        <p className="mt-1 text-sm font-extrabold tracking-[0.18em] text-[#3d8f45]">
          {site.nameEn.toUpperCase()}
        </p>
        <p className="mt-3 flex items-center gap-2 text-sm font-bold text-[#3d8f45]">
          <LeafIcon className="h-4 w-4" />
          {site.tagline}
          <LeafIcon className="h-4 w-4" />
        </p>

        <QrButtons />

        <nav className="mt-6 flex w-full flex-col gap-3">
          {links.map((link) => {
            const Icon = link.icon;
            const classes = `flex items-center gap-3 rounded-[1.15rem] px-3.5 py-3.5 shadow-[0_8px_22px_rgba(45,106,40,0.1)] transition hover:-translate-y-0.5 ${link.className}`;

            const content = (
              <>
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${link.iconWrap}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1 text-right">
                  <span className="block text-[17px] font-black leading-none">{link.label}</span>
                  <span className="mt-1 block text-xs font-bold opacity-75">{link.hint}</span>
                </span>
                <ChevronLeftIcon className="h-5 w-5 shrink-0 opacity-55" />
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

        <div className="mt-6 flex w-full items-stretch rounded-[1.15rem] bg-white px-2 py-3.5 shadow-[0_8px_22px_rgba(45,106,40,0.1)]">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-1 flex-col items-center px-1 text-center"
                style={{
                  borderRight: index === 0 ? undefined : "1px solid #e6eedf",
                }}
              >
                <Icon className="h-5 w-5 text-[#1f6b32]" />
                <p className="mt-1.5 text-[12px] font-black text-[#1a3321]">{feature.title}</p>
                <p className="mt-0.5 text-[10px] font-bold text-[#6a8a62]">{feature.hint}</p>
              </div>
            );
          })}
        </div>

        <ShareButton />
      </main>
    </>
  );
}
