"use client";

import { useState } from "react";
import { publicUrl, site } from "@/lib/site";
import { ShareIcon } from "./icons";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = publicUrl("/");
    const payload = {
      title: site.nameAr,
      text: `${site.nameAr} — ${site.tagline}`,
      url,
    };

    try {
      if (typeof navigator.share === "function") {
        await navigator.share(payload);
        return;
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("انسخ الرابط", url);
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-[#4d9a40] bg-white px-4 py-2 text-sm font-extrabold text-[#2f6b28] shadow-sm transition hover:bg-[#fecf02]"
    >
      <ShareIcon className="h-4 w-4" />
      {copied ? "تم النسخ" : "مشاركة"}
    </button>
  );
}
