import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { useEffect } from "react";

const authenticationVerify = (path: string, counter: number, setIsAuthenticated: React.Dispatch<boolean>) => {
  const navigate = useNavigate();
  console.log('função')

  useEffect(() => {
    axiosInstance.post('token/verify/', {token: localStorage.getItem('access')})
      .then(() => {
        console.log('useEffect')
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
}

export default authenticationVerify;
