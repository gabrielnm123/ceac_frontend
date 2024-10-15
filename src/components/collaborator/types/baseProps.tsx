import MenuItem from "./menuItem";
import React from 'react'

type basePropsType = {
  content: React.ReactNode;
  title?: string;
  menuItem?: Array<MenuItem>;
};

export default basePropsType;
