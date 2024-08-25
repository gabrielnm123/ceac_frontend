import MenuItem from "./menuItem";
import React = require("react");

type baseProps = {
  content: React.ReactNode;
  title?: string;
  menuItem?: Array<MenuItem>;
};

export default baseProps;
