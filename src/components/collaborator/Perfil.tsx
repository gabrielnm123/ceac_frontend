import React, { useEffect, useState } from "react";
import authenticationVerify from "../../services/authenticationVerify";
import axios from "axios";
import { url } from "../../env";

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
      } catch {}
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
      } catch {}
    }

     fetchPerfisDetails()
  }, [userId, access])


  if (accessStatus === 200) {
    return (
      <>
      <ul>
        {array ? (array.map((perfilName, index) => (
          <li key={index}>{perfilName}</li>
        ))) : '' }
      </ul>
      </>
    )
  }
  }

export default Perfis;
