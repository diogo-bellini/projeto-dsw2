export default function TableMap() {
  return (
    <div className="relative flex w-full items-center justify-start rounded-xl border border-black p-8 lg:p-16">
      <h2 className="absolute left-6 top-6 text-xl font-semibold lg:text-2xl">
        Mapa de Mesas
      </h2>
      <div className="flex h-full w-full items-center justify-center pt-8">
        <img
          className="max-h-full max-w-full object-contain"
          src="/assets/images/mapa.webp"
          alt="Mapa de Mesas do Restaurante"
        />
      </div>
    </div>
  );
}
