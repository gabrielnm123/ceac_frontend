import { useEffect, useState } from "react";
import { axiosInstance } from "./axiosInstance";
import { logout } from "./axiosInstance";

const perfisObject = () => {
  const [getPerfis, setPerfis] = useState<{ [key: string]: Array<string> } | { [key: string]: null }>({ 'null': null });
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      axiosInstance.get(`users/${userId}/`)
        .then(user => {
          const perfisLinks = user.data.groups;
          const perfisNamePermissions: { [key: string]: Array<string> } = {};

          const fetchPerfis = perfisLinks.map((perfilLink: string) => {
            return axiosInstance.get(perfilLink)
              .then(perfil => {
                const permissionCodeName: Array<string> = [];
                const fetchPermissions = perfil.data.permissions.map((permission: string) => {
                  return axiosInstance.get(permission)
                    .then(response => {
                      permissionCodeName.push(response.data.codename);
                    });
                });

                return Promise.all(fetchPermissions)
                  .then(() => {
                    perfisNamePermissions[perfil.data.name] = permissionCodeName;
                  });
              });
          });

          Promise.all(fetchPerfis)
            .then(() => {
              if (user.data.is_superuser) {
                perfisNamePermissions['SUPER USUÁRIO'] = ['SUPER USUÁRIO'];
              }
              setPerfis(perfisNamePermissions);
            });
        })
    } else {
      logout();
    }
  }, []);

  return getPerfis;
};

export default perfisObject;
