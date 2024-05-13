import MenuItem from "./MenuItem";
import React = require("react");

type BaseProps = {
  content: React.ReactNode;
  breadcrumbItem: Array<React.JSX.Element>;
  menuItem?: Array<MenuItem>;
};

export default BaseProps;
