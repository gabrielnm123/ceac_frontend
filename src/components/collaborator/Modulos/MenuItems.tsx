import React from 'react';
import {
  // DesktopOutlined,
  // FileOutlined,
  // PieChartOutlined,
  // TeamOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import type MenuItem from '../types/MenuItem';

function getMenuItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  onClick?: () => void,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  };
}

const itemUser = () => {
  const logout = () => {
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
    localStorage.removeItem('headers');
    localStorage.removeItem('userId');
  };

  return [
    getMenuItem('User', 0, <UserOutlined />, [
      getMenuItem(<a href='/colaborador/login'>Sair</a>, 1, <LogoutOutlined />, undefined, logout)
    ])
  ]
}

// const items: MenuItem[] = [
//   getMenuItem('Option 1', '1', <PieChartOutlined />),
//   getMenuItem('Option 2', '2', <DesktopOutlined />),
//   getMenuItem('User', 'sub1', <UserOutlined />, [
//     getMenuItem('Tom', '3'),
//     getMenuItem('Bill', '4'),
//     getMenuItem('Alex', '5'),
//   ]),
//   getMenuItem('Team', 'sub2', <TeamOutlined />, [getMenuItem('Team 1', '6'), getMenuItem('Team 2', '8')]),
//   getMenuItem('Files', '9', <FileOutlined />),
// ];

export { getMenuItem, itemUser };
