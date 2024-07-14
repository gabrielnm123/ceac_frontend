import { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";

const perfisArrays = () => {
  const [getPerfisNames, setPerfisNames] = useState< Array<string> | Array<null> >([null])

  useEffect(() => {
    document.title = 'Perfil';
    const fetchPerfisLinks = async (userId: string) => {
      try {
        const user = await axiosInstance.get(`users/${userId}/`)
        return user.data.groups;
      } catch {}
    }

    const fetchPerfisNames = async () => {
      try {
        const perfisLinks = await fetchPerfisLinks(localStorage.getItem('userId'));
        const perfisNames = [];
        for (let perfilLink of perfisLinks) {
          const perfil = await axiosInstance.get(perfilLink)
          perfisNames.push(perfil.data.name)
        }
        const user = await axiosInstance.get(`users/${localStorage.getItem('userId')}/`)
        if (user.data.is_superuser) {
          perfisNames.splice(0, 0, 'SUPER USUÁRIO')
          setPerfisNames(perfisNames);
        } else {
          setPerfisNames(perfisNames);
        }
      } catch {}
    }
    
    fetchPerfisNames()
  }, [])
  
  return getPerfisNames;
}

export default perfisArrays;
