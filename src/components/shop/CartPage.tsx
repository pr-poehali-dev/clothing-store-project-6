import Icon from "@/components/ui/icon";
import { CartItem, Page } from "./types";

interface CartPageProps {
  cart: CartItem[];
  cartTotal: number;
  cartCount: number;
  onSetPage: (p: Page) => void;
  onRemoveFromCart: (id: number, size: string) => void;
  onSetCart: (fn: (prev: CartItem[]) => CartItem[]) => void;
}

export default function CartPage({
  cart, cartTotal, cartCount, onSetPage, onRemoveFromCart, onSetCart,
}: CartPageProps) {
  return (
    <div className="animate-fade-in max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Корзина</h2>
      {cart.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium text-gray-400">Корзина пуста</p>
          <button onClick={() => onSetPage("catalog")} className="btn-neon mt-6 px-8 py-3 rounded-full text-sm">
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
                        if (item.qty === 1) onRemoveFromCart(item.product.id, item.size);
                        else onSetCart(prev => prev.map(i => i.product.id === item.product.id && i.size === item.size ? { ...i, qty: i.qty - 1 } : i));
                      }} className="w-7 h-7 rounded-full border flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all" style={{ borderColor: "var(--border-color)" }}>
                        <Icon name="Minus" size={12} />
                      </button>
                      <span className="text-white font-semibold w-5 text-center">{item.qty}</span>
                      <button onClick={() => onSetCart(prev => prev.map(i => i.product.id === item.product.id && i.size === item.size ? { ...i, qty: i.qty + 1 } : i))}
                        className="w-7 h-7 rounded-full border flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all" style={{ borderColor: "var(--border-color)" }}>
                        <Icon name="Plus" size={12} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-white">{(item.product.price * item.qty).toLocaleString()} ₽</span>
                      <button onClick={() => onRemoveFromCart(item.product.id, item.size)} className="text-gray-500 hover:text-red-400 transition-colors">
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
            <button onClick={() => onSetPage("catalog")} className="btn-outline-neon w-full py-3 rounded-xl text-sm mt-3">
              Продолжить покупки
            </button>
          </div>
        </>
      )}
    </div>
  );
}
