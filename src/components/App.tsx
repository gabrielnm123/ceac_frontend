import React, { useEffect } from 'react';
import Base from './operator/Base';
import { Login, breadcrumbItemLogin } from './operator/Login';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App: React.FC = () => {
  useEffect(() => {
    document.documentElement.lang = 'pt-br';
  }, [])

  return (
    <Base content={ <Login /> } breadcrumbItem={ breadcrumbItemLogin } /* menuItem={ items } */ />
  )
};

export default App;
