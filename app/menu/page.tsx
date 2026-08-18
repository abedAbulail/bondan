import type { Metadata } from "next";
import { OrderNowButton, StickyOrderBar } from "@/components/order-now";
import { ResponsiveMenu } from "@/components/responsive-menu";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "القائمة",
  description: "منيو كوكتيل بوندان — عصائر، كوكتيل، ميلك شيك، موهيتو وحلويات",
};

export default function MenuPage() {
  return (
    <>
      <SiteHeader showOrder />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-6 lg:pb-12">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <h1 className="text-3xl font-black text-[#2f6b28]">قائمة {site.nameAr}</h1>
          <p className="max-w-xl text-sm font-bold text-[#2f6b28]/75">
            الأسعار ظاهرة على الصور. اطلب مباشرة على واتساب بعد ما تختار طلبك.
          </p>
          <OrderNowButton className="lg:hidden" label="اطلب الآن عبر واتساب" />
        </div>
        <ResponsiveMenu />
      </main>
      <StickyOrderBar />
    </>
  );
}
