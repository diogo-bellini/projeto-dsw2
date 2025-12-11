export default function Footer() {
  const navItems = [
    { href: "http://localhost:5173/home", icon: "/assets/icons/home.svg", label: "Início" },
    { href: "#", icon: "/assets/icons/lupa.svg", label: "Pesquisa" },
    { href: "#", icon: "/assets/icons/reservas.svg", label: "Reservas" },
    { href: "#", icon: "/assets/icons/user.svg", label: "Perfil" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-20 border-t border-black bg-white md:hidden z-50">
      <nav className="flex h-20 items-center justify-evenly">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-1"
          >
            <img className="h-6 w-6" src={item.icon} alt="" />
            <span className="text-xs">{item.label}</span>
          </a>
        ))}
      </nav>
    </footer>
  );
}
