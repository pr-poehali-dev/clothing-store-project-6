import Icon from "@/components/ui/icon";
import { CATEGORIES, HERO_IMG, Page } from "./types";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  img: string;
  badge: string | null;
  sizes: string[];
  color: string;
};

interface CatalogPageProps {
  filtered: Product[];
  search: string;
  activeCategory: string | null;
  selectedSize: Record<number, string>;
  wishlist: number[];
  onSetActiveCategory: (cat: string | null) => void;
  onSetPage: (p: Page) => void;
  onSetSearch: (v: string) => void;
  onSetSelectedSize: (fn: (prev: Record<number, string>) => Record<number, string>) => void;
  onToggleWishlist: (id: number) => void;
  onAddToCart: (product: Product) => void;
}

export default function CatalogPage({
  filtered, search, activeCategory, selectedSize, wishlist,
  onSetActiveCategory, onSetPage, onSetSearch, onSetSelectedSize,
  onToggleWishlist, onAddToCart,
}: CatalogPageProps) {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      {!activeCategory && !search && (
        <div className="relative rounded-2xl overflow-hidden mb-10 h-72 sm:h-96">
          <img src={HERO_IMG} alt="NOVA Collection" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,10,10,0.85) 40%, transparent)" }} />
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12">
            <span className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--neon-yellow)" }}>Новая коллекция 2026</span>
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-none mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
              Женская<br />мода
            </h1>
            <p className="text-gray-300 text-sm mb-6 max-w-xs">Смелые образы для тех, кто не боится быть собой</p>
            <button className="btn-neon px-6 py-3 rounded-full text-sm w-fit">
              Смотреть каталог
            </button>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block absolute left-0" />

      {/* Category title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">
            {search ? `Результаты: «${search}»` : activeCategory || "Все товары"}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} {filtered.length === 1 ? "товар" : "товаров"}</p>
        </div>
        {(activeCategory || search) && (
          <button onClick={() => { onSetActiveCategory(null); onSetSearch(""); }}
            className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all hover:bg-white/5"
            style={{ borderColor: "var(--border-color)", color: "var(--neon-pink)" }}>
            <Icon name="X" size={12} /> Сбросить
          </button>
        )}
      </div>

      {/* Products grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Icon name="SearchX" size={40} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">Ничего не найдено</p>
          <p className="text-sm mt-1">Попробуйте другой запрос или категорию</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product, idx) => (
            <div key={product.id}
              className="card-hover rounded-2xl overflow-hidden group cursor-pointer animate-fade-in-up"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)", animationDelay: `${idx * 0.05}s` }}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {product.badge && (
                  <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: product.badge.includes("%") ? "var(--neon-yellow)" : "var(--neon-pink)", color: product.badge.includes("%") ? "#0A0A0A" : "white" }}>
                    {product.badge}
                  </span>
                )}
                <button onClick={() => onToggleWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{ background: wishlist.includes(product.id) ? "var(--neon-pink)" : "rgba(0,0,0,0.5)" }}>
                  <Icon name="Heart" size={14} className="text-white" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                <h3 className="font-semibold text-sm text-white mb-2 leading-tight">{product.name}</h3>

                {/* Sizes */}
                <div className="flex gap-1 flex-wrap mb-3">
                  {product.sizes.map(sz => (
                    <button key={sz} onClick={() => onSetSelectedSize(prev => ({ ...prev, [product.id]: sz }))}
                      className="text-[10px] px-2 py-0.5 rounded border transition-all font-medium"
                      style={{
                        borderColor: selectedSize[product.id] === sz ? "var(--neon-pink)" : "var(--border-color)",
                        color: selectedSize[product.id] === sz ? "var(--neon-pink)" : "#888",
                        background: selectedSize[product.id] === sz ? "rgba(255,45,155,0.1)" : "transparent"
                      }}>
                      {sz}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white">{product.price.toLocaleString()} ₽</span>
                    {product.oldPrice && <span className="text-xs text-gray-500 line-through ml-1.5">{product.oldPrice.toLocaleString()} ₽</span>}
                  </div>
                  <button onClick={() => onAddToCart(product)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                    style={{ background: "var(--neon-pink)", boxShadow: "0 0 15px rgba(255,45,155,0.35)" }}>
                    <Icon name="Plus" size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Desktop sidebar categories — rendered here as a separate aside in parent */}
      <div id="catalog-categories-anchor" />
    </div>
  );
}

export { CATEGORIES };
