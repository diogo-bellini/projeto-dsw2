import { useState, useEffect } from "react";

export default function MenuModal({ isOpen, onClose, storeId }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && storeId) {
      setLoading(true);

      // Buscar itens do cardápio
      fetch(`http://localhost:3000/menuItems?storeId=${storeId}`)
        .then(res => res.json())
        .then(data => {
          setMenuItems(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Erro ao carregar cardápio:", err);
          setLoading(false);
        });
    }
  }, [isOpen, storeId]);

  if (!isOpen) return null;

  // Agrupar itens por categoria
  const categories = ["Pratos Quentes", "Sushis", "Temakis"];

  return (
    <div className="fixed inset-0 z-50 bg-[#4C0000] overflow-y-auto md:hidden">
      {/* Header */}
      <header className="sticky top-0 bg-[#4C0000] text-white px-6 py-5 flex items-center gap-4 z-20">
        <button onClick={onClose} className="p-1">
          <svg className="w-7 h-7" fill="white" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Cardápio</h1>
      </header>

      {loading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" />
        </div>
      ) : (
        <div className="relative min-h-screen pb-24">
          {/* Background Image - Full screen */}
          <div
            className="fixed right-0 top-0 w-full h-full bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url(/assets/images/cardapio.png)" }}
          />

          {/* Content Container */}
          <div className="relative z-10 px-6 pt-6 space-y-6">
            {/* Render each category */}
            {categories.map((category) => {
              const items = menuItems.filter(item => item.category === category);
              if (items.length === 0) return null;

              return (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {category}
                  </h2>

                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="text-white">
                        <h3 className="font-bold text-lg leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-200 leading-snug">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
          <a href="#" className="flex flex-col items-center gap-1 text-amber-600">
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
