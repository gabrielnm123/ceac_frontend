import { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

const perfisObject = () => {
  const [getPerfis, setPerfis] = useState< { [key: string]: Array<string> } | {[key: string]: null} >({'null': null})

  useEffect(() => {
    const fetchPerfisNames = async () => {
      try {
        const user = await axiosInstance.get(`users/${Cookies.get('userId')}/`);
        const perfisLinks = user.data.groups;
        const perfisNamePermissions: { [key: string]: Array<string> } = {};
        for (const perfilLink of perfisLinks) {
          const perfil = await axiosInstance.get(perfilLink);
          const permissionCodeName = []
          for (const permission of perfil.data.permissions) {
            const response = await axiosInstance.get(permission);
            permissionCodeName.push(response.data.codename)
          }
          perfisNamePermissions[perfil.data.name] = permissionCodeName;
        }
        if (user.data.is_superuser) {
          perfisNamePermissions['SUPER USUÁRIO'] = ['SUPER USUÁRIO']
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
