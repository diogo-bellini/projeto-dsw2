import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { AuthLayout } from "../layouts/AuthLayout";

const Register = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [termos, setTermos] = useState(false);

  const validarCPF = (cpfInput) => {
    const cpfLimpo = cpfInput.replace(/[^\d]+/g, "");

    if (cpfLimpo.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpfLimpo)) return false;

    const calcularDigito = (base, pesoInicial) => {
      let soma = 0;
      for (let i = 0; i < base.length; i++) {
        soma += base[i] * (pesoInicial - i);
      }
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const nums = cpfLimpo.split("").map(Number);
    const base1 = nums.slice(0, 9);
    const digito1Calculado = calcularDigito(base1, 10);

    if (digito1Calculado !== nums[9]) return false;

    const base2 = nums.slice(0, 10);
    const digito2Calculado = calcularDigito(base2, 11);

    if (digito2Calculado !== nums[10]) return false;

    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !nome ||
      !cpf ||
      !dataNascimento ||
      !email ||
      !senha ||
      !confirmarSenha
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!validarCPF(cpf)) {
      alert("O número de CPF informado é inválido. Por favor, verifique.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas digitadas não coincidem.");
      return;
    }

    if (senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (!termos) {
      alert("Você deve ler e concordar com os termos de uso para prosseguir.");
      return;
    }

    const usuariosStr = localStorage.getItem("usuarios");
    const usuarios = usuariosStr ? JSON.parse(usuariosStr) : [];

    const emailExistente = usuarios.some((user) => user.email === email);
    if (emailExistente) {
      alert("Este email já está cadastrado no sistema.");
      return;
    }

    const cpfExistente = usuarios.some((user) => user.cpf === cpf);
    if (cpfExistente) {
      alert("Este CPF já está cadastrado no sistema.");
      return;
    }

    const novoUsuario = {
      nomeCompleto: nome,
      cpf: cpf,
      dataNascimento: dataNascimento,
      email: email,
      senha: senha,
    };

    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("🎉 Registro finalizado com sucesso! Você já pode fazer login.");

    navigate("/login");
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-6 justify-center items-center w-full"
      >
        <Input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <div className="flex flex-col gap-6 xl:flex-row w-full">
          <Input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            maxLength={14}
          />
          <Input
            type="date"
            placeholder="Data de Nascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </div>

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

        <Input
          type="password"
          placeholder="Confirmar senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />

        <div className="checkbox-wrapper relative flex items-center w-full">
          <input
            type="checkbox"
            id="termos"
            className="peer absolute w-6 h-6 opacity-0 cursor-pointer"
            checked={termos}
            onChange={(e) => setTermos(e.target.checked)}
          />

          <label
            htmlFor="termos"
            className="text-white flex items-center cursor-pointer select-none 
            before:block before:w-6 before:h-6 before:border before:border-[#e6e6f0] 
            before:rounded-lg before:mr-2 before:transition-all before:duration-150 
            peer-checked:before:bg-[#C9A227] peer-checked:before:border-[#B8931C] 
            peer-checked:before:bg-[url('data:image/svg+xml,%3Csvg%20width=%2724%27%20height=%2724%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath%20d=%27M9%2016.17L4.83%2012L3.41%2013.41L9%2019L21%207L19.59%205.59L9%2016.17Z%27%20fill=%27white%27/%3E%3C/svg%3E')] 
            peer-checked:before:bg-center peer-checked:before:bg-no-repeat peer-checked:before:bg-contain"
          >
            Li e concordo com os termos de uso do sistema.
          </label>
        </div>

        <Button type="submit" className="mx-auto">
          FINALIZAR REGISTRO
        </Button>
      </form>

      <div className="mt-2 mb-32">
        <Link
          to="/login"
          className="text-white text-sm lg:text-base hover:underline"
        >
          Já tenho cadastro. Ir para login.
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
