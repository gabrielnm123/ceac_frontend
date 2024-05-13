import React, { useEffect } from 'react';
import Base from './operator/Base';
import { Login, breadcrumbItemLogin } from './operator/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Test from './operator/Test';

const App: React.FC = () => {
  useEffect(() => {
    document.documentElement.lang = 'pt-br';
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={ <Base content={ <Login /> } breadcrumbItem={ breadcrumbItemLogin } /* menuItem={ items } */ /> } />
        <Route path='/test' element={ <Test /> } />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
