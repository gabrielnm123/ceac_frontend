import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from './collaborator/Base';
import Login from './collaborator/Login';
import Perfil from './collaborator/Perfil';
import Favicon from './img/ceac.ico'

const App: React.FC = () => {
  const [perfilNameState, setPerfilName] = useState< null | string >(null)

  useEffect(() => {
    document.documentElement.lang = 'pt-br';
    const favicon = document.createElement('link');
    favicon.type = 'image/x-icon';
    favicon.rel = 'icon';
    favicon.href = Favicon;
    document.head.appendChild(favicon);
  }, [localStorage.getItem('perfilName')]);

  return (
    <>
      <BrowserRouter basename="/colaborador">
        <Routes>
          <Route path='/login' element={<Base content={<Login />} title={'Autenticação'} /* menuItem={items} */ />} />
          <Route path='/perfil' element={<Base content={<Perfil />} title={'Perfil'} />} />
          {/* <Route path='/modulos' element={<Base content={} />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
