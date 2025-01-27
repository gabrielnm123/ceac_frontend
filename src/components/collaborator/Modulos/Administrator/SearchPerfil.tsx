
import React, { useState, useEffect } from "react";
import { Table, Input, Button, message, Spin } from "antd";
import axiosInstance from "../../services/axiosInstance";
import "./css/SearchPerfil.css";

const SearchPerfil: React.FC = () => {
  const [loading, setLoading] = useState(false);
  interface Profile {
    id: number;
    name: string;
  }

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("profiles/");
        setProfiles(response.data);
      } catch (error) {
        message.error("Erro ao carregar perfis.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const handleSearch = () => {
    const filtered = profiles.filter((profile) =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProfiles(filtered);
  };

  return (
    <div className="search-perfil-container">
      <Spin spinning={loading} tip="Carregando...">
        <Input
          placeholder="Buscar perfil"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-perfil-input"
        />
        <Button onClick={handleSearch} type="primary" className="search-perfil-button">
          Buscar
        </Button>
        <Table dataSource={profiles} rowKey="id" columns={[{ title: "Nome", dataIndex: "name" }]} />
      </Spin>
    </div>
  );
};

export default SearchPerfil;
