import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { useEffect, useState } from "react";

const authenticationVerify = (path: string, counter: number): boolean => {
  const navigate = useNavigate();
  const [getIsAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    axiosInstance.post('token/verify/', {token: localStorage.getItem('access')})
      .then(() => {
        setIsAuthenticated(true);
      })
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
            setIsAuthenticated(true);
          })
          .catch(() => {
            navigate(path);
          })
      });
  }, [counter]);

  return getIsAuthenticated;
}

export default authenticationVerify;
