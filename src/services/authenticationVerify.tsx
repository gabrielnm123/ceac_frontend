import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { useEffect } from "react";

const useAuthenticationVerify = (path: string, counter: number) => {
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.post('token/verify/', {token: localStorage.getItem('access')})
      .catch(() => {
        axiosInstance.post('token/refresh/', {refresh: localStorage.getItem('refresh')})
          .then((response) => {
            const access = response.data.access;
            const headers = {
              'Authorization': `Bearer ${access}`,
              'Content-Type': 'application/json'
            }
            localStorage.setItem('access', access);
            localStorage.setItem('headers', JSON.stringify(headers));
          })
          .catch(() => {
            navigate(path);
          })
      });
  }, [counter]);
}

export default useAuthenticationVerify;
