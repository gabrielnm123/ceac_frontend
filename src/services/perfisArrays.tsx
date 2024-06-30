import { useEffect } from "react";
import authenticationVerify from "./authenticationVerify";
import axios from "axios";
import { url } from "../env";

const perfisArrays = () => {
  useEffect(() => {
    document.title = 'Perfil';
    const fetchPerfisLinks = async (userId: string) => {
      try {
        const user = await axios.get(url + `users/${userId}/`, {
          headers: JSON.parse(localStorage.getItem('headers'))
        })
        return user.data.groups;
      } catch {authenticationVerify('/login')}
    }

    const fetchPerfisNames = async () => {
      try {
        const perfisLinks = await fetchPerfisLinks(localStorage.getItem('userId'));
        const perfisNames = [];
        for (let perfilLink of perfisLinks) {
          const perfil = await axios.get(perfilLink, {
            headers: JSON.parse(localStorage.getItem('headers'))
          })
          perfisNames.push(perfil.data.name)
        }
        const user = await axios.get(`${url}users/${localStorage.getItem('userId')}/`, {headers: JSON.parse(localStorage.getItem('headers'))})
        if (user.data.is_superuser) {
          perfisNames.splice(0, 0, 'SUPER USUÁRIO')
          localStorage.setItem('perfisNames', JSON.stringify(perfisNames));
        } else {
          localStorage.setItem('perfisNames', JSON.stringify(perfisNames));
        }
      } catch {authenticationVerify('/login')}
    }
    
    fetchPerfisNames()
  }, [localStorage.getItem('userId'), JSON.parse(localStorage.getItem('headers'))])
  
  return JSON.parse(localStorage.getItem('perfisNames'));
}

export default perfisArrays;
