import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/936a2487-6256-47e6-9e29-f997125c1008/files/63422b73-5171-491e-b8d7-a73521bbd72c.jpg";
const PRODUCT_IMG1 = "https://cdn.poehali.dev/projects/936a2487-6256-47e6-9e29-f997125c1008/files/aa064a5c-0763-453c-af13-fc6956c96acb.jpg";
const PRODUCT_IMG2 = "https://cdn.poehali.dev/projects/936a2487-6256-47e6-9e29-f997125c1008/files/fa248d3c-fc12-4a3f-8037-997a478638fa.jpg";

const CATEGORIES = [
  "Верхняя одежда", "Свитеры, джемперы", "Платья", "Брюки", "Юбки",
  "Блузки", "Рубашки", "Жакеты", "Кардиганы", "Водолазки", "Джинсы",
  "Толстовки, свитшоты", "Лонгсливы", "Футболки", "Майки, топы",
  "Поло", "Шорты", "Легинсы", "Жилеты", "Носки", "Аксессуары",
  "Нижнее бельё", "Домашняя одежда"
];

const PRODUCTS = [
  { id: 1, name: "Пальто оверсайз", category: "Верхняя одежда", price: 8900, oldPrice: 12900, img: PRODUCT_IMG2, badge: "Хит", sizes: ["XS","S","M","L","XL"], color: "#2C2C2C" },
  { id: 2, name: "Платье миди", category: "Платья", price: 5400, img: PRODUCT_IMG1, badge: "Новинка", sizes: ["XS","S","M","L"], color: "#8B2252" },
  { id: 3, name: "Жакет в клетку", category: "Жакеты", price: 6200, oldPrice: 7800, img: PRODUCT_IMG1, badge: null, sizes: ["S","M","L","XL"], color: "#3D2B1F" },
  { id: 4, name: "Водолазка рубчик", category: "Водолазки", price: 2900, img: PRODUCT_IMG2, badge: "Хит", sizes: ["XS","S","M","L","XL","XXL"], color: "#1A1A2E" },
  { id: 5, name: "Джинсы прямые", category: "Джинсы", price: 4500, oldPrice: 5900, img: PRODUCT_IMG1, badge: "-23%", sizes: ["25","26","27","28","29","30"], color: "#1C3A5E" },
  { id: 6, name: "Свитшот базовый", category: "Толстовки, свитшоты", price: 3200, img: PRODUCT_IMG2, badge: "Новинка", sizes: ["XS","S","M","L","XL"], color: "#2D4739" },
  { id: 7, name: "Юбка плиссе", category: "Юбки", price: 3800, img: PRODUCT_IMG1, badge: null, sizes: ["XS","S","M","L"], color: "#5C2A6E" },
  { id: 8, name: "Брюки карго", category: "Брюки", price: 4100, oldPrice: 5200, img: PRODUCT_IMG2, badge: "-21%", sizes: ["XS","S","M","L","XL"], color: "#3B3B2F" },
];

type Page = "catalog" | "cart" | "account";

interface CartItem {
  product: typeof PRODUCTS[0];
  size: string;
  qty: number;
}

interface User {
  name: string;
  email: string;
  logged: boolean;
}

export default function Index() {
  const navigate = useNavigate();
  const [page, setPage] = useState<Page>("catalog");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedSize, setSelectedSize] = useState<Record<number, string>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState<User>({ name: "", email: "", logged: false });
  const [loginForm, setLoginForm] = useState({ email: "", password: "", name: "" });
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory ? p.category === activeCategory : true;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (product: typeof PRODUCTS[0]) => {
    const size = selectedSize[product.id] || product.sizes[0];
    setCart(prev => {
      const ex = prev.find(i => i.product.id === product.id && i.size === size);
      if (ex) return prev.map(i => i.product.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, size, qty: 1 }];
    });
    showNotification(`«${product.name}» добавлен в корзину`);
  };

  const removeFromCart = (id: number, size: string) => {
    setCart(prev => prev.filter(i => !(i.product.id === id && i.size === size)));
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleLogin = () => {
    if (!loginForm.email || !loginForm.password) return;
    setUser({ name: loginForm.name || loginForm.email.split("@")[0], email: loginForm.email, logged: true });
    showNotification("Добро пожаловать!");
  };

  const handleLogout = () => {
    setUser({ name: "", email: "", logged: false });
  };

  return (
    <div className="min-h-screen font-body" style={{ background: "var(--dark-bg)", color: "#F8F8F8" }}>

      {/* Notification */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-white text-sm font-semibold animate-fade-in-up"
          style={{ background: "var(--neon-pink)", boxShadow: "0 0 30px rgba(255,45,155,0.6)" }}>
          {notification}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)", borderColor: "var(--border-color)" }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white transition-colors lg:hidden">
              <Icon name="Menu" size={22} />
            </button>
            <button onClick={() => { setPage("catalog"); setActiveCategory(null); }} className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-widest neon-text-pink" style={{ fontFamily: "'Montserrat', sans-serif" }}>NOVA</span>
              <span className="text-xs text-gray-500 tracking-widest uppercase hidden sm:block">Женская коллекция</span>
            </button>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage("catalog"); }}
                placeholder="Поиск товаров и коллекций..."
                className="w-full pl-9 pr-4 py-2 text-sm rounded-full border text-white placeholder-gray-500 focus:outline-none transition-all"
                style={{ background: "var(--card-bg)", borderColor: search ? "var(--neon-pink)" : "var(--border-color)", boxShadow: search ? "0 0 15px rgba(255,45,155,0.2)" : "none" }}
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  <Icon name="X" size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={() => { setPage("account"); setCartOpen(false); }}
              className="p-2 rounded-full hover:bg-white/5 transition-colors flex items-center gap-1">
              <Icon name="User" size={20} className={page === "account" ? "" : "text-gray-300"} style={{ color: page === "account" ? "var(--neon-pink)" : undefined }} />
              {user.logged && <span className="text-xs text-gray-400 hidden sm:block">{user.name}</span>}
            </button>
            <button onClick={() => { setCartOpen(!cartOpen); setPage("cart"); }}
              className="p-2 rounded-full hover:bg-white/5 transition-colors relative">
              <Icon name="ShoppingBag" size={20} className="text-gray-300" style={{ color: page === "cart" ? "var(--neon-pink)" : undefined }} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: "var(--neon-pink)" }}>{cartCount}</span>
              )}
            </button>
            <button onClick={() => navigate("/card")}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
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
              onChange={e => { setSearch(e.target.value); setPage("catalog"); }}
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
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 h-full overflow-y-auto animate-slide-in-right" style={{ background: "var(--card-bg)", borderRight: "1px solid var(--border-color)" }}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "var(--border-color)" }}>
              <span className="font-bold text-lg neon-text-pink">Каталог</span>
              <button onClick={() => setSidebarOpen(false)}><Icon name="X" size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-4 space-y-1">
              <button onClick={() => { setActiveCategory(null); setSidebarOpen(false); setPage("catalog"); }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${!activeCategory ? "text-white" : "text-gray-400 hover:text-white"}`}
                style={{ background: !activeCategory ? "var(--neon-pink)" : "transparent" }}>
                Все категории
              </button>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => { setActiveCategory(cat); setSidebarOpen(false); setPage("catalog"); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${activeCategory === cat ? "text-white font-semibold" : "text-gray-400 hover:text-white"}`}
                  style={{ background: activeCategory === cat ? "rgba(255,45,155,0.15)" : "transparent", borderLeft: activeCategory === cat ? "3px solid var(--neon-pink)" : "3px solid transparent" }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 flex gap-8 py-8">
        {/* Sidebar desktop */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--neon-pink)" }}>Категории</h3>
            <div className="space-y-0.5">
              <button onClick={() => { setActiveCategory(null); setPage("catalog"); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${!activeCategory ? "text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                style={{ background: !activeCategory ? "rgba(255,45,155,0.2)" : "transparent", borderLeft: !activeCategory ? "3px solid var(--neon-pink)" : "3px solid transparent" }}>
                Все категории
              </button>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => { setActiveCategory(cat); setPage("catalog"); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${activeCategory === cat ? "text-white font-semibold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                  style={{ background: activeCategory === cat ? "rgba(255,45,155,0.15)" : "transparent", borderLeft: activeCategory === cat ? "3px solid var(--neon-pink)" : "3px solid transparent" }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">

          {/* CATALOG PAGE */}
          {page === "catalog" && (
            <div className="animate-fade-in">
              {/* Hero — only on main catalog without filters */}
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

              {/* Category title */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {search ? `Результаты: «${search}»` : activeCategory || "Все товары"}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">{filtered.length} {filtered.length === 1 ? "товар" : "товаров"}</p>
                </div>
                {(activeCategory || search) && (
                  <button onClick={() => { setActiveCategory(null); setSearch(""); }}
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
                        <button onClick={() => toggleWishlist(product.id)}
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
                            <button key={sz} onClick={() => setSelectedSize(prev => ({ ...prev, [product.id]: sz }))}
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
                          <button onClick={() => addToCart(product)}
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
            </div>
          )}

          {/* CART PAGE */}
          {page === "cart" && (
            <div className="animate-fade-in max-w-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Корзина</h2>
              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="text-lg font-medium text-gray-400">Корзина пуста</p>
                  <button onClick={() => setPage("catalog")} className="btn-neon mt-6 px-8 py-3 rounded-full text-sm">
                    Перейти в каталог
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {cart.map(item => (
                      <div key={`${item.product.id}-${item.size}`}
                        className="flex gap-4 p-4 rounded-2xl animate-fade-in-up"
                        style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)" }}>
                        <img src={item.product.img} alt={item.product.name} className="w-20 h-24 object-cover rounded-xl flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 mb-0.5">{item.product.category}</p>
                          <h4 className="font-semibold text-white text-sm mb-1">{item.product.name}</h4>
                          <span className="text-xs px-2 py-0.5 rounded border text-gray-400" style={{ borderColor: "var(--border-color)" }}>Размер: {item.size}</span>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <button onClick={() => {
                                if (item.qty === 1) removeFromCart(item.product.id, item.size);
                                else setCart(prev => prev.map(i => i.product.id === item.product.id && i.size === item.size ? { ...i, qty: i.qty - 1 } : i));
                              }} className="w-7 h-7 rounded-full border flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all" style={{ borderColor: "var(--border-color)" }}>
                                <Icon name="Minus" size={12} />
                              </button>
                              <span className="text-white font-semibold w-5 text-center">{item.qty}</span>
                              <button onClick={() => setCart(prev => prev.map(i => i.product.id === item.product.id && i.size === item.size ? { ...i, qty: i.qty + 1 } : i))}
                                className="w-7 h-7 rounded-full border flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all" style={{ borderColor: "var(--border-color)" }}>
                                <Icon name="Plus" size={12} />
                              </button>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-white">{(item.product.price * item.qty).toLocaleString()} ₽</span>
                              <button onClick={() => removeFromCart(item.product.id, item.size)} className="text-gray-500 hover:text-red-400 transition-colors">
                                <Icon name="Trash2" size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)" }}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Товаров: {cartCount}</span>
                      <span className="text-gray-400">{cartTotal.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-bold text-white text-lg">Итого</span>
                      <span className="font-black text-xl neon-text-pink">{cartTotal.toLocaleString()} ₽</span>
                    </div>
                    <button className="btn-neon w-full py-4 rounded-xl text-sm">
                      Оформить заказ
                    </button>
                    <button onClick={() => setPage("catalog")} className="btn-outline-neon w-full py-3 rounded-xl text-sm mt-3">
                      Продолжить покупки
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ACCOUNT PAGE */}
          {page === "account" && (
            <div className="animate-fade-in max-w-md">
              {!user.logged ? (
                <div className="rounded-2xl p-8" style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)" }}>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {authMode === "login" ? "Вход в аккаунт" : "Регистрация"}
                  </h2>
                  <p className="text-gray-500 text-sm mb-6">
                    {authMode === "login" ? "Войдите, чтобы отслеживать заказы" : "Создайте аккаунт для удобных покупок"}
                  </p>

                  <div className="space-y-3">
                    {authMode === "register" && (
                      <div>
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Имя</label>
                        <input value={loginForm.name} onChange={e => setLoginForm(p => ({ ...p, name: e.target.value }))}
                          placeholder="Ваше имя" className="w-full px-4 py-3 rounded-xl border text-white placeholder-gray-600 focus:outline-none transition-all text-sm"
                          style={{ background: "#0A0A0A", borderColor: "var(--border-color)" }} />
                      </div>
                    )}
                    <div>
                      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Email</label>
                      <input type="email" value={loginForm.email} onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))}
                        placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl border text-white placeholder-gray-600 focus:outline-none transition-all text-sm"
                        style={{ background: "#0A0A0A", borderColor: "var(--border-color)" }} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Пароль</label>
                      <input type="password" value={loginForm.password} onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
                        placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border text-white placeholder-gray-600 focus:outline-none transition-all text-sm"
                        style={{ background: "#0A0A0A", borderColor: "var(--border-color)" }} />
                    </div>
                    <button onClick={handleLogin} className="btn-neon w-full py-4 rounded-xl text-sm mt-2">
                      {authMode === "login" ? "Войти" : "Зарегистрироваться"}
                    </button>
                  </div>

                  <p className="text-center text-gray-500 text-sm mt-5">
                    {authMode === "login" ? "Нет аккаунта? " : "Уже есть аккаунт? "}
                    <button onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
                      className="font-semibold hover:underline transition-all" style={{ color: "var(--neon-pink)" }}>
                      {authMode === "login" ? "Зарегистрироваться" : "Войти"}
                    </button>
                  </p>
                </div>
              ) : (
                <div>
                  <div className="rounded-2xl p-6 mb-4" style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)" }}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl"
                        style={{ background: "linear-gradient(135deg, var(--neon-pink), #8B00FF)" }}>
                        {user.name[0]?.toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">{user.name}</h3>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[
                        { label: "Заказов", val: "0", icon: "Package" },
                        { label: "Избранное", val: String(wishlist.length), icon: "Heart" },
                        { label: "В корзине", val: String(cartCount), icon: "ShoppingBag" },
                      ].map(s => (
                        <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: "#0A0A0A" }}>
                          <Icon name={s.icon} fallback="Package" size={18} className="mx-auto mb-1" style={{ color: "var(--neon-pink)" }} />
                          <p className="text-xl font-black text-white">{s.val}</p>
                          <p className="text-xs text-gray-500">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {[
                        { label: "Мои заказы", icon: "Package" },
                        { label: "Избранные товары", icon: "Heart" },
                        { label: "Адреса доставки", icon: "MapPin" },
                        { label: "Настройки профиля", icon: "Settings" },
                      ].map(item => (
                        <button key={item.label}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-300 hover:text-white transition-all hover:bg-white/5 text-left">
                          <Icon name={item.icon} fallback="ChevronRight" size={16} style={{ color: "var(--neon-pink)" }} />
                          {item.label}
                          <Icon name="ChevronRight" size={14} className="ml-auto text-gray-600" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <button onClick={handleLogout}
                    className="w-full py-3 rounded-xl text-sm font-semibold text-gray-400 hover:text-white transition-all flex items-center justify-center gap-2 border"
                    style={{ borderColor: "var(--border-color)" }}>
                    <Icon name="LogOut" size={15} />
                    Выйти из аккаунта
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t py-8 px-4" style={{ borderColor: "var(--border-color)" }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xl font-black tracking-widest neon-text-pink">NOVA</span>
          <p className="text-xs text-gray-600">© 2026 NOVA. Женская коллекция. Все права защищены.</p>
          <div className="flex gap-4 text-xs text-gray-600">
            <button className="hover:text-gray-300 transition-colors">Доставка</button>
            <button className="hover:text-gray-300 transition-colors">Возврат</button>
            <button className="hover:text-gray-300 transition-colors">Контакты</button>
          </div>
        </div>
      </footer>
    </div>
  );
}