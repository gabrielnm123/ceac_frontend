import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../env";

const authenticationVerify = (path: string) => {
  const navigate = useNavigate();
  const [accessStatus, setAccessStatus] = useState<null | number>(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.post(url + 'token/verify/', {token: localStorage.getItem('access')});
        setAccessStatus(response.status);
      } catch {
        try {
          const response = await axios.post(url + 'token/refresh/', {refresh: localStorage.getItem('refresh')});
          setAccessStatus(response.status);
          const access = response.data.access;
          const headers = {
            'Authorization': `Bearer ${access}`,
            'Content-Type': 'application/json'
          }
          localStorage.setItem('access', access);
          localStorage.setItem('headers', JSON.stringify(headers));
        } catch {
          navigate(path);
        }
      }
    }
    verify();
  }, [])

  return accessStatus;
}

export default authenticationVerify;
