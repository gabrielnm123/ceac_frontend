import { Dispatch, SetStateAction } from "react";
import { FormInstance } from 'antd';
import type { MenuProps } from 'antd';

interface spinningContextType {
  getSpinning: boolean;
  setSpinning: Dispatch<SetStateAction<boolean>>;
}

type modulosCapacitaType = {
  id: number;
  nome: string;
};

type menuItemType = Required<MenuProps>['items'][number];

type createFichaPropsType = {
  form?: FormInstance;
  funcEditing?: (values: object) => void;
};

type basePropsType = {
  content: React.ReactNode;
  title?: string;
  menuItem?: Array<menuItemType>;
};

export type {
  spinningContextType,
  modulosCapacitaType,
  menuItemType,
  createFichaPropsType,
  basePropsType
};
