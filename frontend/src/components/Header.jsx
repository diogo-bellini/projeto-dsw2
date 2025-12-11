export default function Header() {
  return (
    <header className="hidden z-50 md:flex items-center justify-between fixed top-0 left-0 right-0 bg-[#4C0000] px-6 h-20 xl:h-24">
      <a href="./home.html">
        <img
          src="/assets/icons/upeek_logo.svg"
          alt="logo"
          className="hidden md:block"
        />
      </a>

      <div className="hidden md:block grow max-w-[60%]">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img src="/assets/icons/lupa.svg" alt="busca" />
          </div>
          <input
            type="text"
            placeholder="Busque por um restaurante"
            className="w-full bg-gray-200 rounded-lg py-2 pl-10 pr-4"
          />
        </div>
      </div>

      <div className="flex items-center space-x-5">
        <span className="text-white">Minha localização</span>
      </div>
    </header>
  );
}
