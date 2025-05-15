import React, { useState, useEffect } from 'react';


const FormularioEdicao = ({ veiculo, onAtualizar, onCancelar }) => {
  const [formData, setFormData] = useState({
    marca: veiculo.modelo?.marca?.nome || "",
    modelo: veiculo.modelo?.nome || "",
    ano: veiculo.ano || "",
    preco: veiculo.preco || "",
    statusDisponibilidade: veiculo.statusDisponibilidade || "",
  });

  useEffect(() => {
    setFormData({
      marca: veiculo.modelo?.marca?.nome || "",
      modelo: veiculo.modelo?.nome || "",
      ano: veiculo.ano || "",
      preco: veiculo.preco || "",
      statusDisponibilidade: veiculo.statusDisponibilidade || "",
    });
  }, [veiculo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const veiculoAtualizado = {
      ...veiculo,
      ano: Number(formData.ano),
      preco: Number(formData.preco),
      statusDisponibilidade: formData.statusDisponibilidade,
      modelo: {
        ...veiculo.modelo,
        nome: formData.modelo,
        marca: {
          ...veiculo.modelo?.marca,
          nome: formData.marca
        }
      }
    };

    onAtualizar(veiculoAtualizado);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3>Editar Veículo</h3>
      <input name="marca" value={formData.marca} onChange={handleChange} placeholder="Marca" />
      <input name="modelo" value={formData.modelo} onChange={handleChange} placeholder="Modelo" />
      <input name="ano" type="number" value={formData.ano} onChange={handleChange} placeholder="Ano" />
      <input name="preco" type="number" value={formData.preco} onChange={handleChange} placeholder="Preço" />
      <select
        name="statusDisponibilidade"
        value={formData.statusDisponibilidade}
        onChange={handleChange}
        style={selectStyle}
      >
        <option value="">Selecione o status</option>
        <option value="DISPONÍVEL">DISPONÍVEL</option>
        <option value="VENDIDO">VENDIDO</option>
        <option value="MANUTENÇÃO">MANUTENÇÃO</option>
        <option value="RESERVADO">RESERVADO</option>
      </select>
      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancelar}>Cancelar</button>
    </form>
  );
};

const formStyle = {
  backgroundColor: "#1f1f1f",
  padding: "20px",
  borderRadius: "8px",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  maxWidth: "400px",
  margin: "50px auto",
};

const selectStyle = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #444",
};

export default FormularioEdicao;
