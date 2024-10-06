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
          // Se o access token expirar, tenta renovar o token com a chamada de refresh
          axiosInstance.post('token/refresh/')  // Faz a chamada sem enviar o refresh token explicitamente
            .then((response) => {
              if (setIsAuthenticated) {
                setIsAuthenticated(true);
              }
              // Atualiza o access token no cookie
              setCookie('access_token', response.data.access);  // Armazena o novo access token
              setCookie('refresh_token', response.data.refresh);  // Armazena o novo access token
            })
            .catch(() => {
              // Redireciona para a página de login se a renovação também falhar
              navigate(path);
            });
        });
    } else {
      // Redireciona para a página de login se não houver access token
      navigate(path);
    }
  }, [triggerAuth]);
};

export default useAuthenticationVerify;
