import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Base from './collaborator/Base';
import Login from './collaborator/Login';
import Perfil from './collaborator/Perfil';
import Modulo from './collaborator/Modulos/Modulo';
import itemUser from './collaborator/menuItems/itemUser';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { SpinningProvider } from './collaborator/Provider/Spinning';

const App: React.FC = () => {
  const [getBaseContent, setBaseContent] = useState<React.ReactNode>(<Perfil />);
  const [getBaseTitle, setBaseTitle] = useState<string>('Perfil');
  const perfilName = localStorage.getItem('perfilName')

  useEffect(() => {
    document.documentElement.lang = 'pt-BR';
    dayjs.locale('pt-br');
    const favicon = document.createElement('link');
    favicon.type = 'image/x-icon';
    favicon.rel = 'icon';
    favicon.href = '/ceac.ico';
    document.head.appendChild(favicon);
  }, []);

  return (
    <BrowserRouter>
      <SpinningProvider>
        <Routes>
          <Route path='colaborador/login' element={<Base content={<Login />} title='Autenticação' />} />
          <Route path='colaborador/perfil' element={<Base content={getBaseContent} title={getBaseTitle} menuItem={itemUser(setBaseContent, setBaseTitle)} />} />
          {
            perfilName ? <Route path={`colaborador/${perfilName}`} element={<Modulo />} /> : null
          }
          <Route path="*" element={<Navigate to="colaborador/perfil" />} />
        </Routes>
      </SpinningProvider>
    </BrowserRouter>
  );
};

export default App;
