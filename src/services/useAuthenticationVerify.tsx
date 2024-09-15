import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { useEffect, useState } from "react";

const useAuthenticationVerify = (
  path: string,
  triggerAuth: boolean,
  setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const navigate = useNavigate();
  setIsAuthenticated = setIsAuthenticated || (() => {});

  useEffect(() => {
    axiosInstance.post('token/verify/', { token: localStorage.getItem('access') })
      .then(() => {
        setIsAuthenticated(true)
      })
      .catch(() => {
        axiosInstance.post('token/refresh/', { refresh: localStorage.getItem('refresh') })
          .then((response) => {
            setIsAuthenticated(true)
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
  }, [triggerAuth]);
}

export default useAuthenticationVerify;
