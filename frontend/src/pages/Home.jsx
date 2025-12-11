import { useEffect, useState } from "react";
import { baseUrl } from "../const";

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
        <div key={store.id}>
          <img src={store.logo} alt="" />
          <img src="/assets/images/imagem1.png" alt="" />
        </div>
      ))}
    </div>
  );
}

export default Home;
