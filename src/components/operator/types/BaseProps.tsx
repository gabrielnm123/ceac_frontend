import MenuItem from "./MenuItem";

type BaseProps = {
  content: React.ReactNode;
  breadcrumbItem: Array<string>;
  menuItem?: Array<MenuItem>;
};

export default BaseProps;
