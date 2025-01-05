import { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import logout from "./logout";

const perfisObject = () => {
  const [getPerfis, setPerfis] = useState<{ [key: string]: Array<string> } | { [key: string]: null }>({ 'null': null });
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchPerfisData = async () => {
      if (userId) {
        try {
          const user = await axiosInstance.get(`users/${userId}/`);
          const perfisLinks = user.data.groups;
          const perfisNamePermissions: { [key: string]: Array<string> } = {};

          const fetchPerfis = perfisLinks.map(async (perfilLink: string) => {
            const perfil = await axiosInstance.get(perfilLink);
            const permissionCodeName: Array<string> = [];
            const fetchPermissions = perfil.data.permissions.map(async (permission: string) => {
              const response = await axiosInstance.get(permission);
              permissionCodeName.push(response.data.codename);
            });

            await Promise.all(fetchPermissions);
            perfisNamePermissions[perfil.data.name] = permissionCodeName;
          });

          await Promise.all(fetchPerfis);

          if (user.data.is_superuser) {
            perfisNamePermissions['SUPER USUÁRIO'] = ['SUPER USUÁRIO'];
          }

          setPerfis(perfisNamePermissions);
        } catch {
          logout();
        }
      } else {
        logout();
      }
    };

    fetchPerfisData();
  }, []);

  return getPerfis;
};

export default perfisObject;
