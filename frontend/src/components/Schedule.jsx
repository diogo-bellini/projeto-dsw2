export default function Schedule({ schedule }) {
  const workingHours = schedule || [];

  return (
    <div className="w-full rounded-xl border border-black p-5 bg-white">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold lg:text-2xl">
            Horário de Funcionamento
          </h2>
          <p className="text-xs text-green-600">
            {workingHours.length > 0
              ? "Consulte os horários abaixo"
              : "Horário indisponível"}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {workingHours.length > 0 ? (
            workingHours.map((item, index) => (
              <div
                key={index}
                className="flex w-full items-center justify-between rounded bg-gray-200 p-3"
              >
                <p className="text-sm font-medium">{item.day}:</p>
                <p className="text-sm">{item.hours}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              Informações não cadastradas.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
