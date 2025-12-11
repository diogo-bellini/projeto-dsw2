import { useState, useEffect } from "react";

export default function Menu({ menuItems = [] }) {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    if (menuItems.length > 0) {
      const uniqueCategories = [
        ...new Set(menuItems.map((item) => item.category)),
      ];
      setCategories(uniqueCategories);

      if (!activeCategory || !uniqueCategories.includes(activeCategory)) {
        setActiveCategory(uniqueCategories[0]);
      }
    }
  }, [menuItems, activeCategory]);

  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="flex h-auto w-full flex-col p-5 border border-gray-200 rounded-xl">
        <p className="text-gray-500 text-center">Carregando cardápio...</p>
      </div>
    );
  }

  const currentItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    // MUDANÇA 1: overflow-hidden no pai para não rolar a caixa inteira
    <div className="flex h-[600px] w-full flex-col rounded-xl border border-black bg-white overflow-hidden shadow-lg">
      {/* MUDANÇA 2: Área do Cabeçalho e Abas é fixa (shrink-0) */}
      <div className="flex flex-col bg-white pt-5 px-5 shrink-0 z-10 border-b border-gray-100">
        <h2 className="mb-4 text-xl font-semibold lg:text-2xl">Cardápio</h2>

        {categories.length > 0 && (
          // MUDANÇA 3: Estilos para esconder a scrollbar horizontal feia
          <nav
            className="flex w-full overflow-x-auto pb-0 gap-2 no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                // Design de abas mais limpo (estilo "Pill")
                className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-t-lg transition-all border-b-2 
                  ${
                    activeCategory === cat
                      ? "border-amber-600 text-amber-600 bg-amber-50"
                      : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                  }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* MUDANÇA 4: Apenas esta div rola (overflow-y-auto) */}
      <div className="flex-1 overflow-y-auto p-5 bg-gray-50/50">
        <div className="flex flex-col gap-3">
          {currentItems.map((item) => (
            <article
              key={item.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="mb-1 text-base font-bold text-gray-900">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
              {/* Se tiver preço no futuro, pode adicionar aqui */}
              {item.price && (
                <span className="mt-2 block text-sm font-semibold text-green-700">
                  R$ {item.price.toFixed(2)}
                </span>
              )}
            </article>
          ))}

          {/* Espaço extra no final para não cortar o último item */}
          <div className="h-4"></div>
        </div>
      </div>

      {/* Estilo Global CSS para esconder scrollbar (opcional se usar o style inline acima) */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
