import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { AuthLayout } from "../layouts/AuthLayout";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert("Por favor, preencha o email e a senha.");
      return;
    }

    try {
      // Buscar usuário pelo email e senha
      const response = await fetch(
        `http://localhost:3000/users?email=${email}&senha=${senha}`
      );
      const usuarios = await response.json();

      if (usuarios.length > 0) {
        const usuarioLogado = usuarios[0];

        // Salvar dados do usuário na sessão
        localStorage.setItem("usuarioLogado", JSON.stringify({
          id: usuarioLogado.id,
          email: usuarioLogado.email,
          nomeCompleto: usuarioLogado.nomeCompleto,
        }));

        navigate("/");
      } else {
        alert("E-mail ou senha inválidos. Verifique suas credenciais.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao conectar com o servidor. Verifique se o json-server está rodando.");
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
