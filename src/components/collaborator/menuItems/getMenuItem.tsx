import React from 'react';
import type menuItemType from '../types/menuItem';

function getMenuItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: menuItemType[],
  onClick?: () => void,
): menuItemType {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  };
}

export default getMenuItem;
