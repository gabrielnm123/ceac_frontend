import { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";

const perfisObject = () => {
  const [getPerfis, setPerfis] = useState< { [key: string]: Array<string> } | {} >({})

  useEffect(() => {
    const fetchPerfisNames = async () => {
      try {
        const user = await axiosInstance.get(`users/${localStorage.getItem('userId')}/`);
        const perfisLinks = user.data.groups;
        const perfisNamePermissions: { [key: string]: Array<string> } = {};
        for (let perfilLink of perfisLinks) {
          const perfil = await axiosInstance.get(perfilLink);
          const permissionCodeName = []
          for (const permission of perfil.data.permissions) {
            const response = await axiosInstance.get(permission);
            permissionCodeName.push(response.data.codename)
          }
          perfisNamePermissions[perfil.data.name] = permissionCodeName;
        }
        if (user.data.is_superuser) {
          setPerfis(perfisNamePermissions);
        } else {
          setPerfis(perfisNamePermissions);
        }
      } catch {}
    }
    
    fetchPerfisNames()
  }, [])
  
  return getPerfis;
}

export default perfisObject;
