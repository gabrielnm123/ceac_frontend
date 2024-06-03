import React from "react";
import authenticationVerify from "../../services/authenticationVerify";
import Api from "../../services/api";

const Perfis: React.FC = () => {
  const accessStatus = authenticationVerify('/login');
  const api = new Api;
  const userId = localStorage.getItem('userId');
  
  api.get(`/api/users/${userId}`)
  .then(result => {
    const perfis_urls = result.data.groups
    // const api_with_url = new Api(result.data.groups)
    let perfis = []
    for (let i = 0; i < perfis_urls.length; i++) {
      
    }
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
