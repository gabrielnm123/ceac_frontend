import React from "react";
import Base from "../Base";
import { Form/* , Input, Button, message  */} from 'antd';
import { itemUser } from "./MenuItems";

const SearchFicha: React.FC = () => {
  return (
    <Base content={
      <Form>
        
      </Form>
    } title="Buscar Ficha"
    menuItem={itemUser()} />
  )
}

export default SearchFicha;
