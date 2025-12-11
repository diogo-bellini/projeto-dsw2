import { useState } from "react";

const menuData = {
  pratosQuentes: [
    {
      title: "Yakissoba Tradicional",
      description:
        "Macarrão oriental com legumes frescos e carne bovina ou frango",
    },
    {
      title: "Yakissoba de Camarão",
      description:
        "Macarrão oriental com legumes frescos e camarões selecionados",
    },
    {
      title: "Arroz Chop Suey",
      description: "Arroz frito com legumes variados e proteína à escolha",
    },
    {
      title: "Frango Xadrez",
      description:
        "Cubos de frango salteados com legumes, amendoim e molho agridoce",
    },
  ],
  sushis: [
    {
      title: "Sushi Salmão",
      description: "Fatia de salmão fresco sobre bolinho de arroz temperado",
    },
    {
      title: "Sushi Atum",
      description: "Fatia de atum fresco sobre bolinho de arroz temperado",
    },
    {
      title: "Sushi Camarão",
      description: "Camarão cozido sobre bolinho de arroz temperado",
    },
    {
      title: "California Roll",
      description: "Rolinho com kani, pepino, abacate e gergelim por fora",
    },
  ],
  temakis: [
    {
      title: "Temaki Salmão",
      description:
        "Cone de alga recheado com arroz, salmão fresco e cream cheese",
    },
    {
      title: "Hot Roll Filadélfia",
      description: "Rolinho empanado com salmão, cream cheese e cebolinha",
    },
    {
      title: "Temaki Skin",
      description:
        "Cone de alga com pele de salmão grelhada, arroz e cebolinha",
    },
    {
      title: "Temaki Especial",
      description:
        "Cone de alga com salmão, atum, kani, cream cheese e gergelim",
    },
  ],
};

const categories = [
  { key: "pratosQuentes", label: "Pratos quentes" },
  { key: "sushis", label: "Sushis" },
  { key: "temakis", label: "Temakis" },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("pratosQuentes");

  return (
    <div className="flex h-auto max-h-120 w-full flex-col overflow-y-auto rounded-xl border border-black p-5">
      <h2 className="mb-5 text-xl font-semibold lg:text-2xl">Cardápio</h2>

      {/* Tabs */}
      <nav className="mb-6 flex w-full">
        {categories.map((cat, index) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors
              ${index === 0 ? "rounded-l-lg" : ""} 
              ${
                index === categories.length - 1
                  ? "rounded-r-lg"
                  : "border-r border-gray-300"
              }
              ${
                activeCategory === cat.key
                  ? "bg-gray-200"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {/* Items */}
      <div className="flex flex-col gap-3">
        {menuData[activeCategory].map((item, index) => (
          <article
            key={index}
            className="rounded-lg border border-gray-300 p-4 hover:shadow-md transition-shadow"
          >
            <h3 className="mb-1 text-base font-semibold lg:text-lg">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
