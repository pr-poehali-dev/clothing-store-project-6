import Icon from "@/components/ui/icon";
import { User } from "./types";

interface AccountPageProps {
  user: User;
  loginForm: { email: string; password: string; name: string };
  authMode: "login" | "register";
  wishlistCount: number;
  cartCount: number;
  onSetLoginForm: (fn: (prev: { email: string; password: string; name: string }) => { email: string; password: string; name: string }) => void;
  onSetAuthMode: (mode: "login" | "register") => void;
  onLogin: () => void;
  onLogout: () => void;
}

export default function AccountPage({
  user, loginForm, authMode, wishlistCount, cartCount,
  onSetLoginForm, onSetAuthMode, onLogin, onLogout,
}: AccountPageProps) {
  return (
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
                <input value={loginForm.name} onChange={e => onSetLoginForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Ваше имя" className="w-full px-4 py-3 rounded-xl border text-white placeholder-gray-600 focus:outline-none transition-all text-sm"
                  style={{ background: "#0A0A0A", borderColor: "var(--border-color)" }} />
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Email</label>
              <input type="email" value={loginForm.email} onChange={e => onSetLoginForm(p => ({ ...p, email: e.target.value }))}
                placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl border text-white placeholder-gray-600 focus:outline-none transition-all text-sm"
                style={{ background: "#0A0A0A", borderColor: "var(--border-color)" }} />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Пароль</label>
              <input type="password" value={loginForm.password} onChange={e => onSetLoginForm(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border text-white placeholder-gray-600 focus:outline-none transition-all text-sm"
                style={{ background: "#0A0A0A", borderColor: "var(--border-color)" }} />
            </div>
            <button onClick={onLogin} className="btn-neon w-full py-4 rounded-xl text-sm mt-2">
              {authMode === "login" ? "Войти" : "Зарегистрироваться"}
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm mt-5">
            {authMode === "login" ? "Нет аккаунта? " : "Уже есть аккаунт? "}
            <button onClick={() => onSetAuthMode(authMode === "login" ? "register" : "login")}
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
                { label: "Избранное", val: String(wishlistCount), icon: "Heart" },
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

          <button onClick={onLogout}
            className="w-full py-3 rounded-xl text-sm font-semibold text-gray-400 hover:text-white transition-all flex items-center justify-center gap-2 border"
            style={{ borderColor: "var(--border-color)" }}>
            <Icon name="LogOut" size={15} />
            Выйти из аккаунта
          </button>
        </div>
      )}
    </div>
  );
}
