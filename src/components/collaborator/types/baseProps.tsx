import type menuItemType from "./menuItem";
import React from 'react'

type basePropsType = {
  content: React.ReactNode;
  title?: string;
  menuItem?: Array<menuItemType>;
  spinning?: boolean;
};

export default basePropsType;
