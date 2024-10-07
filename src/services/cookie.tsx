// Função para obter o valor do cookie pelo nome
const getCookie = (name: string): string | null => {
  // Divide a string de cookies em um array, separando pelo nome do cookie
  const parts = document.cookie.split(name + '=');

  // Verifica se o cookie foi encontrado (se há dois elementos no array)
  if (parts.length === 2) {
    // Pega o valor do cookie, separando-o dos demais cookies, se existirem
    const cookieValue = parts[1].split('; ')[0];
    
    // Retorna o valor do cookie ou null caso o valor seja undefined ou não encontrado
    return cookieValue || null;
  }

  // Retorna null se o cookie não for encontrado
  return null;
};

// Função para definir cookies genéricos com parâmetros opcionais
const setCookie = (
  name: string,
  value: string,
  options: {
    path?: string;
    domain?: string;
    expires?: string | Date;
    sameSite?: 'Lax' | 'Strict' | 'None';
  } = {}
) => {
  // Constrói o cookie base com o nome e valor
  let cookieString = `${name}=${encodeURIComponent(value || "")};`;

  // Adiciona o caminho (path), com padrão sendo "/"
  cookieString += ` path=${options.path || '/'};`;

  // Se o domínio for especificado, adiciona-o
  if (options.domain) {
    cookieString += ` domain=${options.domain};`;
  }

  // Se a data de expiração for especificada, adiciona-a
  if (options.expires) {
    const expiresValue = typeof options.expires === 'string' ? options.expires : options.expires.toUTCString();
    cookieString += ` expires=${expiresValue};`;
  }

  // Adiciona o atributo SameSite, com padrão sendo "Lax"
  cookieString += ` SameSite=${options.sameSite || 'Lax'};`;

  // Adiciona o atributo Secure se estiver em produção
  if (process.env.NODE_ENV === 'production') {
    cookieString += " Secure;";
  }

  // Define o cookie no documento
  document.cookie = cookieString;
};

// Função para deletar cookies genéricos com parâmetros opcionais
const deleteCookie = (
  name: string,
  options: {
    path?: string;
    domain?: string;
    sameSite?: 'Lax' | 'Strict' | 'None';
  } = {}
) => {
  // Define o cookie com uma data de expiração no passado para deletá-lo
  let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

  // Adiciona o caminho (path), com padrão sendo "/"
  cookieString += ` path=${options.path || '/'};`;

  // Se o domínio for especificado, adiciona-o
  if (options.domain) {
    cookieString += ` domain=${options.domain};`;
  }

  // Adiciona o atributo SameSite, com padrão sendo "Lax"
  cookieString += ` SameSite=${options.sameSite || 'Lax'};`;

  // Adiciona o atributo Secure se estiver em produção
  if (process.env.NODE_ENV === 'production') {
    cookieString += " Secure;";
  }

  // Define o cookie no documento para que ele seja removido
  document.cookie = cookieString;
};

// Exporta as funções getCookie, setCookie, e deleteCookie para que possam ser utilizadas em outros módulos
export { getCookie, setCookie, deleteCookie };
