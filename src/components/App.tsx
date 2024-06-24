import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from './collaborator/Base';
import Login from './collaborator/Login';
import Perfil from './collaborator/Perfil';
import Favicon from './img/ceac.ico'

const App: React.FC = () => {
  useEffect(() => {
    document.documentElement.lang = 'pt-br';
    const favicon = document.createElement('link');
    favicon.type = 'image/x-icon';
    favicon.rel = 'icon';
    favicon.href = Favicon; // Caminho para o seu favicon
    document.head.appendChild(favicon);
  }, []);

  return (
    <>
      <BrowserRouter basename="/colaborador">
        <Routes>
          <Route path='/login' element={<Base content={<Login />} title={'Autenticação'} /* menuItem={items} */ />} />
          <Route path='/perfil' element={<Base content={<Perfil />} title={'Perfil'} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
