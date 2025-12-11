import { useEffect, useState } from "react";
import { baseUrl } from "../const";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RestaurantCarousel from "../components/RestaurantCarousel";
import BannerGeral from "../components/BannerGeneral";

export default function Home() {
  const [stores, setStores] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${baseUrl}/stores`);
      const data = await response.json();
      setStores(data);
      console.log(data);

      const response2 = await fetch(`${baseUrl}/banners`);
      const data2 = await response2.json();
      setBanners(data2);
      console.log(data2);
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-white hide-scrollbar">
      <Header />
      <main className="pb-20 md:pb-10 md:pt-35 xl:pt-40">
        <RestaurantCarousel restaurants={stores} name={"Sugeridos"} />
        <BannerGeral banners={banners} />
        <RestaurantCarousel restaurants={stores} name={"Promoções da Semana"} />
        <BannerGeral banners={banners} />
        <RestaurantCarousel restaurants={stores} name={"Outros"} />
      </main>
      <Footer />
    </div>
  );
}
