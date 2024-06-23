import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../env";

const authenticationVerify = (path: string) => {
  const navigate = useNavigate();
  const refresh = localStorage.getItem('refresh');
  const access = localStorage.getItem('access');
  const [accessStatus, setAccessStatus] = useState<null | number>(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.post(url + 'token/verify/', {token: access});
        setAccessStatus(response.status);
      } catch {
        try {
          const response = await axios.post(url + 'token/refresh/', {refresh: refresh});
          setAccessStatus(response.status);
          const access = response.data.access;
          const headers = {
            'Authorization': `Bearer ${access}`,
            'Content-Type': 'application/json'
          }
          localStorage.setItem('access', access);
          localStorage.setItem('headers', JSON.stringify(headers));
        } catch (error) {
          setAccessStatus(error.status);
          navigate(path);
        }
      }
    }
    verify();
  }, [url, access, refresh, navigate, path])
  return accessStatus;
}

export default authenticationVerify;
