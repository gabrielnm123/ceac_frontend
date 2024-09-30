import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { useEffect } from "react";
import { getCookie, setCookie } from "./cookie";

const useAuthenticationVerify = (
  path: string,
  triggerAuth?: boolean,
  setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getCookie('access_token');  // Obtém o access token do cookie
    if (accessToken) {
      // Verifica o access token
      axiosInstance.post('token/verify/', { token: accessToken })
        .then(() => {
          if (setIsAuthenticated) {
            setIsAuthenticated(true);  // Se o token for válido, o usuário está autenticado
          }
        })
        .catch(() => {
          // Tenta atualizar o token com o refresh token se o access token expirar
          const refreshToken = getCookie('refresh_token');  // Obtém o refresh token do cookie
          if (refreshToken) {
            axiosInstance.post('token/refresh/', { refresh: refreshToken })
              .then((response) => {
                if (setIsAuthenticated) {
                  setIsAuthenticated(true);
                }
                // Usa a função setCookie para armazenar o novo access e refresh token
                setCookie('access_token', response.data.access);  // Atualiza o access token
                setCookie('refresh_token', response.data.refresh);  // Atualiza o refresh token
              })
              .catch(() => {
                // Redireciona para a página de login se o refresh token também falhar
                navigate(path);
              });
          } else {
            navigate(path);  // Redireciona para a página de login se não houver refresh token
          }
        });
    } else {
      navigate(path);  // Redireciona para a página de login se não houver access token
    }
  }, [triggerAuth]);
};

export default useAuthenticationVerify;
