import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { AuthLayout } from "../layouts/AuthLayout";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert("Por favor, preencha o email e a senha.");
      return;
    }

    const usuariosStr = localStorage.getItem("usuarios");
    const usuarios = usuariosStr ? JSON.parse(usuariosStr) : [];

    const usuarioLogado = usuarios.find(
      (user) => user.email === email && user.senha === senha
    );

    if (usuarioLogado) {
      sessionStorage.setItem("usuarioLogado", usuarioLogado.email);
      const primeiroNome = usuarioLogado.nomeCompleto.split(" ")[0];

      alert(`Bem-vindo, ${primeiroNome}! Login efetuado.`);

      navigate("/home");
    } else {
      alert("E-mail ou senha inválidos. Verifique suas credenciais.");
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-6 justify-center items-center w-full"
      >
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <Button type="submit" className="mx-auto">
          Entrar
        </Button>
      </form>

      <div className="flex flex-col gap-1 justify-center items-center text-center mt-4">
        <a href="#" className="text-white hover:underline text-sm">
          Esqueci minha senha.
        </a>

        {/* 4. Link correto para a rota de Registro */}
        <Link to="/register" className="text-white hover:underline text-sm">
          Não tem conta? Registre-se aqui.
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
