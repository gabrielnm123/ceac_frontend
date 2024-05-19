import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from './operator/Base';
import { Login, breadcrumbItemLogin } from './operator/Login';
import Test from './operator/Test';

const App: React.FC = () => {
  useEffect(() => {
    document.documentElement.lang = 'pt-br';
  }, []);

  return (
    <>
      <BrowserRouter basename="/operador">
        <Routes>
          <Route path='/login' element={<Base content={<Login />} breadcrumbItem={breadcrumbItemLogin} /* menuItem={items} */ />} />
          <Route path='/test' element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
