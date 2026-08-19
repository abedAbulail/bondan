"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  CartIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  MenuIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { CategoryIcon } from "@/components/category-icons";
import {
  cartLineKey,
  findMenuItem,
  itemSizes,
  menu,
  type MenuCategory,
  type MenuItem,
} from "@/lib/menu";
import { site, whatsappLink } from "@/lib/site";

type Screen = "home" | "category" | "product" | "cart" | "success";

type CartLine = {
  key: string;
  itemId: string;
  name: string;
  size: string;
  price: number;
  qty: number;
  note?: string;
};

const colors = {
  page: "#FDFBF7",
  text: "#1A1A1A",
  muted: "#8A8A8A",
  green: "#1A3321",
  tan: "#E8D9C4",
  gold: "#C9A84C",
  banner: "#EFE6D6",
  card: "#FFFFFF",
  field: "#F3F1EC",
  border: "#E8E2D6",
  shadow: "0 2px 10px rgba(26, 26, 26, 0.07)",
};

export function MenuApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [activeId, setActiveId] = useState(menu[0].id);
  const [itemId, setItemId] = useState<string | null>(null);
  const [productBack, setProductBack] = useState<Screen>("category");
  const [cartBack, setCartBack] = useState<Screen>("home");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [orderNote, setOrderNote] = useState("");
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);
  const [lastOrder, setLastOrder] = useState<CartLine[]>([]);
  const [drawer, setDrawer] = useState(false);

  const category = menu.find((item) => item.id === activeId) ?? menu[0];
  const selected = itemId ? findMenuItem(itemId) : null;

  useEffect(() => {
    const saved = window.localStorage.getItem("bondan-cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved) as CartLine[]);
      } catch {
        window.localStorage.removeItem("bondan-cart");
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem("bondan-cart", JSON.stringify(cart));
  }, [cart, ready]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const count = cart.reduce((sum, line) => sum + line.qty, 0);
  const total = cart.reduce((sum, line) => sum + line.price * line.qty, 0);

  const searchResults = useMemo(() => {
    const term = query.trim();
    if (!term) return [];
    const seen = new Set<string>();
    const results: { category: MenuCategory; item: MenuItem }[] = [];
    for (const cat of menu) {
      const matchCategory = cat.title.includes(term);
      for (const item of cat.items) {
        if (!matchCategory && !item.name.includes(term)) continue;
        if (seen.has(item.id)) continue;
        seen.add(item.id);
        results.push({ category: cat, item });
      }
    }
    return results;
  }, [query]);

  function openCart() {
    setCartBack(screen === "cart" || screen === "success" ? "home" : screen);
    setDrawer(false);
    setScreen("cart");
  }

  function openCategory(id: string) {
    setActiveId(id);
    setQuery("");
    setScreen("category");
  }

  function openProduct(nextItemId: string, from: Screen, categoryId?: string) {
    if (categoryId) setActiveId(categoryId);
    setItemId(nextItemId);
    setProductBack(from);
    setScreen("product");
  }

  function setQty(line: Pick<CartLine, "itemId" | "name" | "size" | "price" | "note">, next: number) {
    const key = cartLineKey(line.itemId, line.size, line.note);
    setCart((current) => {
      const rest = current.filter((entry) => entry.key !== key);
      if (next <= 0) return rest;
      return [...rest, { ...line, key, qty: next }];
    });
  }

  function addToCart(item: MenuItem, size: string, price: number, qty: number, note: string) {
    if (qty <= 0) return;
    const key = cartLineKey(item.id, size, note);
    setCart((current) => {
      const existing = current.find((line) => line.key === key);
      if (!existing) {
        return [
          ...current,
          {
            key,
            itemId: item.id,
            name: item.name,
            size,
            price,
            qty,
            note: note.trim() || undefined,
          },
        ];
      }
      return current.map((line) =>
        line.key === key ? { ...line, qty: line.qty + qty } : line,
      );
    });
    setScreen(productBack);
  }

  function sendOrder() {
    if (!cart.length) return;

    const lines = cart
      .map((line) => {
        const size = line.size ? ` ${line.size}` : "";
        const amount = line.qty > 1 ? ` عدد ${line.qty}` : "";
        const note = line.note ? `\n  ملاحظة: ${line.note}` : "";
        return `- ${line.name}${size}${amount}${note}`;
      })
      .join("\n");

    const notes = orderNote.trim() ? `\n\nملاحظة الطلب:\n${orderNote.trim()}` : "";

    const message = `مرحبا كوكتيل بوندان
بدي أطلب:
${lines}${notes}

المجموع: ${total} ₪`;

    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setLastOrder(cart);
    setCart([]);
    setOrderNote("");
    setScreen("success");
  }

  if (screen === "cart") {
    return (
      <CartScreen
        cart={cart}
        total={total}
        orderNote={orderNote}
        onBack={() => setScreen(cartBack === "product" && !selected ? "home" : cartBack)}
        onNote={setOrderNote}
        onQty={setQty}
        onRemove={(key) => setCart((current) => current.filter((line) => line.key !== key))}
        onSend={sendOrder}
      />
    );
  }

  if (screen === "success") {
    return (
      <SuccessScreen
        lines={lastOrder}
        onHome={() => {
          setScreen("home");
          setLastOrder([]);
        }}
      />
    );
  }

  if (screen === "product" && selected) {
    return (
      <ProductScreen
        key={selected.item.id}
        category={selected.category}
        item={selected.item}
        count={count}
        onBack={() => setScreen(productBack)}
        onCart={openCart}
        onAdd={addToCart}
      />
    );
  }

  if (screen === "category") {
    return (
      <CategoryScreen
        category={category}
        count={count}
        onBack={() => setScreen("home")}
        onCart={openCart}
        onItem={(id) => openProduct(id, "category")}
      />
    );
  }

  return (
    <PageShell>
      <SideDrawer
        open={drawer}
        count={count}
        onClose={() => setDrawer(false)}
        onHome={() => {
          setDrawer(false);
          setScreen("home");
        }}
        onCart={openCart}
      />

      <header className="sticky top-0 z-20" style={{ backgroundColor: colors.page }}>
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4" dir="ltr">
          <button
            type="button"
            onClick={() => setDrawer(true)}
            className="flex h-10 w-10 items-center justify-center"
            aria-label="القائمة"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <CartButton count={count} onClick={openCart} />
        </div>
      </header>

      <div className="mx-auto w-full max-w-lg px-5 pb-10">
        <div className="flex flex-col items-center pt-2 text-center">
          <Image
            src="/logo.png"
            alt={site.nameEn}
            width={88}
            height={88}
            priority
            className="h-[76px] w-[76px] rounded-full border-[3px] object-cover"
            style={{ borderColor: colors.gold }}
          />
          <h1 className="mt-3 text-[28px] font-black leading-none">{site.nameAr}</h1>
          <p className="mt-2 text-[13px] font-semibold" style={{ color: colors.muted }}>
            {site.tagline}
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[18px] font-black">مرحباً بك في {site.nameAr}</p>
          <p className="mt-1 text-[13px] font-semibold" style={{ color: colors.muted }}>
            اختر ما تشتهي من قائمتنا المتنوعة
          </p>
        </div>

        <label
          className="mt-5 flex h-[52px] items-center gap-3 rounded-[14px] bg-white px-4"
          style={{ boxShadow: colors.shadow, border: `1px solid ${colors.border}` }}
        >
          <SearchIcon className="h-5 w-5 shrink-0 text-[#8A8A8A]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ابحث عن صنف..."
            className="w-full bg-transparent text-[15px] font-semibold outline-none placeholder:font-medium"
            style={{ color: colors.text }}
          />
        </label>

        {query.trim() ? (
          <section className="mt-8">
            <h2 className="text-center text-[20px] font-black">نتائج البحث</h2>
            <GoldDivider />
            <div className="mt-5 space-y-3">
              {searchResults.length === 0 ? (
                <p className="bg-white px-4 py-8 text-center text-sm font-bold" style={{ color: colors.muted, boxShadow: colors.shadow }}>
                  لا يوجد نتائج
                </p>
              ) : (
                searchResults.map(({ category: cat, item }) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onClick={() => openProduct(item.id, "home", cat.id)}
                  />
                ))
              )}
            </div>
          </section>
        ) : (
          <>
            <section className="mt-8">
              <h2 className="text-center text-[20px] font-black">الأقسام</h2>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {menu.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => openCategory(cat.id)}
                    className="flex aspect-square flex-col items-center justify-center gap-2 rounded-[18px] bg-white px-2 last:col-start-2"
                    style={{ boxShadow: colors.shadow }}
                  >
                    <span className="text-[#2A2A2A]">
                      <CategoryIcon id={cat.id} className="h-8 w-8" />
                    </span>
                    <span className="text-center text-[12px] font-bold leading-tight">{cat.title}</span>
                  </button>
                ))}
              </div>
            </section>

            <aside
              className="mt-8 flex items-center justify-between gap-3 rounded-[16px] px-4 py-4"
              style={{ backgroundColor: colors.banner }}
            >
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] text-white"
                style={{ backgroundColor: colors.green }}
                aria-label="واتساب"
              >
                <WhatsAppIcon className="h-6 w-6" />
              </a>
              <div className="min-w-0 flex-1 text-right">
                <p className="text-[15px] font-black">طلبك يصلك مباشرة</p>
                <p className="mt-0.5 text-[12px] font-semibold" style={{ color: colors.muted }}>
                  اضغط على أي صنف لإضافته إلى طلبك
                </p>
              </div>
            </aside>
          </>
        )}
      </div>
    </PageShell>
  );
}

function CategoryScreen({
  category,
  count,
  onBack,
  onCart,
  onItem,
}: {
  category: MenuCategory;
  count: number;
  onBack: () => void;
  onCart: () => void;
  onItem: (id: string) => void;
}) {
  const hero = category.images[0];

  return (
    <PageShell>
      <section className="relative">
        <div className="relative h-[250px] overflow-hidden">
          <Image
            src={hero}
            alt={category.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(253,251,247,0.08) 42%, ${colors.page} 100%)`,
            }}
          />
          <header className="absolute inset-x-0 top-0 z-20">
            <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4" dir="ltr">
              <button
                type="button"
                onClick={onBack}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm"
                aria-label="رجوع"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <CartButton count={count} onClick={onCart} />
            </div>
          </header>
          <h1 className="absolute inset-x-0 bottom-5 px-5 text-center text-[28px] font-black leading-tight">
            {category.title}
          </h1>
        </div>
      </section>

      <div className="mx-auto w-full max-w-lg px-4 pb-10 pt-1">
        <div className="space-y-3">
          {category.items.map((item) => (
            <ItemCard key={item.id} item={item} onClick={() => onItem(item.id)} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function ProductScreen({
  category,
  item,
  count,
  onBack,
  onCart,
  onAdd,
}: {
  category: MenuCategory;
  item: MenuItem;
  count: number;
  onBack: () => void;
  onCart: () => void;
  onAdd: (item: MenuItem, size: string, price: number, qty: number, note: string) => void;
}) {
  const sizes = itemSizes(item);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const selected = sizes[sizeIndex] ?? sizes[0];

  return (
    <PageShell>
      <InnerHeader title="تفاصيل الصنف" onBack={onBack} count={count} onCart={onCart} />
      <div className="mx-auto flex w-full max-w-lg flex-col px-5 pb-8">
        <div className="flex flex-col items-center text-center">
          <div
            className="flex h-[120px] w-[120px] items-center justify-center rounded-full"
            style={{ backgroundColor: colors.tan, color: colors.green }}
          >
            <CategoryIcon id={category.id} className="h-14 w-14" />
          </div>
          <h2 className="mt-4 text-[22px] font-black">{item.name}</h2>
          {item.description ? (
            <p className="mt-2 max-w-[280px] text-[13px] font-medium leading-relaxed" style={{ color: colors.muted }}>
              {item.description}
            </p>
          ) : null}
          <p className="mt-3 text-[20px] font-black">{selected.price} ₪</p>
        </div>

        {sizes.length > 1 ? (
          <section className="mt-6 rounded-[16px] bg-white px-4 py-4" style={{ boxShadow: colors.shadow }}>
            <p className="mb-3 text-center text-[14px] font-black">الحجم</p>
            <div className={`grid gap-2 ${sizes.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
              {sizes.map((size, index) => {
                const active = index === sizeIndex;
                return (
                  <button
                    key={size.label}
                    type="button"
                    onClick={() => setSizeIndex(index)}
                    className="rounded-[12px] px-2 py-3 text-center"
                    style={{
                      backgroundColor: active ? "#EEF4EF" : colors.field,
                      border: `1.5px solid ${active ? colors.green : "transparent"}`,
                    }}
                  >
                    <span className="block text-[13px] font-black">{size.label}</span>
                    <span className="mt-1 block text-[12px] font-bold" style={{ color: active ? colors.green : colors.muted }}>
                      {size.price} ₪
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}

        <section className="mt-4 rounded-[16px] bg-white px-4 py-4" style={{ boxShadow: colors.shadow }}>
          <p className="mb-3 text-center text-[14px] font-black">الكمية</p>
          <div className="flex items-center justify-center gap-4" dir="ltr">
            <button
              type="button"
              onClick={() => setQty((value) => Math.max(1, value - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: colors.green }}
              aria-label="إنقاص"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span
              className="flex h-10 min-w-[52px] items-center justify-center rounded-[10px] text-[16px] font-black"
              style={{ backgroundColor: colors.field }}
            >
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((value) => value + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: colors.green }}
              aria-label="زيادة"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </section>

        <p className="mt-5 mb-2 text-right text-[13px] font-bold">إضافة ملاحظة (اختياري)</p>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="اكتب ملاحظتك هنا..."
          className="min-h-[110px] w-full rounded-[14px] bg-white px-4 py-3 text-sm font-semibold outline-none"
          style={{ border: `1px solid ${colors.border}`, boxShadow: colors.shadow }}
        />

        <button
          type="button"
          onClick={() => onAdd(item, selected.label, selected.price, qty, note)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-[14px] py-3.5 text-[16px] font-black text-white"
          style={{ backgroundColor: colors.green }}
        >
          <CartIcon className="h-5 w-5" />
          إضافة إلى الطلب
        </button>
      </div>
    </PageShell>
  );
}

function CartScreen({
  cart,
  total,
  orderNote,
  onBack,
  onNote,
  onQty,
  onRemove,
  onSend,
}: {
  cart: CartLine[];
  total: number;
  orderNote: string;
  onBack: () => void;
  onNote: (value: string) => void;
  onQty: (line: Pick<CartLine, "itemId" | "name" | "size" | "price" | "note">, next: number) => void;
  onRemove: (key: string) => void;
  onSend: () => void;
}) {
  return (
    <PageShell>
      <header className="sticky top-0 z-20" style={{ backgroundColor: colors.page }}>
        <div className="relative mx-auto flex h-14 max-w-lg items-center justify-center px-4">
          <button
            type="button"
            onClick={onBack}
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center"
            aria-label="رجوع"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
          <h1 className="text-[17px] font-black">سلة الطلبات</h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg px-4 pb-10">
        {cart.length === 0 ? (
          <p
            className="rounded-[16px] bg-white px-4 py-10 text-center font-bold"
            style={{ color: colors.muted, boxShadow: colors.shadow }}
          >
            السلة فارغة
          </p>
        ) : (
          <ul className="overflow-hidden rounded-[16px] bg-white" style={{ boxShadow: colors.shadow }}>
            {cart.map((line, index) => (
              <li
                key={line.key}
                className="flex items-center gap-3 px-3 py-3.5"
                style={{ borderTop: index === 0 ? undefined : `1px solid ${colors.border}` }}
              >
                <div className="min-w-0 flex-1">
                  <p className="font-black">{line.name}</p>
                  {line.size ? (
                    <p className="text-[12px] font-bold" style={{ color: colors.muted }}>
                      {line.size}
                    </p>
                  ) : null}
                  {line.note ? (
                    <p className="truncate text-[11px] font-semibold" style={{ color: colors.muted }}>
                      {line.note}
                    </p>
                  ) : null}
                  <p className="mt-0.5 text-[13px] font-bold" style={{ color: colors.muted }}>
                    {line.price} ₪
                  </p>
                </div>
                <div
                  className="flex items-center gap-2 rounded-full px-2.5 py-1.5"
                  style={{ backgroundColor: colors.field }}
                  dir="ltr"
                >
                  <button
                    type="button"
                    onClick={() => onQty(line, line.qty - 1)}
                    className="flex h-6 w-6 items-center justify-center"
                    aria-label="إنقاص"
                  >
                    <MinusIcon className="h-3.5 w-3.5" />
                  </button>
                  <span className="min-w-4 text-center text-sm font-black">{line.qty}</span>
                  <button
                    type="button"
                    onClick={() => onQty(line, line.qty + 1)}
                    className="flex h-6 w-6 items-center justify-center"
                    aria-label="زيادة"
                  >
                    <PlusIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(line.key)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center"
                  style={{ color: colors.muted }}
                  aria-label="حذف"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-5 mb-2 text-right text-[13px] font-bold">إضافة ملاحظة للطلب (اختياري)</p>
        <textarea
          value={orderNote}
          onChange={(event) => onNote(event.target.value)}
          placeholder="اكتب ملاحظتك هنا..."
          className="min-h-[110px] w-full rounded-[14px] bg-white px-4 py-3 text-sm font-semibold outline-none"
          style={{ border: `1px solid ${colors.border}` }}
        />

        <div className="mt-6 flex items-end justify-between">
          <div className="text-right">
            <p className="text-[16px] font-black">المجموع</p>
            <p className="text-[11px] font-semibold" style={{ color: colors.muted }}>
              يشمل ضريبة القيمة المضافة
            </p>
          </div>
          <p className="text-[22px] font-black">{total} ₪</p>
        </div>

        <button
          type="button"
          onClick={onSend}
          disabled={!cart.length}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-[14px] py-3.5 text-[16px] font-black text-white disabled:opacity-50"
          style={{ backgroundColor: colors.green }}
        >
          <WhatsAppIcon className="h-5 w-5" />
          إرسال الطلب عبر واتساب
        </button>
      </main>
    </PageShell>
  );
}

function SuccessScreen({
  lines,
  onHome,
}: {
  lines: CartLine[];
  onHome: () => void;
}) {
  return (
    <PageShell>
      <main className="mx-auto flex min-h-full max-w-lg flex-col items-center px-5 py-14 text-center">
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: colors.green }}
        >
          <CheckIcon className="h-10 w-10" />
        </div>
        <h1 className="mt-6 text-2xl font-black">تم إرسال طلبك بنجاح!</h1>
        <div className="mt-6 w-full rounded-[16px] bg-white p-4 text-right" style={{ boxShadow: colors.shadow }}>
          {lines.map((line) => (
            <p key={line.key} className="py-1 text-sm font-bold">
              {line.name}
              {line.size ? ` · ${line.size}` : ""}
              {line.qty > 1 ? ` عدد ${line.qty}` : ""}
            </p>
          ))}
        </div>
        <button
          type="button"
          onClick={onHome}
          className="mt-6 flex w-full items-center justify-center rounded-[14px] bg-white py-3.5 font-black"
          style={{ border: `1px solid ${colors.green}` }}
        >
          العودة إلى القائمة
        </button>
      </main>
    </PageShell>
  );
}

function ItemCard({ item, onClick }: { item: MenuItem; onClick: () => void }) {
  const sizes = itemSizes(item);
  const priceText = sizes.length === 1 ? `${sizes[0].price} ₪` : `من ${sizes[0].price} ₪`;
  const sizeText = sizes.length > 1 ? sizes.map((size) => size.label).join(" · ") : "";

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-none bg-white p-4 text-right"
      style={{ boxShadow: colors.shadow }}
    >
      <h3 className="text-[16px] font-black leading-snug">{item.name}</h3>
      {item.description || sizeText ? (
        <p className="mt-1 text-[12px] font-semibold leading-relaxed" style={{ color: colors.muted }}>
          {item.description || sizeText}
        </p>
      ) : null}
      <div className="mt-4 flex items-center justify-between" dir="ltr">
        <p className="text-[15px] font-black">{priceText}</p>
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.field, color: colors.green }}
        >
          <CartIcon className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}

function InnerHeader({
  title,
  onBack,
  count,
  onCart,
}: {
  title: string;
  onBack: () => void;
  count: number;
  onCart: () => void;
}) {
  return (
    <header className="sticky top-0 z-20" style={{ backgroundColor: colors.page }}>
      <div className="relative mx-auto flex h-14 max-w-lg items-center justify-between px-4" dir="ltr">
        <button
          type="button"
          onClick={onBack}
          className="relative z-10 flex h-10 w-10 items-center justify-center"
          aria-label="رجوع"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <h1 className="pointer-events-none absolute inset-x-0 text-center text-[17px] font-black" dir="rtl">
          {title}
        </h1>
        <CartButton count={count} onClick={onCart} />
      </div>
    </header>
  );
}

function CartButton({
  count,
  onClick,
}: {
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: colors.tan }}
      aria-label="السلة"
    >
      <CartIcon className="h-5 w-5" />
      {count > 0 ? (
        <span
          className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-black text-white"
          style={{ backgroundColor: colors.green }}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}

function GoldDivider() {
  return (
    <div className="mt-2 flex items-center justify-center gap-2">
      <span className="h-px w-16" style={{ backgroundColor: colors.gold }} />
      <span className="flex items-center gap-1">
        <span className="h-1 w-1 rounded-full" style={{ backgroundColor: colors.gold }} />
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: colors.gold }} />
        <span className="h-1 w-1 rounded-full" style={{ backgroundColor: colors.gold }} />
      </span>
      <span className="h-px w-16" style={{ backgroundColor: colors.gold }} />
    </div>
  );
}

function SideDrawer({
  open,
  count,
  onClose,
  onHome,
  onCart,
}: {
  open: boolean;
  count: number;
  onClose: () => void;
  onHome: () => void;
  onCart: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" aria-label="إغلاق" className="absolute inset-0 bg-black/35" onClick={onClose} />
      <aside
        className="absolute inset-y-0 left-0 flex w-[78%] max-w-xs flex-col bg-white px-5 py-6"
        style={{ boxShadow: "8px 0 30px rgba(0,0,0,0.12)" }}
      >
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center"
            aria-label="إغلاق"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          <p className="text-[16px] font-black">{site.nameAr}</p>
        </div>
        <nav className="mt-8 flex flex-col gap-1 text-right">
          <Link
            href="/"
            className="rounded-xl px-3 py-3 text-[15px] font-bold"
            onClick={onClose}
          >
            الرئيسية
          </Link>
          <button type="button" onClick={onHome} className="rounded-xl px-3 py-3 text-right text-[15px] font-bold">
            الأقسام
          </button>
          <button type="button" onClick={onCart} className="rounded-xl px-3 py-3 text-right text-[15px] font-bold">
            السلة{count > 0 ? ` (${count})` : ""}
          </button>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-3 py-3 text-[15px] font-bold"
            onClick={onClose}
          >
            واتساب
          </a>
        </nav>
      </aside>
    </div>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex-1" style={{ backgroundColor: colors.page, color: colors.text }} dir="rtl">
      {children}
    </div>
  );
}
