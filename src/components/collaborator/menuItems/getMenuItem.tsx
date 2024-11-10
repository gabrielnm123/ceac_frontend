import React from 'react';
import type menuItemType from '../types/menuItem';

const getMenuItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: menuItemType[],
  onClick?: () => void,
): menuItemType => {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  };
}

export default getMenuItem;
