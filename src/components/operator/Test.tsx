import React, { useState, useEffect } from 'react';
import Api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Test: React.FC = () => {
  const api = new Api;
  const [status, setStatus] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.post('/api/token/verify/', {token: localStorage.getItem('access')})
      .then(result => {
        setStatus(result.status);
      })
      .catch(error => {
        if (error.response.status === 401) {
          api.post('/api/token/refresh/', {refresh: localStorage.getItem('refresh')})
            .then(result => {
              localStorage.setItem('access', result.data.access);
              window.location.reload();
              // aqui quero colocar um codigo recarrega essa pagina
            })
            .catch(error => {
              navigate('/login');
            })
        }
      });
  }, []);

  if (status === 200) {
    return <h1>{ status }</h1>;
  }
}

export default Test;
