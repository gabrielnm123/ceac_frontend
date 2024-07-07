import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from './collaborator/Base';
import Login from './collaborator/Login';
import Perfil from './collaborator/Perfil';
import Favicon from './img/ceac.ico'
import Modulo from './collaborator/Modulos/Modulo';
import { itemUser } from './collaborator/MenuItems';
import moment from 'moment';
import 'moment/locale/pt-br';

const App: React.FC = () => {
  useEffect(() => {
    document.documentElement.lang = 'pt-BR';
    moment.locale('pt-br');
    const favicon = document.createElement('link');
    favicon.type = 'image/x-icon';
    favicon.rel = 'icon';
    favicon.href = Favicon;
    document.head.appendChild(favicon);
  }, []);
  
  return (
    <>
    <BrowserRouter basename="/colaborador">
      <Routes>
        <Route path='/login' element={<Base content={<Login />} title='Autenticação' />} />
        <Route path='/perfil' element={<Base content={<Perfil />} title='Perfil' menuItem={itemUser()} />} />
        <Route path={`/${localStorage.getItem('perfilName')}`} element={<Modulo /> } />
      </Routes>
    </BrowserRouter>
    </>
);
};

export default App;
