import React from 'react';  
import './css/Base.css'
import Logo from '../img/ceac.png'
import { Layout, Menu, theme, Typography } from 'antd';
import type baseProps from './types/baseProps';

const Base: React.FC<baseProps> = (props) => {
  const { Title } = Typography;
  const { Header, Content, Footer } = Layout;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className='layout-base'>
      <Header className='header-base'>
        <img src={Logo} alt="logo" className='logo-base' />
        <Menu
          className='menu-base'
          theme="dark"
          mode="horizontal"
          items={props.menuItem}
        />
      </Header>
      <Content className='content-base'>
        <Title className='title'>{props.title}</Title>
        <div
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className='content-div1-base'
        >
          {props.content}
        </div>
      </Content>
      <Footer className='footer-base'>
        ©2024 Criado por Gabriel Nunes
      </Footer>
    </Layout>
  );
};

export default Base;
