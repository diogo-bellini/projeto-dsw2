export default function RestaurantCard({ store }) {
  const formatPrice = (price) => {
    if (!price) return "--,--";
    return price.toFixed(2).replace(".", ",");
  };

  return (
    <article className="relative z-10 mt-28 w-full max-w-sm rounded-xl border-2 border-black bg-white sm:max-w-md md:mt-44 md:max-w-[600px] lg:mt-48 lg:max-w-[700px] xl:max-w-[800px]">
      {/* Avatar */}
      <div className="absolute inset-x-0 -top-6 mx-auto h-12 w-12 rounded-full bg-amber-200 sm:-top-8 sm:h-16 sm:w-16 md:-top-16 md:h-32 md:w-32 lg:-top-24 lg:h-48 lg:w-48 overflow-hidden border-4 border-white">
        <img
          className="h-full w-full object-cover"
          src={store?.logo || "/assets/images/japones.webp"}
          alt={store?.name || "Logo do restaurante"}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 px-3 pt-8 pb-3 sm:px-4 sm:pt-10 md:px-6 md:pt-20 lg:px-8 lg:pt-28 lg:pb-6">
        <h1 className="text-xs font-semibold md:text-lg lg:text-2xl xl:text-4xl text-center md:text-left">
          {store?.name || "Carregando..."}
        </h1>

        <hr className="w-full border-gray-300 my-2" />

        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
          {/* Avaliação Dinâmica */}
          <div className="flex items-center gap-1">
            <svg className="h-3 w-3" viewBox="0 0 10 10" fill="#C9A227">
              <path d="M2.25739 9.6517C2.01614 9.77545 1.74239 9.55857 1.79114 9.2817L2.30989 6.32545L0.108016 4.22795C-0.0976092 4.0317 0.00926581 3.67295 0.284891 3.6342L3.34614 3.1992L4.71114 0.494824C4.83427 0.251074 5.16739 0.251074 5.29052 0.494824L6.65552 3.1992L9.71677 3.6342C9.99239 3.67295 10.0993 4.0317 9.89302 4.22795L7.69177 6.32545L8.21052 9.2817C8.25927 9.55857 7.98552 9.77545 7.74427 9.6517L4.99989 8.2417L2.25677 9.6517H2.25739Z" />
            </svg>
            <span className="text-xs text-amber-600 font-medium">
              {store?.rating || "0.0"} ({store?.reviews || 0} avaliações)
            </span>
          </div>

          {/* Telefone Dinâmico */}
          <span className="text-xs font-medium text-gray-700">
            {store?.phone || "(00) 0000-0000"}
          </span>
        </div>

        {/* Preço Dinâmico */}
        <p className="text-xs text-gray-600 mt-1">
          Média de R$ {formatPrice(store?.avgPrice)}/pessoa
        </p>

        {/* Endereço Dinâmico */}
        <p className="text-xs text-gray-500 mt-1">
          {store?.address || "Endereço não disponível"}
        </p>
      </div>
    </article>
  );
}
