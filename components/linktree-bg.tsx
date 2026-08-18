"use client";

import Image from "next/image";

export function LinktreeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Image
        src="/linktree-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center lg:hidden"
      />
      <Image
        src="/linktree-bg-wide.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-center lg:block"
      />
      <div className="absolute inset-0 bg-[#fffdf5]/58" />
    </div>
  );
}
