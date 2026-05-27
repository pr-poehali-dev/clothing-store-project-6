import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { CATEGORIES, Page } from "./types";

interface ShopHeaderProps {
  page: Page;
  search: string;
  cartCount: number;
  sidebarOpen: boolean;
  activeCategory: string | null;
  userName: string;
  userLogged: boolean;
  onSearch: (val: string) => void;
  onSetPage: (p: Page) => void;
  onSetSidebarOpen: (v: boolean) => void;
  onSetActiveCategory: (cat: string | null) => void;
  onSetCartOpen: (v: boolean) => void;
  cartOpen: boolean;
}

export default function ShopHeader({
  page, search, cartCount, sidebarOpen, activeCategory,
  userName, userLogged,
  onSearch, onSetPage, onSetSidebarOpen, onSetActiveCategory, onSetCartOpen, cartOpen,
}: ShopHeaderProps) {
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-50 border-b" style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)", borderColor: "var(--border-color)" }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button onClick={() => onSetSidebarOpen(true)} className="text-gray-400 hover:text-white transition-colors lg:hidden">
              <Icon name="Menu" size={22} />
            </button>
            <button onClick={() => { onSetPage("catalog"); onSetActiveCategory(null); }} className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-widest neon-text-pink" style={{ fontFamily: "'Montserrat', sans-serif" }}>NOVA</span>
              <span className="text-xs text-gray-500 tracking-widest uppercase hidden sm:block">Женская коллекция</span>
            </button>
          </div>

          {/* Search desktop */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                value={search}
                onChange={e => { onSearch(e.target.value); onSetPage("catalog"); }}
                placeholder="Поиск товаров и коллекций..."
                className="w-full pl-9 pr-4 py-2 text-sm rounded-full border text-white placeholder-gray-500 focus:outline-none transition-all"
                style={{ background: "var(--card-bg)", borderColor: search ? "var(--neon-pink)" : "var(--border-color)", boxShadow: search ? "0 0 15px rgba(255,45,155,0.2)" : "none" }}
              />
              {search && (
                <button onClick={() => onSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  <Icon name="X" size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={() => { onSetPage("account"); onSetCartOpen(false); }}
              className="p-2 rounded-full hover:bg-white/5 transition-colors flex items-center gap-1">
              <Icon name="User" size={20} className={page === "account" ? "" : "text-gray-300"} style={{ color: page === "account" ? "var(--neon-pink)" : undefined }} />
              {userLogged && <span className="text-xs text-gray-400 hidden sm:block">{userName}</span>}
            </button>
            <button onClick={() => { onSetCartOpen(!cartOpen); onSetPage("cart"); }}
              className="p-2 rounded-full hover:bg-white/5 transition-colors relative">
              <Icon name="ShoppingBag" size={20} className="text-gray-300" style={{ color: page === "cart" ? "var(--neon-pink)" : undefined }} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: "var(--neon-pink)" }}>{cartCount}</span>
              )}
            </button>
            <button onClick={() => navigate("/card")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
              style={{ border: "1px solid rgba(255,45,155,0.4)", color: "var(--neon-pink)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,45,155,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
              <Icon name="Contact" size={13} />
              Контакты
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={search}
              onChange={e => { onSearch(e.target.value); onSetPage("catalog"); }}
              placeholder="Поиск..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-full border text-white placeholder-gray-500 focus:outline-none"
              style={{ background: "var(--card-bg)", borderColor: "var(--border-color)" }}
            />
          </div>
        </div>
      </header>

      {/* Sidebar mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => onSetSidebarOpen(false)} />
          <div className="relative w-72 h-full overflow-y-auto animate-slide-in-right" style={{ background: "var(--card-bg)", borderRight: "1px solid var(--border-color)" }}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "var(--border-color)" }}>
              <span className="font-bold text-lg neon-text-pink">Каталог</span>
              <button onClick={() => onSetSidebarOpen(false)}><Icon name="X" size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-4 space-y-1">
              <button onClick={() => { onSetActiveCategory(null); onSetSidebarOpen(false); onSetPage("catalog"); }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${!activeCategory ? "text-white" : "text-gray-400 hover:text-white"}`}
                style={{ background: !activeCategory ? "var(--neon-pink)" : "transparent" }}>
                Все категории
              </button>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => { onSetActiveCategory(cat); onSetSidebarOpen(false); onSetPage("catalog"); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${activeCategory === cat ? "text-white font-semibold" : "text-gray-400 hover:text-white"}`}
                  style={{ background: activeCategory === cat ? "rgba(255,45,155,0.15)" : "transparent", borderLeft: activeCategory === cat ? "3px solid var(--neon-pink)" : "3px solid transparent" }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}