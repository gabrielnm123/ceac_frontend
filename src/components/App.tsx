import React, { useEffect } from 'react';
import Base from './operator/Base';
import { Login, breadcrumbItemLogin, refresh, access } from './operator/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Test from './operator/Test';
import Api from '../services/api';

const App: React.FC = () => {
  const api = new Api;


  useEffect(() => {
    document.documentElement.lang = 'pt-br';
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={ <Base content={ <Login /> } breadcrumbItem={ breadcrumbItemLogin } /* menuItem={ items } */ /> } />
        {api.users}
        <Route path='/test' element={ <Test /> } />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
