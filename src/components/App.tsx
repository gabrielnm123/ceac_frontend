import React, { useEffect } from 'react';
import Base from './operator/Base';
import { Login, breadcrumbItemLogin } from './operator/Login';
import Api from '../services/api';

const App: React.FC = () => {
  const api = new Api();
  
  api.post('/api/token/', {username: 'admin', password: 'senha'})
    .then(resposta => {
      console.log('Access:', resposta.access);
      console.log('Refresh:', resposta.refresh);
    })
    .catch(erro => console.error(erro));

  useEffect(() => {
    document.documentElement.lang = 'pt-br';
  }, [])

  return (
    <Base content={ <Login /> } breadcrumbItem={ breadcrumbItemLogin } />
  )
};

export default App;
