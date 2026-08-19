export type MenuSize = {
  label: string;
  price: number;
};

export type MenuItem = {
  id: string;
  name: string;
  prices: number[];
  description?: string;
  options?: MenuSize[];
};

export type MenuCategory = {
  id: string;
  title: string;
  images: string[];
  colors: {
    bg: string;
    surface: string;
    accent: string;
    header: string;
    text: string;
  };
  items: MenuItem[];
};

function sizesFor(prices: number[]): MenuSize[] {
  if (prices.length === 1) return [{ label: "", price: prices[0] }];
  if (prices.length === 2) {
    return [
      { label: "صغير", price: prices[0] },
      { label: "كبير", price: prices[1] },
    ];
  }
  return [
    { label: "صغير", price: prices[0] },
    { label: "وسط", price: prices[1] },
    { label: "كبير", price: prices[2] },
  ];
}

export function itemSizes(item: MenuItem): MenuSize[] {
  if (item.options?.length) return item.options;
  return sizesFor(item.prices);
}

export const menu: MenuCategory[] = [
  {
    id: "milkshake",
    title: "الميلك شيك",
    images: ["/menu/milkshake-hero.png"],
    colors: {
      bg: "#f3e6d4",
      surface: "#fffaf4",
      accent: "#7a3f22",
      header: "#3d2418",
      text: "#2f1b12",
    },
    items: [
      { id: "ms-oreo", name: "ميلك شيك أوريو", prices: [12, 15, 20] },
      { id: "ms-lotus", name: "ميلك شيك لوتس", prices: [12, 15, 20] },
      { id: "ms-raphael", name: "ميلك شيك رافيلو", prices: [12, 15, 20] },
      { id: "ms-nutella", name: "ميلك شيك نوتيلا", prices: [12, 15, 20] },
      { id: "ms-mango", name: "ميلك شيك منجا", prices: [12, 15, 20] },
      { id: "ms-strawberry", name: "ميلك شيك فراولة", prices: [12, 15, 20] },
      { id: "ms-passion", name: "ميلك شيك مسفلورا", prices: [12, 15, 20] },
      { id: "ms-snickers", name: "ميلك شيك سنيكرز", prices: [12, 15, 20] },
      { id: "ms-cerelac", name: "ميلك شيك سيريلاك", prices: [12, 15, 20] },
      { id: "ms-pistachio", name: "ميلك شيك بستاشيو", prices: [12, 15, 20] },
      { id: "ms-dubai", name: "ميلك شيك دبي", prices: [12, 15, 20] },
      { id: "ms-kinder", name: "ميلك شيك كندر", prices: [12, 15, 20] },
    ],
  },
  {
    id: "sweets",
    title: "الحلويات",
    images: ["/menu/sweets-hero.png"],
    colors: {
      bg: "#f6ecd8",
      surface: "#fffdf8",
      accent: "#6a8f32",
      header: "#3d4a1c",
      text: "#2a3214",
    },
    items: [
      {
        id: "sw-fash-s",
        name: "فشافيش صغير",
        prices: [10, 15],
        options: [
          { label: "نوتيلا ١٠ حبات", price: 10 },
          { label: "مكس ١٠ حبات", price: 15 },
        ],
      },
      {
        id: "sw-fash-l",
        name: "فشافيش كبير",
        prices: [20, 25],
        options: [
          { label: "نوتيلا ٢٥ حبة", price: 20 },
          { label: "مكس ٢٥ حبة", price: 25 },
        ],
      },
      { id: "sw-crepe-nutella", name: "كريب نوتيلا", prices: [15] },
      { id: "sw-crepe-lotus", name: "كريب لوتس", prices: [15] },
      { id: "sw-crepe-dubai", name: "كريب دبي", prices: [20] },
      { id: "sw-crepe-mix", name: "كريب مكس", prices: [20] },
      { id: "sw-pancake", name: "بان كيك", prices: [15] },
      { id: "sw-fettuccine", name: "كريب فوتشيني", prices: [15, 20] },
      { id: "sw-royal", name: "العيش الملكي", prices: [12] },
    ],
  },
  {
    id: "qashtouta",
    title: "القشطوطة",
    images: ["/menu/qashtouta-hero.png"],
    colors: {
      bg: "#f4ead8",
      surface: "#fffdf8",
      accent: "#b8862c",
      header: "#5a3d18",
      text: "#3a2810",
    },
    items: [
      { id: "qa-nutella", name: "قشطوطة نوتيلا", prices: [10, 20] },
      { id: "qa-lotus", name: "قشطوطة لوتس", prices: [10, 20] },
      { id: "qa-pistachio", name: "قشطوطة بستاشيو", prices: [15, 25] },
      { id: "qa-mix", name: "قشطوطة مكس", prices: [12, 22] },
      { id: "qa-dubai", name: "قشطوطة دبي", prices: [15, 25] },
      { id: "qa-fruit", name: "قشطوطة فواكه", prices: [12, 22] },
    ],
  },
  {
    id: "juices",
    title: "العصائر الطبيعية",
    images: ["/menu/juices-hero.png"],
    colors: {
      bg: "#e8f6e4",
      surface: "#f7fdf5",
      accent: "#3d9a3a",
      header: "#1f6b28",
      text: "#163d18",
    },
    items: [
      { id: "ju-mango", name: "منجا", prices: [10, 15, 20] },
      { id: "ju-strawberry", name: "فراولة", prices: [10, 15, 20] },
      { id: "ju-passion", name: "مسفلورا", prices: [10, 15, 20] },
      { id: "ju-pineapple", name: "أناناس", prices: [10, 15, 20] },
      { id: "ju-berry", name: "توت بري", prices: [10, 15, 20] },
      { id: "ju-kiwi", name: "كيوي", prices: [10, 15, 20] },
      { id: "ju-banana", name: "موز وتمر وعسل", prices: [10, 15, 20] },
      { id: "ju-lemon", name: "ليمون ونعنع", prices: [8, 10, 15] },
      { id: "ju-carrot", name: "جزر", prices: [8, 10, 15] },
      { id: "ju-apple", name: "تفاح", prices: [8, 10, 15] },
      { id: "ju-orange", name: "برتقال", prices: [8, 10, 15] },
      { id: "ju-beet", name: "شمندر", prices: [8, 10, 15] },
    ],
  },
  {
    id: "cocktail",
    title: "كوكتيل",
    images: ["/menu/cocktail-hero.png"],
    colors: {
      bg: "#fde8ee",
      surface: "#fff7f9",
      accent: "#d45a7a",
      header: "#8a2e48",
      text: "#4a1c28",
    },
    items: [
      { id: "ck-fakh", name: "كوكتيل فخفخينا", prices: [7, 10, 15] },
      { id: "ck-cream", name: "كوكتيل قشطة وعسل", prices: [10, 15, 20] },
      { id: "ck-avocado", name: "أفوكادو", prices: [12, 15, 20] },
    ],
  },
  {
    id: "blends",
    title: "الخلطات",
    images: ["/menu/blends-hero.png"],
    colors: {
      bg: "#eaf6e2",
      surface: "#f7fcf4",
      accent: "#5a9a3d",
      header: "#2c5a22",
      text: "#1c3a16",
    },
    items: [
      { id: "bl-bondan", name: "خلطة بوندان", prices: [15, 20, 25] },
      { id: "bl-dates", name: "أفوكادو بالتمر", prices: [15, 20, 25] },
      { id: "bl-pistachio", name: "أفوكادو بالفستق الحلبي", prices: [15, 20, 25] },
      { id: "bl-cheesecake", name: "تشيز كيك", prices: [15, 20, 25] },
      { id: "bl-coconut", name: "جوز هند", prices: [15, 20, 20] },
    ],
  },
  {
    id: "mojito",
    title: "الموهيتو",
    images: ["/menu/mojito-hero.png"],
    colors: {
      bg: "#e4f7e6",
      surface: "#f5fdf6",
      accent: "#3aaa45",
      header: "#1e6b32",
      text: "#144022",
    },
    items: [
      { id: "mo-classic", name: "موهيتو", prices: [10] },
      { id: "mo-blu", name: "موهيتو BLU", prices: [10] },
      { id: "mo-xl", name: "موهيتو XL", prices: [10] },
      { id: "mo-sprite", name: "موهيتو سبرايت", prices: [10] },
      { id: "mo-soda", name: "موهيتو صودا", prices: [10] },
    ],
  },
];

export function cartLineKey(itemId: string, sizeLabel: string, note?: string) {
  const extra = (note ?? "").trim();
  return extra
    ? `${itemId}::${sizeLabel || "default"}::${extra}`
    : `${itemId}::${sizeLabel || "default"}`;
}

export function findMenuItem(itemId: string) {
  for (const category of menu) {
    const item = category.items.find((entry) => entry.id === itemId);
    if (item) return { category, item };
  }
  return null;
}
