import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';

const root = createRoot(document.getElementById('root'));
root.render(<ConfigProvider locale={ptBR}><App /></ConfigProvider>);
