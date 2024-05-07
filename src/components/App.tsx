import React, { useEffect } from 'react';
import Base from './operator/Base';
import { Login, breadcrumbItemLogin } from './operator/Login';

const App: React.FC = () => {
  const url = process.env.REACT_APP_URL || 'http://localhost:8002'

  useEffect(() => {
    document.documentElement.lang = 'pt-br';
  })

  return (
    <Base content={ <Login /> } breadcrumbItem={ breadcrumbItemLogin } />
  )
};

export default App;
