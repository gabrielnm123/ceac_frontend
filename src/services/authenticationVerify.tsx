import { useEffect, useState } from "react";
import Api from "./api";
import { useNavigate } from "react-router-dom";

const authenticationVerify = (path: string) => {
  const api = new Api;
  const navigate = useNavigate();
  const refresh = localStorage.getItem('refresh');
  const access = localStorage.getItem('access');
  const [accessStatus, setAccessStatus] = useState<null | number>(null);

  useEffect(() => {
    api.post('/api/token/verify/', {token: access})
      .then(result => {
        setAccessStatus(result.status);
      })
      .catch(() => {
        api.post('/api/token/refresh/', {refresh: refresh})
        .then(result => {
            setAccessStatus(result.status)
            localStorage.setItem('access', result.data.access);
          })
          .catch(error => {
            setAccessStatus(error.status);
            navigate(path);
          })
      })
    })
    return accessStatus
}

export default authenticationVerify;
