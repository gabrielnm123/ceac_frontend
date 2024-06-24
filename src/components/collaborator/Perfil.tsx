import React, { useEffect, useState } from "react";
import authenticationVerify from "../../services/authenticationVerify";
import axios from "axios";
import { url } from "../../env";
import { Form, Input, Button, Anchor, message } from 'antd';

const { Link } = Anchor;

const Perfis: React.FC = () => {
  const accessStatus = authenticationVerify('/login');
  const userId = localStorage.getItem('userId');
  const access = localStorage.getItem('access')
  const headers = JSON.parse(localStorage.getItem('headers'))
  const [array, setArray] = useState< null | Array<string> >(null);

  useEffect(() => {
    document.title = 'Perfil';
    const fetchPerfisLinks = async (userId: string) => {
      try {
        const response = await axios.get(url + `users/${userId}/`, {
          headers: headers
        })
        return response.data.groups;
      } catch {
        authenticationVerify('/login')
      }
    }

    const fetchPerfisDetails = async () => {
      try {
        const perfisLinks = await fetchPerfisLinks(userId);
        const perfisNames = [];
        for (let perfilLink of perfisLinks) {
          const perfil = await axios.get(perfilLink, {
            headers: headers
          })
          perfisNames.push(perfil.data.name)
        }
        setArray(perfisNames);
      } catch {
        authenticationVerify('/login')
      }
    }

     fetchPerfisDetails()
  }, [userId, access])


  if (accessStatus === 200) {
    return (
      <Form
        className="form-perfil"
        >
          {array ? (array.map((perfilName, index) => (
            <Form.Item
              className="item-perfil"
              key={index}>
                {perfilName}
            </Form.Item>
          ))) : [] }
        </Form>
    )
  }
  }

export default Perfis;
