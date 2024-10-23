import { FormInstance } from 'antd';

type createFichaProps = {
  form?: FormInstance;
  funcEditing?: (values: number) => void;
}

export default createFichaProps;
