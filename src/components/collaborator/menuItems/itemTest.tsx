import React from 'react';
import {
  ExperimentOutlined
} from '@ant-design/icons';
import getMenuItem from './getMenuItem';
import Test from '../Modulos/Test/Test';

const itemTest = (
  setBaseContent: React.Dispatch<React.SetStateAction<React.ReactNode>>,
  setBaseTitle: React.Dispatch<React.SetStateAction<string>>,
) => {

  const test = () => {
    setBaseContent(<Test />);
    setBaseTitle('Area de teste');
  }

  return [
    getMenuItem('Test', 'test0', <ExperimentOutlined />, [
      getMenuItem('Test', 'test1', < ExperimentOutlined/>, undefined, test)
    ])
  ]
}

export default itemTest;
