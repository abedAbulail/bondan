import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

export function OrderNowButton({
  className = "",
  label = "اطلب الآن",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-base font-extrabold text-white shadow-[0_8px_20px_rgba(37,211,102,0.35)] transition hover:-translate-y-0.5 hover:brightness-105 ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5" />
      {label}
    </a>
  );
}

export function StickyOrderBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-green-200/70 bg-white/90 p-3 backdrop-blur-md lg:hidden">
      <OrderNowButton className="w-full py-3.5 text-lg" label="اطلب الآن عبر واتساب" />
    </div>
  );
}
