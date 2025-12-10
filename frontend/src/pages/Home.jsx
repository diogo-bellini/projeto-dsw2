import { useEffect, useState } from "react";
import { baseUrl } from "../const";
import imagem1 from "../assets/images/imagem1.png";

function Home() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${baseUrl}/stores`);
      const data = await response.json();
      setStores(data);
      console.log(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Ola tudo bem</h1>
      {stores.map((store) => (
        <div>
          <img key={store.id} src={store.logo} alt="" />
          <img key={store.id} src={imagem1} alt="" />
        </div>
      ))}
    </div>
  );
}

export default Home;
