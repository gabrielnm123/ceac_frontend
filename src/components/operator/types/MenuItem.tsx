import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

type BaseProps = {
  content: React.ReactNode;
  breadcrumbItem: Array<string>;
  menuItem?: Array<MenuItem>;
};

export {MenuItem, BaseProps};
