import { FormInstance } from 'antd';

type createFichaPropsType = {
  form?: FormInstance;
  funcEditing?: (values: object) => void;
}

export default createFichaPropsType;
