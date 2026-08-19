import type { Metadata } from "next";
import { MenuApp } from "@/components/menu-app";
import { MenuEnvelope } from "@/components/menu-envelope";

export const metadata: Metadata = {
  title: "القائمة",
  description: "منيو كوكتيل بوندان — اطلب مباشرة وأرسل الطلب على واتساب",
};

export default function MenuPage() {
  return (
    <MenuEnvelope>
      <MenuApp />
    </MenuEnvelope>
  );
}
