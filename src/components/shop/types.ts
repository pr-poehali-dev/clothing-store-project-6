export const HERO_IMG = "https://cdn.poehali.dev/projects/936a2487-6256-47e6-9e29-f997125c1008/files/63422b73-5171-491e-b8d7-a73521bbd72c.jpg";
export const PRODUCT_IMG1 = "https://cdn.poehali.dev/projects/936a2487-6256-47e6-9e29-f997125c1008/files/aa064a5c-0763-453c-af13-fc6956c96acb.jpg";
export const PRODUCT_IMG2 = "https://cdn.poehali.dev/projects/936a2487-6256-47e6-9e29-f997125c1008/files/fa248d3c-fc12-4a3f-8037-997a478638fa.jpg";

export const CATEGORIES = [
  "Верхняя одежда", "Свитеры, джемперы", "Платья", "Брюки", "Юбки",
  "Блузки", "Рубашки", "Жакеты", "Кардиганы", "Водолазки", "Джинсы",
  "Толстовки, свитшоты", "Лонгсливы", "Футболки", "Майки, топы",
  "Поло", "Шорты", "Легинсы", "Жилеты", "Носки", "Аксессуары",
  "Нижнее бельё", "Домашняя одежда"
];

export const PRODUCTS = [
  { id: 1, name: "Пальто оверсайз", category: "Верхняя одежда", price: 8900, oldPrice: 12900, img: PRODUCT_IMG2, badge: "Хит", sizes: ["XS","S","M","L","XL"], color: "#2C2C2C" },
  { id: 2, name: "Платье миди", category: "Платья", price: 5400, img: PRODUCT_IMG1, badge: "Новинка", sizes: ["XS","S","M","L"], color: "#8B2252" },
  { id: 3, name: "Жакет в клетку", category: "Жакеты", price: 6200, oldPrice: 7800, img: PRODUCT_IMG1, badge: null, sizes: ["S","M","L","XL"], color: "#3D2B1F" },
  { id: 4, name: "Водолазка рубчик", category: "Водолазки", price: 2900, img: PRODUCT_IMG2, badge: "Хит", sizes: ["XS","S","M","L","XL","XXL"], color: "#1A1A2E" },
  { id: 5, name: "Джинсы прямые", category: "Джинсы", price: 4500, oldPrice: 5900, img: PRODUCT_IMG1, badge: "-23%", sizes: ["25","26","27","28","29","30"], color: "#1C3A5E" },
  { id: 6, name: "Свитшот базовый", category: "Толстовки, свитшоты", price: 3200, img: PRODUCT_IMG2, badge: "Новинка", sizes: ["XS","S","M","L","XL"], color: "#2D4739" },
  { id: 7, name: "Юбка плиссе", category: "Юбки", price: 3800, img: PRODUCT_IMG1, badge: null, sizes: ["XS","S","M","L"], color: "#5C2A6E" },
  { id: 8, name: "Брюки карго", category: "Брюки", price: 4100, oldPrice: 5200, img: PRODUCT_IMG2, badge: "-21%", sizes: ["XS","S","M","L","XL"], color: "#3B3B2F" },
];

export type Page = "catalog" | "cart" | "account";

export interface CartItem {
  product: typeof PRODUCTS[0];
  size: string;
  qty: number;
}

export interface User {
  name: string;
  email: string;
  logged: boolean;
}
