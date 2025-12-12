import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarioLogado, logout } from "../utils/auth";

export default function Header() {
  const [localizacao, setLocalizacao] = useState("Minha localização");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  async function reverseGeocode(latitude, longitude) {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
      console.log("Chamando API do Nominatim:", url);

      const response = await fetch(url);
      const dados = await response.json();
      console.log("Dados recebidos da API:", dados);

      if (dados && dados.address) {
        const cidade =
          dados.address.city || dados.address.town || dados.address.village;
        const estado = dados.address.state;

        const local = `${cidade}, ${estado}`;
        console.log(`Localização definida para: ${local}`);
        return local;
      } else {
        console.warn("API não retornou um endereço válido.");
        return "Endereço não encontrado.";
      }
    } catch (error) {
      console.error(
        "Ocorreu um erro ao chamar a API ou processar os dados:",
        error
      );
      return "Endereço indisponível.";
    }
  }

  async function success(position) {
    console.log("Coordenadas obtidas com sucesso:", position.coords);
    const localResult = await reverseGeocode(
      position.coords.latitude,
      position.coords.longitude
    );
    setLocalizacao(localResult);
  }

  function mostrarErro(error) {
    console.error("Erro ao obter geolocalização:", error);
    if (error.code === 1) setLocalizacao("Permissão negada");
    else if (error.code === 2) setLocalizacao("Sinal indisponível");
    else if (error.code === 3) setLocalizacao("Tempo esgotado"); // Timeout
    else setLocalizacao("Erro ao obter local");
  }

  function getLocation() {
    if (navigator.geolocation) {
      setLocalizacao("Obtendo localização...");

      // Adicione estas opções para corrigir o travamento
      const options = {
        enableHighAccuracy: true,
        timeout: 10000, // Desiste após 10 segundos (evita o loop infinito)
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(success, mostrarErro, options);
    } else {
      setLocalizacao("Geolocalização não é suportada.");
    }
  }

  useEffect(() => {
    console.log(
      "Componente Header montado. Iniciando busca por localização..."
    );
    getLocation();

    // Verificar se há usuário logado
    const usuarioLogado = getUsuarioLogado();
    setUsuario(usuarioLogado);
  }, []);

  // Buscar restaurantes quando o usuário digitar
  useEffect(() => {
    const searchRestaurants = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/stores?name_like=${searchQuery}`
        );
        const data = await response.json();
        setSearchResults(data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Erro ao buscar restaurantes:", error);
        setSearchResults([]);
      }
    };

    const timeoutId = setTimeout(searchRestaurants, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Fechar sugestões quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectRestaurant = (restaurantId) => {
    setShowSuggestions(false);
    setSearchQuery("");
    navigate(`/restaurant/${restaurantId}`);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-center relative h-20 md:fixed md:top-0 md:left-0 md:right-0 md:bg-[#4C0000] md:justify-between md:px-6 md:gap-x-4 md:h-25 xl:h-30 z-50">
      <a href="/">
        <img
          src="/assets/icons/upeek_logo.svg"
          alt="logo"
          className="hidden md:block"
        />
      </a>

      <div className="hidden md:block grow max-w-3/5" ref={searchRef}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img src="/assets/icons/lupa.svg" alt="busca" />
          </div>
          <input
            type="text"
            placeholder="Busque por um restaurante"
            className="w-full bg-[#EEEEEE] rounded-lg py-2 pl-10 pr-4 border-none placeholder:truncate"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
          />

          {showSuggestions && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
              {searchResults.map((restaurant) => (
                <button
                  key={restaurant.id}
                  onClick={() => handleSelectRestaurant(restaurant.id)}
                  className="w-full px-4 py-3 hover:bg-gray-100 text-left flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                >
                  <img
                    src={restaurant.logo}
                    alt={restaurant.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {restaurant.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {restaurant.category} • {restaurant.address}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {showSuggestions && searchQuery.length >= 2 && searchResults.length === 0 && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-3 z-50">
              <p className="text-gray-500 text-sm">
                Nenhum restaurante encontrado
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between space-x-5 lg:space-x-10 xl:space-x-20 2xl:space-x-30">
        <h1 className="md:text-white">{localizacao}</h1>
        <div className="hidden md:flex justify-between items-center space-x-4">
          {usuario ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-white text-sm">
                  Olá, {usuario.nomeCompleto.split(" ")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-300 text-sm underline"
                >
                  Sair
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={handleLoginClick}
              className="hidden md:flex flex-col justify-center items-center group"
              title="Fazer login"
            >
              <svg
                className="text-white group-hover:text-gray-300 transition-colors"
                width={18}
                height={18}
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 9C10.1935 9 11.3381 8.52589 12.182 7.68198C13.0259 6.83807 13.5 5.69347 13.5 4.5C13.5 3.30653 13.0259 2.16193 12.182 1.31802C11.3381 0.474106 10.1935 0 9 0C7.80653 0 6.66193 0.474106 5.81802 1.31802C4.97411 2.16193 4.5 3.30653 4.5 4.5C4.5 5.69347 4.97411 6.83807 5.81802 7.68198C6.66193 8.52589 7.80653 9 9 9ZM12 4.5C12 5.29565 11.6839 6.05871 11.1213 6.62132C10.5587 7.18393 9.79565 7.5 9 7.5C8.20435 7.5 7.44129 7.18393 6.87868 6.62132C6.31607 6.05871 6 5.29565 6 4.5C6 3.70435 6.31607 2.94129 6.87868 2.37868C7.44129 1.81607 8.20435 1.5 9 1.5C9.79565 1.5 10.5587 1.81607 11.1213 2.37868C11.6839 2.94129 12 3.70435 12 4.5ZM18 16.5C18 18 16.5 18 16.5 18H1.5C1.5 18 0 18 0 16.5C0 15 1.5 10.5 9 10.5C16.5 10.5 18 15 18 16.5ZM16.5 16.494C16.4985 16.125 16.269 15.015 15.252 13.998C14.274 13.02 12.4335 12 9 12C5.565 12 3.726 13.02 2.748 13.998C1.731 15.015 1.503 16.125 1.5 16.494H16.5Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          )}
          <a
            href="#"
            className="hidden md:flex flex-col justify-center items-center"
          >
            <svg
              className="text-white"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.875 13.125C6.875 12.9592 6.94085 12.8003 7.05806 12.6831C7.17527 12.5658 7.33424 12.5 7.5 12.5H12.5C12.6658 12.5 12.8247 12.5658 12.9419 12.6831C13.0592 12.8003 13.125 12.9592 13.125 13.125C13.125 13.2908 13.0592 13.4497 12.9419 13.5669C12.8247 13.6842 12.6658 13.75 12.5 13.75H7.5C7.33424 13.75 7.17527 13.6842 7.05806 13.5669C6.94085 13.4497 6.875 13.2908 6.875 13.125Z"
                fill="currentColor"
              />
              <path
                d="M4.375 0C4.54076 0 4.69973 0.065848 4.81694 0.183058C4.93415 0.300269 5 0.45924 5 0.625V1.25H15V0.625C15 0.45924 15.0658 0.300269 15.1831 0.183058C15.3003 0.065848 15.4592 0 15.625 0C15.7908 0 15.9497 0.065848 16.0669 0.183058C16.1842 0.300269 16.25 0.45924 16.25 0.625V1.25H17.5C18.163 1.25 18.7989 1.51339 19.2678 1.98223C19.7366 2.45107 20 3.08696 20 3.75V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V3.75C0 3.08696 0.263392 2.45107 0.732233 1.98223C1.20107 1.51339 1.83696 1.25 2.5 1.25H3.75V0.625C3.75 0.45924 3.81585 0.300269 3.93306 0.183058C4.05027 0.065848 4.20924 0 4.375 0V0ZM2.5 2.5C2.16848 2.5 1.85054 2.6317 1.61612 2.86612C1.3817 3.10054 1.25 3.41848 1.25 3.75V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V3.75C18.75 3.41848 18.6183 3.10054 18.3839 2.86612C18.1495 2.6317 17.8315 2.5 17.5 2.5H2.5Z"
                fill="currentColor"
              />
              <path
                d="M3.125 5C3.125 4.83424 3.19085 4.67527 3.30806 4.55806C3.42527 4.44085 3.58424 4.375 3.75 4.375H16.25C16.4158 4.375 16.5747 4.44085 16.6919 4.55806C16.8092 4.67527 16.875 4.83424 16.875 5V6.25C16.875 6.41576 16.8092 6.57473 16.6919 6.69194C16.5747 6.80915 16.4158 6.875 16.25 6.875H3.75C3.58424 6.875 3.42527 6.80915 3.30806 6.69194C3.19085 6.57473 3.125 6.41576 3.125 6.25V5Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href="#"
            className="hidden md:flex flex-col justify-center items-center"
          >
            <svg
              className="text-white"
              width={22}
              height={24}
              viewBox="0 0 22 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 24.0001C11.7956 24.0001 12.5587 23.684 13.1213 23.1214C13.6839 22.5588 14 21.7957 14 21.0001H8C8 21.7957 8.31607 22.5588 8.87868 23.1214C9.44129 23.684 10.2044 24.0001 11 24.0001ZM11 2.87709L9.8045 3.11859C8.44844 3.39489 7.2295 4.13125 6.35398 5.20302C5.47846 6.2748 5.00015 7.61617 5 9.00009C5 9.94209 4.799 12.2956 4.3115 14.6131C4.0715 15.7636 3.7475 16.9621 3.317 18.0001H18.683C18.2525 16.9621 17.93 15.7651 17.6885 14.6131C17.201 12.2956 17 9.94209 17 9.00009C16.9995 7.61643 16.521 6.27541 15.6455 5.20394C14.7701 4.13247 13.5513 3.39634 12.1955 3.12009L11 2.87559V2.87709ZM20.33 18.0001C20.6645 18.6706 21.0515 19.2016 21.5 19.5001H0.5C0.9485 19.2016 1.3355 18.6706 1.67 18.0001C3.02 15.3001 3.5 10.3201 3.5 9.00009C3.5 5.37009 6.08 2.34009 9.5075 1.64859C9.48656 1.44002 9.50958 1.22938 9.57505 1.03025C9.64052 0.831122 9.74701 0.647926 9.88763 0.492479C10.0283 0.337031 10.1999 0.212784 10.3915 0.127749C10.5831 0.0427135 10.7904 -0.0012207 11 -0.0012207C11.2096 -0.0012207 11.4169 0.0427135 11.6085 0.127749C11.8001 0.212784 11.9717 0.337031 12.1124 0.492479C12.253 0.647926 12.3595 0.831122 12.4249 1.03025C12.4904 1.22938 12.5134 1.44002 12.4925 1.64859C14.1879 1.99344 15.7121 2.91363 16.8069 4.25334C17.9016 5.59305 18.4998 7.26995 18.5 9.00009C18.5 10.3201 18.98 15.3001 20.33 18.0001Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
      <button
        type="button"
        id="notificacao"
        className="absolute right-0 cursor-pointer p-7 md:hidden"
      >
        <svg
          width={22}
          height={24}
          viewBox="0 0 22 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 24.0001C11.7956 24.0001 12.5587 23.684 13.1213 23.1214C13.6839 22.5588 14 21.7957 14 21.0001H8C8 21.7957 8.31607 22.5588 8.87868 23.1214C9.44129 23.684 10.2044 24.0001 11 24.0001ZM11 2.87709L9.8045 3.11859C8.44844 3.39489 7.2295 4.13125 6.35398 5.20302C5.47846 6.2748 5.00015 7.61617 5 9.00009C5 9.94209 4.799 12.2956 4.3115 14.6131C4.0715 15.7636 3.7475 16.9621 3.317 18.0001H18.683C18.2525 16.9621 17.93 15.7651 17.6885 14.6131C17.201 12.2956 17 9.94209 17 9.00009C16.9995 7.61643 16.521 6.27541 15.6455 5.20394C14.7701 4.13247 13.5513 3.39634 12.1955 3.12009L11 2.87559V2.87709ZM20.33 18.0001C20.6645 18.6706 21.0515 19.2016 21.5 19.5001H0.5C0.9485 19.2016 1.3355 18.6706 1.67 18.0001C3.02 15.3001 3.5 10.3201 3.5 9.00009C3.5 5.37009 6.08 2.34009 9.5075 1.64859C9.48656 1.44002 9.50958 1.22938 9.57505 1.03025C9.64052 0.831122 9.74701 0.647926 9.88763 0.492479C10.0283 0.337031 10.1999 0.212784 10.3915 0.127749C10.5831 0.0427135 10.7904 -0.0012207 11 -0.0012207C11.2096 -0.0012207 11.4169 0.0427135 11.6085 0.127749C11.8001 0.212784 11.9717 0.337031 12.1124 0.492479C12.253 0.647926 12.3595 0.831122 12.4249 1.03025C12.4904 1.22938 12.5134 1.44002 12.4925 1.64859C14.1879 1.99344 15.7121 2.91363 16.8069 4.25334C17.9016 5.59305 18.4998 7.26995 18.5 9.00009C18.5 10.3201 18.98 15.3001 20.33 18.0001Z"
            fill="black"
          />
        </svg>
      </button>
    </header>
  );
}
