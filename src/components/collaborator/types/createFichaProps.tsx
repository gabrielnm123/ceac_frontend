import { FormInstance } from 'antd';

type createFichaProps = {
  form?: FormInstance;
  funcEditing?: (values: object) => void;
}

export default createFichaProps;
