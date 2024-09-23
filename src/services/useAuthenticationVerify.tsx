import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { useEffect } from "react";

const useAuthenticationVerify = (
  path: string,
  triggerAuth?: boolean,
  setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.post('token/verify/', { token: localStorage.getItem('access') })
      .then(() => {
        if (setIsAuthenticated) {
          setIsAuthenticated(true); // Verifica se setIsAuthenticated está definido antes de chamar
        }
      })
      .catch(() => {
        axiosInstance.post('token/refresh/', { refresh: localStorage.getItem('refresh') })
          .then((response) => {
            if (setIsAuthenticated) {
              setIsAuthenticated(true); // Verifica se setIsAuthenticated está definido antes de chamar
            }
            const access = response.data.access;
            const headers = {
              'Authorization': `Bearer ${access}`,
              'Content-Type': 'application/json'
            };
            localStorage.setItem('access', access);
            localStorage.setItem('headers', JSON.stringify(headers));
          })
          .catch(() => {
            navigate(path);
          });
      });
  }, [path, triggerAuth, navigate, setIsAuthenticated]);
};

export default useAuthenticationVerify;
