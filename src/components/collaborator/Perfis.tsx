import React, { useEffect } from "react";
import authenticationVerify from "../../services/authenticationVerify";
import axios from "axios";
import { url } from "../../env";

const Perfis: React.FC = () => {
  const accessStatus = authenticationVerify('/login');
  const userId = localStorage.getItem('userId');
  const access = localStorage.getItem('access')

  useEffect(() => {
    const fetchPerfisLinks = async (userId: string) => {
      try {
        const response = await axios.get(url + `users/${userId}/`, {
          headers: {
            'Authorization': `Bearer ${access}`,
            'Content-Type': 'application/json'
          }
        })
        return response.data.groups;
      } catch {}
    }

    const fetchPerfisDetails = async () => {
      const perfisLinks = await fetchPerfisLinks(userId);
      for (const perfilLink of Object.values(perfisLinks)) {
        console.log(perfilLink)
      }
    }

    fetchPerfisDetails()
  })


  if (accessStatus === 200) {
    return (
      <>
      <h1>passou</h1>
      </>
    )
  }
  }

export default Perfis;
