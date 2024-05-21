import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from './collaborator/Base';
import { Login, breadcrumbItemLogin } from './collaborator/Login';
import Test from './collaborator/Test';

const App: React.FC = () => {
  useEffect(() => {
    document.documentElement.lang = 'pt-br';
  }, []);

  return (
    <>
      <BrowserRouter basename="/colaborador">
        <Routes>
          <Route path='/login' element={<Base content={<Login />} breadcrumbItem={breadcrumbItemLogin} /* menuItem={items} */ />} />
          <Route path='/test' element={<Test />} />
          <Route path='/perfis' element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
