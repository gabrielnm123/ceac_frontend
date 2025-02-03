
import React, { useState, useEffect } from "react";
import { Table, Input, Button, message, Spin } from "antd";
import axiosInstance from "../../services/axiosInstance";
import "./css/ManageUser.css";

const ManageUser: React.FC = () => {
  const [loading, setLoading] = useState(false);
  interface User {
    id: number;
    username: string;
    email: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("users/");
        setUsers(response.data);
      } catch (error) {
        message.error("Erro ao carregar usuários.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = () => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filtered);
  };

  return (
    <div className="search-user-container">
      <Spin spinning={loading} tip="Carregando...">
        <Input
          placeholder="Buscar usuário"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-user-input"
        />
        <Button onClick={handleSearch} type="primary" className="search-user-button">
          Buscar
        </Button>
        <Table
          dataSource={users}
          rowKey="id"
          columns={[
            { title: "Nome de Usuário", dataIndex: "username" },
            { title: "Email", dataIndex: "email" },
          ]}
        />
      </Spin>
    </div>
  );
};

export default ManageUser;
