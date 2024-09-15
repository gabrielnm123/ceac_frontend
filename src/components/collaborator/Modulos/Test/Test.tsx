import { Button, Typography } from "antd";
import React, { useState } from "react";
import useTestAuthen from "../../../../services/useTestAuthen";

const { Title } = Typography

const Test: React.FC = () => {
  const [getCounter, setCounter] = useState<number>(0)


  const numero = () => {
    console.log(getCounter)
  }

  useTestAuthen('/login', getCounter, numero)

  return (
    <>
      <Title level={1}>{getCounter}</Title>
      <Button onClick={ () => setCounter(getCounter + 1) }>Some mais um</Button>
    </>
  )
}

export default Test;
