import React from "react";
import authenticationVerify from "../../services/authenticationVerify";

const Perfis: React.FC = () => {
  const accessStatus = authenticationVerify('/login');
  const userId = localStorage.getItem('userId');
  const access = localStorage.getItem('access')
  console.log(userId);

  // api.get(`/api/users/${userId}`)
  // .then(result => {
  //   const perfis = result.data.groups
  //   console.log(perfis)
  //   const api_with_url = new Api(result.data.groups)
  //   let perfis = []
  //   for (let i = 0; i < perfis.length; i++) {
  //     console.log(perfis[i])
  //   }
  //   })

  if (accessStatus === 200) {
    return (
      <>
      <h1>passou</h1>
      </>
    )
  }
  }

export default Perfis;
