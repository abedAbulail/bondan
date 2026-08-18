import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { OrderNowButton } from "./order-now";

export function SiteHeader({ showOrder = false }: { showOrder?: boolean }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#4d9a40]/15 bg-[#fffdf5]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt={site.nameEn}
            width={56}
            height={56}
            className="h-12 w-12 rounded-full border-2 border-[#fecf02] bg-white object-cover shadow-sm"
          />
          <div className="leading-tight">
            <p className="text-base font-extrabold text-[#2f6b28]">{site.nameAr}</p>
            <p className="text-[11px] font-bold tracking-wide text-[#4d9a40]">
              {site.nameEn}
            </p>
          </div>
        </Link>
        {showOrder ? (
          <OrderNowButton className="hidden px-4 py-2 text-sm lg:inline-flex" />
        ) : (
          <Link
            href="/menu"
            className="rounded-full bg-[#fecf02] px-4 py-2 text-sm font-extrabold text-[#2f6b28] shadow-sm transition hover:brightness-105"
          >
            القائمة
          </Link>
        )}
      </div>
    </header>
  );
}
