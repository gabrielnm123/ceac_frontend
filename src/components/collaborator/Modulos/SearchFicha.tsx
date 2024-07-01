import React from "react";
import Base from "../Base";
import { Form, Input, Button, message } from 'antd';
import { items } from "./MenuItems";

const SearchFicha: React.FC = () => {
  return (
    <Base content={
      <Form>

      </Form>
    } title="Buscar Ficha"
    menuItem={items} />
  )
}

export default SearchFicha;
