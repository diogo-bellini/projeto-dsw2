const schedule = [
  { day: "Segunda-feira", hours: "11h - 15h, 19h - 23h" },
  { day: "Terça-feira", hours: "11h - 15h, 19h - 23h" },
  { day: "Quarta-feira", hours: "11h - 15h, 19h - 23h" },
  { day: "Quinta-feira", hours: "11h - 15h, 19h - 23h" },
  { day: "Sexta-feira", hours: "11h - 15h, 19h - 23h" },
  { day: "Sábado", hours: "11h - 23h" },
  { day: "Domingo", hours: "11h - 22h" },
];

export default function Schedule() {
  return (
    <div className="w-full rounded-xl border border-black p-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold lg:text-2xl">
            Horário de Funcionamento
          </h2>
          <p className="text-xs text-green-600">Aberto agora</p>
        </div>

        <div className="flex flex-col gap-2">
          {schedule.map((item, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-between rounded bg-gray-200 p-3"
            >
              <p className="text-sm">{item.day}:</p>
              <p className="text-sm">{item.hours}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
