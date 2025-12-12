import { useState, useEffect } from "react";

export default function MenuModal({ isOpen, onClose, menuItems }) {
  const [activeCategory, setActiveCategory] = useState("");

  const categories = [...new Set(menuItems.map((item) => item.category))];

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    } else if (categories.length > 0 && !categories.includes(activeCategory)) {
      setActiveCategory(categories[0]);
    }
  }, [menuItems, categories, activeCategory]);

  if (!isOpen) return null;

  const currentItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#4C0000] overflow-y-auto md:hidden flex flex-col">
      {/* Header Fixo */}
      <header className="sticky top-0 bg-[#4C0000] text-white px-6 py-5 flex items-center gap-4 z-30 shadow-md">
        <button onClick={onClose} className="p-1">
          <svg className="w-7 h-7" fill="white" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Cardápio</h1>
      </header>

      {/* Navegação por Abas (Horizontal Scroll) */}
      <div className="sticky top-[88px] z-20 bg-[#4C0000] border-b border-white/20">
        <div className="flex overflow-x-auto px-4 py-3 gap-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-white text-[#4C0000]"
                  : "bg-transparent text-white border border-white/30 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex-1 pb-24 min-h-screen">
        {/* Background Image */}
        <div
          className="fixed right-0 top-0 w-full h-full bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: "url(/assets/images/cardapio.png)" }}
        />

        {/* Lista de Itens Filtrada */}
        <div className="relative z-10 px-6 pt-6 space-y-6">
          {menuItems.length === 0 && (
            <p className="text-white text-center mt-10">
              Nenhum item disponível.
            </p>
          )}

          {currentItems.length > 0 ? (
            <div className="space-y-4">
              {/* Título da Seção (Opcional, já que a aba está marcada) */}
              <h2 className="text-xl font-bold text-amber-400 mb-4">
                {activeCategory}
              </h2>

              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="text-white bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/10"
                >
                  <h3 className="font-bold text-lg leading-tight mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-200 leading-snug opacity-90">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/60 text-center mt-10">
              Selecione uma categoria acima.
            </p>
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 h-20 border-t border-black bg-white z-20">
        <nav className="flex h-20 items-center justify-evenly">
          <a href="/" className="flex flex-col items-center gap-1">
            <img className="h-6 w-6" src="/assets/icons/home.svg" alt="" />
            <span className="text-xs">Início</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-1">
            <img className="h-6 w-6" src="/assets/icons/lupa.svg" alt="" />
            <span className="text-xs">Pesquisa</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center gap-1 text-amber-600"
          >
            <img className="h-6 w-6" src="/assets/icons/reservas.svg" alt="" />
            <span className="text-xs font-semibold">Reservas</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-1">
            <img className="h-6 w-6" src="/assets/icons/user.svg" alt="" />
            <span className="text-xs">Perfil</span>
          </a>
        </nav>
      </footer>
    </div>
  );
}
