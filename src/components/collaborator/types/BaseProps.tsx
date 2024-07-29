import MenuItem from "./MenuItem";
import React = require("react");

type BaseProps = {
  content: React.ReactNode;
  title?: string;
  menuItem?: Array<MenuItem>;
};

export default BaseProps;
