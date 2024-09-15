import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { useEffect } from "react";

const useTestAuthen = (path: string, counter: number, callback: Function) => {
  const navigate = useNavigate();
  console.log('função')

  useEffect(() => {
    axiosInstance.post('token/verify/', {token: localStorage.getItem('access')})
      .then(() => {
        console.log('passou para axiosInstance')
        callback()
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
            callback()
          })
          .catch(() => {
            navigate(path);
          })
      });
  }, [counter]);
}

export default useTestAuthen;
