import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RestaurantCard from "../components/RestaurantCard";
import Menu from "../components/Menu";
import ReservationForm from "../components/ReservationForm";
import Schedule from "../components/Schedule";
import TableMap from "../components/TableMap";
import TableMapModal from "../components/TableMapModal";
import MenuModal from "../components/MenuModal";
import InfoModal from "../components/InfoModal";

export default function Restaurant() {
  const { id } = useParams();

  const [store, setStore] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isTableMapModalOpen, setIsTableMapModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    Promise.all([
      fetch(`http://localhost:3000/stores/${id}`).then((res) =>
        res.ok ? res.json() : Promise.reject("Erro ao carregar loja")
      ),
      fetch(`http://localhost:3000/menuItems?storeId=${id}`).then((res) =>
        res.ok ? res.json() : Promise.reject("Erro ao carregar cardápio")
      ),
    ])
      .then(([storeData, menuData]) => {
        setStore(storeData);
        setMenuItems(menuData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsInfoModalOpen(false);
        setIsMenuModalOpen(false);
        setIsTableMapModalOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (
      !mapRef.current ||
      mapInstanceRef.current ||
      !window.L ||
      isTableMapModalOpen ||
      isMenuModalOpen ||
      isInfoModalOpen ||
      loading
    )
      return;

    const map = window.L.map(mapRef.current).setView([-22.0176, -47.8909], 15);
    mapInstanceRef.current = map;

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
      maxZoom: 19,
    }).addTo(map);

    window.L.marker([-22.0176, -47.8909]).addTo(map);

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, [loading, isTableMapModalOpen, isMenuModalOpen, isInfoModalOpen]);

  useEffect(() => {
    if (
      (isTableMapModalOpen || isMenuModalOpen || isInfoModalOpen) &&
      mapInstanceRef.current
    ) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
  }, [isTableMapModalOpen, isMenuModalOpen, isInfoModalOpen]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Erro: {error.toString()}</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="relative flex flex-col items-center px-6 pb-32 md:px-8 md:pb-20 lg:px-12 md:mt-32 lg:mt-40">
        <div className="absolute inset-x-0 top-0 mx-auto h-36 w-full md:h-64 md:px-20 lg:px-32 xl:px-44 2xl:px-56">
          <img
            src={store?.banner || "/assets/images/imagem3.webp"}
            alt="Ambiente"
            className="h-full w-full object-cover blur-[1.3px] sm:blur-none md:rounded-lg"
          />
        </div>

        <RestaurantCard store={store} />

        <section className="mt-10 flex w-full max-w-sm flex-col gap-4 md:hidden">
          <button
            onClick={() => setIsInfoModalOpen(true)}
            className="flex w-full items-center justify-between rounded-xl border-2 border-black px-4 py-3 hover:bg-gray-50"
          >
            <span className="text-sm font-medium">
              Horários de Funcionamento
            </span>
            <svg className="h-6 w-6" viewBox="0 0 31 30" fill="#020202">
              <path
                fillRule="evenodd"
                d="M12.9167 21.25L19.375 15L12.9167 8.75V21.25Z"
              />
            </svg>
          </button>

          <button
            onClick={() => setIsTableMapModalOpen(true)}
            className="flex w-full items-center justify-between rounded-xl border-2 border-black px-4 py-3 hover:bg-gray-50"
          >
            <span className="text-sm font-medium">Mapa de Mesas</span>
            <svg className="h-6 w-6" viewBox="0 0 31 30" fill="#020202">
              <path
                fillRule="evenodd"
                d="M12.9167 21.25L19.375 15L12.9167 8.75V21.25Z"
              />
            </svg>
          </button>

          <button
            onClick={() => setIsMenuModalOpen(true)}
            className="flex w-full items-center justify-between rounded-xl border-2 border-black px-4 py-3 hover:bg-gray-50"
          >
            <span className="text-sm font-medium">Cardápio</span>
            <svg className="h-6 w-6" viewBox="0 0 31 30" fill="#020202">
              <path
                fillRule="evenodd"
                d="M12.9167 21.25L19.375 15L12.9167 8.75V21.25Z"
              />
            </svg>
          </button>

          {!isTableMapModalOpen && !isMenuModalOpen && !isInfoModalOpen && (
            <div className="mt-6 flex w-full flex-col z-0">
              <h2 className="mb-2 text-sm font-semibold">Localização</h2>
              <div
                ref={mapRef}
                className="w-full h-36 rounded-lg border-2 border-black"
              />
            </div>
          )}

          <button className="w-full rounded-lg bg-[#C9A227] py-3 text-base font-medium text-white hover:bg-[#a68620]">
            Ir Para a Reserva
          </button>
        </section>

        <section className="mb-20 mt-10 hidden w-full max-w-7xl items-start justify-center gap-5 md:flex lg:gap-8">
          <div className="flex flex-1 flex-col gap-5 max-w-3xl">
            <TableMap />
            <Menu menuItems={menuItems} />
          </div>

          <aside className="flex w-full max-w-xs flex-col gap-5 lg:max-w-sm">
            <ReservationForm storeId={id} />
            <Schedule schedule={store?.schedule} />
          </aside>
        </section>
      </main>

      <Footer />

      <TableMapModal
        isOpen={isTableMapModalOpen}
        onClose={() => setIsTableMapModalOpen(false)}
        storeId={id ? Number(id) : null}
      />

      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        menuItems={menuItems}
      />

      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        store={store}
      />
    </div>
  );
}
