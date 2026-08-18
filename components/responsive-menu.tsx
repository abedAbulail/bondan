import Image from "next/image";
import { menuCategories } from "@/lib/site";

export function ResponsiveMenu() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
      {menuCategories.map((category, index) => (
        <section key={category.id} id={category.id} className="scroll-mt-28">
          <h2 className="mb-3 rounded-full bg-[#4d9a40] px-4 py-2 text-center text-lg font-extrabold text-white shadow-[0_8px_18px_rgba(77,154,64,0.28)]">
            {category.title}
          </h2>
          <div className="overflow-hidden rounded-[1.75rem] border-4 border-[#fecf02] bg-white shadow-[0_12px_30px_rgba(45,106,40,0.14)]">
            <Image
              src={category.image}
              alt={`قائمة ${category.title}`}
              width={1080}
              height={1920}
              priority={index < 2}
              sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </section>
      ))}
    </div>
  );
}
