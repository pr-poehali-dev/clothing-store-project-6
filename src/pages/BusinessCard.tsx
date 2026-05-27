import Icon from "@/components/ui/icon";

const BG_IMG = "https://cdn.poehali.dev/projects/936a2487-6256-47e6-9e29-f997125c1008/files/2e91d03a-5d20-48d1-8d8c-46270de5f955.jpg";

export default function BusinessCard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={BG_IMG} alt="bg" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, rgba(10,5,20,0.88) 0%, rgba(60,10,40,0.80) 50%, rgba(10,5,20,0.92) 100%)"
        }} />
        {/* Декоративные пятна */}
        <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #FF2D9B, transparent)" }} />
        <div className="absolute bottom-[-60px] right-[-60px] w-[350px] h-[350px] rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)" }} />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg mx-4 animate-fade-in-up">
        <div className="rounded-3xl overflow-hidden"
          style={{
            background: "rgba(18, 8, 30, 0.75)",
            backdropFilter: "blur(30px)",
            border: "1px solid rgba(255,45,155,0.25)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(255,45,155,0.08)"
          }}>

          {/* Top accent line */}
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #FF2D9B, #a855f7, #FF2D9B)" }} />

          <div className="px-8 pt-10 pb-10">

            {/* Logo / Brand */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                style={{
                  background: "linear-gradient(135deg, rgba(255,45,155,0.2), rgba(168,85,247,0.2))",
                  border: "1.5px solid rgba(255,45,155,0.4)",
                  boxShadow: "0 0 30px rgba(255,45,155,0.2)"
                }}>
                <span style={{ fontSize: 36 }}>👗</span>
              </div>

              <h1 className="text-4xl font-black tracking-widest text-white mb-1"
                style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.15em" }}>
                NOVA
              </h1>
              <p className="text-sm font-medium tracking-[0.3em] uppercase"
                style={{ color: "rgba(255,45,155,0.9)" }}>
                Женская одежда
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,45,155,0.3))" }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--neon-pink)" }} />
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(255,45,155,0.3))" }} />
            </div>

            {/* Description */}
            <div className="text-center mb-8 px-2">
              <p className="text-gray-300 leading-relaxed text-sm"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", fontStyle: "italic", lineHeight: "1.7" }}>
                Мы создаём пространство, где каждая женщина открывает свой стиль.
                Актуальные коллекции, изысканные образы и безупречное качество —
                всё это <span style={{ color: "var(--neon-pink)", fontStyle: "normal", fontWeight: 600 }}>NOVA</span>.
              </p>
              <p className="text-gray-500 text-xs mt-3 tracking-wide">
                Мода — это язык. Мы поможем вам говорить на нём красиво.
              </p>
            </div>

            {/* Contacts */}
            <div className="space-y-3 mb-8">
              <a href="tel:+992110007935"
                className="flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all group"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,45,155,0.4)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,45,155,0.15)", border: "1px solid rgba(255,45,155,0.3)" }}>
                  <Icon name="Phone" size={15} style={{ color: "var(--neon-pink)" }} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">Таджикистан</p>
                  <p className="text-white font-semibold tracking-wide">+992 110 007 935</p>
                </div>
                <Icon name="ChevronRight" size={14} className="ml-auto text-gray-700 group-hover:text-pink-400 transition-colors" />
              </a>

              <a href="tel:+79117010002"
                className="flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all group"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,45,155,0.4)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,45,155,0.15)", border: "1px solid rgba(255,45,155,0.3)" }}>
                  <Icon name="Phone" size={15} style={{ color: "var(--neon-pink)" }} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">Россия</p>
                  <p className="text-white font-semibold tracking-wide">+7 911 701 00 02</p>
                </div>
                <Icon name="ChevronRight" size={14} className="ml-auto text-gray-700 group-hover:text-pink-400 transition-colors" />
              </a>

              <div className="flex items-start gap-4 px-5 py-3.5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(255,45,155,0.15)", border: "1px solid rgba(255,45,155,0.3)" }}>
                  <Icon name="MapPin" size={15} style={{ color: "var(--neon-pink)" }} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">Адрес</p>
                  <p className="text-white font-semibold leading-snug">Санкт-Петербург</p>
                  <p className="text-gray-400 text-sm">г. Бугры, ул. Полевая</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <a href="tel:+79117010002"
                className="flex-1 py-3.5 rounded-2xl text-sm font-bold text-center tracking-wider uppercase transition-all"
                style={{
                  background: "linear-gradient(135deg, #FF2D9B, #c0176b)",
                  color: "white",
                  boxShadow: "0 0 25px rgba(255,45,155,0.35)"
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 40px rgba(255,45,155,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 25px rgba(255,45,155,0.35)")}>
                Позвонить
              </a>
              <a href="#catalog"
                className="flex-1 py-3.5 rounded-2xl text-sm font-bold text-center tracking-wider uppercase transition-all"
                style={{
                  background: "transparent",
                  color: "rgba(255,45,155,0.9)",
                  border: "1.5px solid rgba(255,45,155,0.5)"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(255,45,155,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,45,155,0.8)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(255,45,155,0.5)";
                }}>
                Каталог
              </a>
            </div>

            {/* Footer note */}
            <p className="text-center text-gray-700 text-xs mt-6 tracking-widest uppercase">
              Стиль — это не одежда. Это образ жизни.
            </p>
          </div>

          {/* Bottom accent line */}
          <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(255,45,155,0.4), transparent)" }} />
        </div>
      </div>
    </div>
  );
}
