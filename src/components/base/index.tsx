import { MenuProps, Layout, Menu, theme, Typography, Spin } from 'antd';
import '..@/public/css/header.css'
import { useSpinning } from '../provider';

type menuItemType = Required<MenuProps>['items'][number];

type basePropsType = {
  content: React.ReactNode;
  title?: string;
  menuItem?: Array<menuItemType>;
};

export default function Base(props: basePropsType) {
  const { Title } = Typography;
  const { Header, Content, Footer } = Layout;
  const { getSpinning } = useSpinning();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className='layout-base'>
      <Spin spinning={getSpinning} tip='Carregando...' className='spin-base'>
        <Header className='header-base'>
          <img src='/ceac.png' alt="logo" className='logo-base' />
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
      </Spin>
      <Footer className='footer-base'>
        ©2024 Criado por Gabriel Nunes
      </Footer>
    </Layout>
  );
}
