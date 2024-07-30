import React from "react";
import authenticationVerify from "../../../services/authenticationVerify";

const CreateClient: React.FC = () => {
  authenticationVerify('/login')
  return (
    <h1>criar ficha</h1>
  )
}

export default CreateClient;