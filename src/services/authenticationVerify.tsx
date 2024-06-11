import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Result } from "antd";

const authenticationVerify = (path: string) => {
  const navigate = useNavigate();
  const refresh = localStorage.getItem('refresh');
  const access = localStorage.getItem('access');
  const [accessStatus, setAccessStatus] = useState<null | number>(null);
  const url = process.env.REACT_APP_URL || 'http://localhost:8002/api/'

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.post(url + 'token/verify/', {token: access});
        setAccessStatus(response.status);
      } catch {
        try {
          const response = await axios.post(url + 'token/refresh/', {refresh: refresh});
          setAccessStatus(response.status);
          localStorage.setItem('access', response.data.access);
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
