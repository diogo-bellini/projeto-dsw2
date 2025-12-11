export function Logo({ className }) {
  return (
    <img
      src="./assets/icons/upeek_logoGrande.svg"
      alt="Upeek Logo"
      className={`w-40 md:w-auto ${className || ""}`}
    />
  );
}
