import { Logo } from "../components/Logo";

export function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#4c0000] flex items-center justify-center">
      <main className="flex flex-col gap-8 w-full max-w-md px-6 md:px-0 justify-center items-center">
        {/* O Logo sempre aparece no topo de layouts de auth */}
        <Logo className="mx-auto" />

        {/* form de login ou registro */}
        {children}
      </main>
    </div>
  );
}
