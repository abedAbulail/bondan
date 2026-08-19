"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function MenuEnvelope({ children }: { children: React.ReactNode }) {
  const [leaving, setLeaving] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setLeaving(true), 2000);
    const hideTimer = window.setTimeout(() => setHidden(true), 2800);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = hidden ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hidden]);

  function skip() {
    setLeaving(true);
    window.setTimeout(() => setHidden(true), 700);
  }

  return (
    <div className="env-frame">
      <div className="env-page">{children}</div>

      {hidden ? null : (
        <button
          type="button"
          className={`menu-intro ${leaving ? "is-leaving" : ""}`}
          onClick={skip}
          aria-label="دخول القائمة"
        >
          <Image
            src="/logo.png"
            alt={site.nameAr}
            width={160}
            height={160}
            priority
            className="menu-intro-logo"
          />
          <h1 className="menu-intro-title">مرحباً بك في القائمة</h1>
          <p className="menu-intro-sub">{site.nameAr}</p>
        </button>
      )}
    </div>
  );
}
