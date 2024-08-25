import React from 'react';
import type menuItem from '../types/menuItem';

function getMenuItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: menuItem[],
  onClick?: () => void,
): menuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  };
}

export default getMenuItem;
