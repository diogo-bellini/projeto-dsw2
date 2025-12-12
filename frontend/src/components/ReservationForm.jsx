import { useState } from "react";

export default function ReservationForm({ storeId }) {
  const [formData, setFormData] = useState({ date: "", time: "", people: "" });
  const [isSubmitting, setIsSubmitting] = useState(false); // Para feedback visual

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storeId) {
      alert("Erro: ID da loja não identificado.");
      return;
    }

    setIsSubmitting(true);

    const newReservation = {
      storeId: Number(storeId),
      date: formData.date,
      time: formData.time,
      people: Number(formData.people),
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReservation),
      });

      if (response.ok) {
        alert("Reserva realizada com sucesso!");
        setFormData({ date: "", time: "", people: "" });
      } else {
        alert("Ocorreu um erro ao realizar a reserva.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de conexão com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl border border-black p-5 bg-white"
    >
      <h2 className="mb-4 text-base font-semibold lg:text-lg">
        Faça sua Reserva
      </h2>

      <label htmlFor="date" className="mb-1 block text-sm font-medium">
        Data da Reserva
      </label>
      <div className="mb-4 flex items-center gap-2 rounded bg-gray-200 px-3 py-2">
        <svg className="h-4 w-4" viewBox="0 0 16 17" fill="black">
          <path d="M3.5 0.5C3.63261 0.5 3.75979 0.552678 3.85355 0.646447C3.94732 0.740215 4 0.867392 4 1V1.5H12V1C12 0.867392 12.0527 0.740215 12.1464 0.646447C12.2402 0.552678 12.3674 0.5 12.5 0.5C12.6326 0.5 12.7598 0.552678 12.8536 0.646447C12.9473 0.740215 13 0.867392 13 1V1.5H14C14.5304 1.5 15.0391 1.71071 15.4142 2.08579C15.7893 2.46086 16 2.96957 16 3.5V14.5C16 15.0304 15.7893 15.5391 15.4142 15.9142C15.0391 16.2893 14.5304 16.5 14 16.5H2C1.46957 16.5 0.960859 16.2893 0.585786 15.9142C0.210714 15.5391 0 15.0304 0 14.5V3.5C0 2.96957 0.210714 2.46086 0.585786 2.08579C0.960859 1.71071 1.46957 1.5 2 1.5H3V1C3 0.867392 3.05268 0.740215 3.14645 0.646447C3.24021 0.552678 3.36739 0.5 3.5 0.5Z" />
        </svg>
        <input
          id="date"
          type="date"
          required
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      {/* --- HORÁRIO --- */}
      <label htmlFor="time" className="mb-1 block text-sm font-medium">
        Horário
      </label>
      <div className="mb-4 flex items-center gap-2 rounded bg-gray-200 px-3 py-2">
        <svg
          className="h-4 w-4 text-black"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <input
          id="time"
          type="time"
          required
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      {/* --- PESSOAS --- */}
      <label htmlFor="people" className="mb-1 block text-sm font-medium">
        Número de Pessoas
      </label>
      <div className="mb-4 flex items-center gap-2 rounded bg-gray-200 px-3 py-2">
        <svg className="h-4 w-4" viewBox="0 0 16 17" fill="black">
          <path d="M15 14.5C15 14.5 16 14.5 16 13.5C16 12.5 15 9.5 11 9.5C7 9.5 6 12.5 6 13.5C6 14.5 7 14.5 7 14.5H15Z" />
        </svg>
        <input
          id="people"
          type="number"
          placeholder="2 pessoas"
          min="1"
          required
          value={formData.people}
          onChange={(e) => setFormData({ ...formData, people: e.target.value })}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full rounded-lg py-2 text-sm font-medium text-white transition-colors
          ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#C9A227] hover:bg-[#a68620]"
          }
        `}
      >
        {isSubmitting ? "Reservando..." : "Reservar"}
      </button>
      <p className="mt-2 text-center text-xs text-gray-600">
        Confirmação instantânea • Cancelamento grátis até 2h antes
      </p>
    </form>
  );
}
