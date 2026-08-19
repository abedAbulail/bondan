"use client";

import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useId, useRef, useState } from "react";
import { publicUrl } from "@/lib/site";
import { DownloadIcon, QrIcon } from "./icons";

type QrKind = "menu" | "linktree";

const qrConfig: Record<
  QrKind,
  { title: string; hint: string; path: string; filename: string; buttonClass: string }
> = {
  menu: {
    title: "QR القائمة",
    hint: "تصفح قائمتنا الآن",
    path: "/menu",
    filename: "bondan-menu-qr.png",
    buttonClass: "bg-[#f0c12a] text-[#1a3321]",
  },
  linktree: {
    title: "QR للطلبات",
    hint: "امسح للطلب مباشرة",
    path: "/",
    filename: "bondan-linktree-qr.png",
    buttonClass: "bg-[#1a6b32] text-white",
  },
};

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function QrButtons() {
  const [open, setOpen] = useState<QrKind | null>(null);
  const [url, setUrl] = useState("");
  const canvasBoxRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (open) {
      setUrl(publicUrl(qrConfig[open].path));
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
    setUrl("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function download() {
    const canvas = canvasBoxRef.current?.querySelector("canvas");
    if (!canvas || !open) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = qrConfig[open].filename;
    link.click();
  }

  const active = open ? qrConfig[open] : null;

  return (
    <>
      <div className="mt-4 grid w-full grid-cols-2 gap-3">
        {(Object.keys(qrConfig) as QrKind[]).map((kind) => {
          const item = qrConfig[kind];
          return (
            <button
              key={kind}
              type="button"
              onClick={() => setOpen(kind)}
              className={`flex items-center gap-2 rounded-[1.1rem] px-3 py-3 text-right shadow-[0_8px_22px_rgba(45,106,40,0.14)] transition hover:-translate-y-0.5 ${item.buttonClass}`}
              dir="ltr"
            >
              <QrIcon className="h-6 w-6 shrink-0" />
              <span className="min-w-0 flex-1 text-right" dir="rtl">
                <span className="block text-[13px] font-black leading-none sm:text-sm">{item.title}</span>
                <span className="mt-1 block text-[10px] font-bold opacity-80 sm:text-[11px]">{item.hint}</span>
              </span>
            </button>
          );
        })}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="presentation"
        >
          <button
            type="button"
            aria-label="إغلاق"
            className="absolute inset-0 bg-[#1a4a16]/45 backdrop-blur-[2px]"
            onClick={() => setOpen(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex w-full max-w-sm flex-col items-center rounded-[2rem] border-4 border-[#fecf02] bg-white p-6 shadow-[0_24px_60px_rgba(26,74,22,0.28)]"
          >
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#4d9a40] text-white transition hover:bg-[#3e7f33]"
              aria-label="إغلاق"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            <h3 id={titleId} className="mb-4 text-xl font-black text-[#2f6b28]">
              {active.title}
            </h3>
            <div
              ref={canvasBoxRef}
              className="rounded-2xl border-4 border-[#4d9a40] bg-white p-3"
            >
              {url ? (
                <QRCodeCanvas
                  value={url}
                  size={220}
                  bgColor="#ffffff"
                  fgColor="#2f6b28"
                  level="H"
                  includeMargin
                  imageSettings={{
                    src: "/logo.png",
                    height: 44,
                    width: 44,
                    excavate: true,
                  }}
                />
              ) : (
                <div className="h-[220px] w-[220px] animate-pulse rounded-lg bg-[#fff7cc]" />
              )}
            </div>
            {url ? (
              <p className="mt-3 max-w-[260px] break-all text-center text-xs font-bold text-[#2f6b28]/70">
                {url}
              </p>
            ) : null}
            <button
              type="button"
              onClick={download}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#4d9a40] px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#3e7f33]"
            >
              <DownloadIcon className="h-4 w-4" />
              تحميل QR
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
