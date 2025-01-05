import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, Table, message, Modal, Descriptions, Popconfirm, Typography, Spin } from 'antd';
import MaskedInput from 'antd-mask-input';
import axiosInstance from "../../services/axiosInstance";
import dayjs from 'dayjs';
import type { modulosCapacitaType } from "../../types";
import { formToJSON } from "axios";

const SearchPerfil = () => {
  const [form] = Form.useForm();

  const onFinish = () => {}

  return (
    <>
      <div className="search-perfil">
        <Form form={form} className="form-search-perfil" onFinish={onFinish}>
          <div className="form-perfil-ficha-minus-button">
            <Form.Item label='Nome do Perfil' name='nome-perfil' className="form-search-perfil-nome-perfil form-search-perfil-item">
              <Input onChange={e => form.setFieldValue('nome-perfil', e.target.value.toUpperCase())} />
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  )
}

export default SearchPerfil;
