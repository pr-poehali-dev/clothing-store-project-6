import { useState, useMemo } from "react";
import { CATEGORIES, PRODUCTS, CartItem, User, Page } from "@/components/shop/types";
import ShopHeader from "@/components/shop/ShopHeader";
import CatalogPage from "@/components/shop/CatalogPage";
import CartPage from "@/components/shop/CartPage";
import AccountPage from "@/components/shop/AccountPage";

export default function Index() {
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

      <ShopHeader
        page={page}
        search={search}
        cartCount={cartCount}
        sidebarOpen={sidebarOpen}
        activeCategory={activeCategory}
        userName={user.name}
        userLogged={user.logged}
        cartOpen={cartOpen}
        onSearch={setSearch}
        onSetPage={setPage}
        onSetSidebarOpen={setSidebarOpen}
        onSetActiveCategory={setActiveCategory}
        onSetCartOpen={setCartOpen}
      />

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

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {page === "catalog" && (
            <CatalogPage
              filtered={filtered}
              search={search}
              activeCategory={activeCategory}
              selectedSize={selectedSize}
              wishlist={wishlist}
              onSetActiveCategory={setActiveCategory}
              onSetPage={setPage}
              onSetSearch={setSearch}
              onSetSelectedSize={setSelectedSize}
              onToggleWishlist={toggleWishlist}
              onAddToCart={addToCart}
            />
          )}

          {page === "cart" && (
            <CartPage
              cart={cart}
              cartTotal={cartTotal}
              cartCount={cartCount}
              onSetPage={setPage}
              onRemoveFromCart={removeFromCart}
              onSetCart={setCart}
            />
          )}

          {page === "account" && (
            <AccountPage
              user={user}
              loginForm={loginForm}
              authMode={authMode}
              wishlistCount={wishlist.length}
              cartCount={cartCount}
              onSetLoginForm={setLoginForm}
              onSetAuthMode={setAuthMode}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
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
