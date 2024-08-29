import MenuItem from "./menuItem";
import React = require("react");

type basePropsType = {
  content: React.ReactNode;
  title?: string;
  menuItem?: Array<MenuItem>;
};

export default basePropsType;
