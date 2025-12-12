import { useState, useEffect } from "react";

export default function TableMapModal({ isOpen, onClose, storeId }) {
  const [selectedTable, setSelectedTable] = useState(null);
  const [tables, setTables] = useState([]);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && storeId) {
      setLoading(true);

      fetch(`http://localhost:3000/stores/${storeId}`)
        .then((res) => res.json())
        .then((data) => setStore(data))
        .catch((err) => console.error("Erro ao carregar loja:", err));

      fetch(`http://localhost:3000/tables?storeId=${storeId}`)
        .then((res) => res.json())
        .then((data) => {
          setTables(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erro ao carregar mesas:", err);
          setLoading(false);
        });
    }
  }, [isOpen, storeId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto md:hidden">
      <header className="sticky top-0 bg-[#4C0000] text-white px-4 py-4 flex items-center gap-4">
        <button onClick={onClose} className="p-1">
          <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold">Mapa de Mesas</h1>
      </header>

      {loading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" />
        </div>
      ) : (
        <>
          <div className="px-4 py-6">
            <div className="relative w-full bg-gray-100 rounded-lg p-4">
              <img
                src={store?.tableMapImage || "/assets/images/mapa.webp"}
                alt="Mapa de Mesas do Restaurante"
                className="w-full h-auto object-contain"
              />

              {tables.find((t) => t.number === 5) && (
                <button
                  onClick={() =>
                    setSelectedTable(tables.find((t) => t.number === 5))
                  }
                  className={`absolute bottom-[15%] left-[25%] w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                    selectedTable?.number === 5
                      ? "bg-amber-500 text-white scale-110"
                      : "bg-white/80 text-gray-800 hover:bg-amber-200"
                  }`}
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  5
                </button>
              )}

              {tables.find((t) => t.number === 6) && (
                <button
                  onClick={() =>
                    setSelectedTable(tables.find((t) => t.number === 6))
                  }
                  className={`absolute bottom-[15%] left-[50%] w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                    selectedTable?.number === 6
                      ? "bg-amber-500 text-white scale-110"
                      : "bg-white/80 text-gray-800 hover:bg-amber-200"
                  }`}
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  6
                </button>
              )}

              {tables.find((t) => t.number === 7) && (
                <button
                  onClick={() =>
                    setSelectedTable(tables.find((t) => t.number === 7))
                  }
                  className={`absolute bottom-[15%] left-[75%] w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                    selectedTable?.number === 7
                      ? "bg-amber-500 text-white scale-110"
                      : "bg-white/80 text-gray-800 hover:bg-amber-200"
                  }`}
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  7
                </button>
              )}
            </div>

            {selectedTable && (
              <div className="mt-6 bg-white rounded-lg border-2 border-black p-6">
                <h2 className="text-xl font-bold mb-4">Descrição da mesa</h2>

                <h3 className="text-lg font-semibold mb-2">
                  Mesa {selectedTable.number}:
                </h3>

                <p className="text-gray-700 mb-6">
                  {selectedTable.description}
                </p>

                <h3 className="text-lg font-semibold mb-2">
                  Frequência de reserva:
                </h3>

                <p className="text-gray-700">
                  {selectedTable.reservationFrequency}
                </p>
              </div>
            )}

            {!selectedTable && (
              <div className="mt-6 bg-gray-50 rounded-lg border-2 border-gray-300 p-6 text-center">
                <p className="text-gray-600">
                  Toque em uma mesa para ver mais informações
                </p>
              </div>
            )}
          </div>
        </>
      )}

      <footer className="fixed bottom-0 left-0 right-0 h-20 border-t border-black bg-white">
        <nav className="flex h-20 items-center justify-evenly">
          <a href="/" className="flex flex-col items-center gap-1">
            <img className="h-6 w-6" src="/assets/icons/home.svg" alt="" />
            <span className="text-xs">Início</span>
          </a>
          <a href="/" className="flex flex-col items-center gap-1">
            <img className="h-6 w-6" src="/assets/icons/lupa.svg" alt="" />
            <span className="text-xs">Pesquisa</span>
          </a>
          <a
            href="/"
            className="flex flex-col items-center gap-1 text-amber-600"
          >
            <img className="h-6 w-6" src="/assets/icons/reservas.svg" alt="" />
            <span className="text-xs font-semibold">Reservas</span>
          </a>
          <a href="/" className="flex flex-col items-center gap-1">
            <img className="h-6 w-6" src="/assets/icons/user.svg" alt="" />
            <span className="text-xs">Usuário</span>
          </a>
        </nav>
      </footer>
    </div>
  );
}
