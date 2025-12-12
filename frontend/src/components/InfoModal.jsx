export default function InfoModal({ isOpen, onClose, store }) {
  if (!isOpen || !store) return null;

  const schedule = store.schedule || [];

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-fadeIn">
      <div className="relative h-48 md:h-64 w-full">
        <img
          src={store.banner || "/assets/images/imagem3.webp"}
          alt="Capa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />

        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-colors"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div className="relative px-6 -mt-16 mb-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex flex-col gap-2 text-center items-center relative z-10">
          <div className="-mt-12 w-20 h-20 rounded-full border-4 border-white bg-white overflow-hidden shadow-sm">
            <img
              src={store.logo || "/assets/images/japones.webp"}
              alt={store.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-lg font-bold text-gray-900 mt-1">{store.name}</h2>
          <p className="text-xs text-gray-500">
            1,2 km • {store.category || "Restaurante"}
          </p>

          <hr className="w-full border-gray-100 my-1" />

          <div className="flex flex-col gap-1 w-full text-left px-2">
            <div className="flex items-center gap-1">
              <span className="text-amber-500 font-bold">★ {store.rating}</span>
              <span className="text-gray-400 text-xs">
                ({store.reviews} avaliações)
              </span>
            </div>
            <p className="text-sm text-gray-800">
              <span className="font-semibold">Média</span> de R${" "}
              {store.avgPrice
                ? store.avgPrice.toFixed(2).replace(".", ",")
                : "--"}{" "}
              /pessoa
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-10 space-y-8 bg-white rounded-t-3xl -mt-4 pt-6">
        <h3 className="text-2xl font-bold text-[#C9A227]">Informações</h3>

        <section>
          <h4 className="text-lg font-bold text-black mb-2">
            Descrição do Restaurante
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Descubra um oásis de sabores no {store.namepiece || store.name},
            onde a arte e a paixão pela culinária se encontram. Neste ambiente
            aconchegante e convidativo, oferecemos uma experiência gastronômica
            única.
          </p>
        </section>

        <section>
          <h4 className="text-lg font-bold text-black mb-3">Aberto agora</h4>
          <div className="space-y-3">
            {schedule.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="font-semibold w-24">{item.day}</span>
                <span className="text-gray-600 flex-1">{item.hours}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h4 className="text-lg font-bold text-black mb-3">
            Formas de pagamento
          </h4>
          <div className="flex gap-3">
            <div className="w-10 h-6 bg-green-100 rounded border border-green-300 flex items-center justify-center text-[10px] font-bold text-green-800">
              $$$
            </div>
            <div className="w-10 h-6 bg-blue-100 rounded border border-blue-300 flex items-center justify-center text-[10px] font-bold text-blue-800">
              Visa
            </div>
            <div className="w-10 h-6 bg-red-100 rounded border border-red-300 flex items-center justify-center text-[10px] font-bold text-red-800">
              Master
            </div>
            <div className="w-10 h-6 bg-gray-100 rounded border border-gray-300 flex items-center justify-center text-[10px] font-bold text-gray-800">
              Pix
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
