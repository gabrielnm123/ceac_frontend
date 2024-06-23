import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from './collaborator/Base';
import { Login, breadcrumbItemLogin } from './collaborator/Login';
import Perfil from './collaborator/Perfil';

const App: React.FC = () => {
  useEffect(() => {
    document.documentElement.lang = 'pt-br';
  }, []);

  return (
    <>
      <BrowserRouter basename="/colaborador">
        <Routes>
          <Route path='/login' element={<Base content={<Login />} breadcrumbItem={breadcrumbItemLogin} /* menuItem={items} */ />} />
          <Route path='/perfil' element={<Perfil />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
