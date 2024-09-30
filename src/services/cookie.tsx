// Função para obter o valor do cookie pelo nome
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue || null; // Retorna null se o valor não for encontrado
  }
  return null;
};

// Função para definir cookies
const setCookie = (name: string, value: string) => {
  document.cookie = name + "=" + (value || "") + "; path=/; SameSite=Lax; Secure";
};

export { getCookie, setCookie };
