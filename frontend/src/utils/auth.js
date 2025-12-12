// Utilitários de autenticação

export const getUsuarioLogado = () => {
  try {
    const usuario = localStorage.getItem("usuarioLogado");
    return usuario ? JSON.parse(usuario) : null;
  } catch (error) {
    console.error("Erro ao obter usuário logado:", error);
    return null;
  }
};

export const isAuthenticated = () => {
  return getUsuarioLogado() !== null;
};

export const logout = () => {
  localStorage.removeItem("usuarioLogado");
};

export const getNomeUsuario = () => {
  const usuario = getUsuarioLogado();
  if (!usuario) return null;

  const primeiroNome = usuario.nomeCompleto.split(" ")[0];
  return primeiroNome;
};
