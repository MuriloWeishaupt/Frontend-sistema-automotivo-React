import React, { useEffect, useState } from "react";
import axios from "axios";

const CadastraVeiculo = () => {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState("");
  const [modeloSelecionado, setModeloSelecionado] = useState("");

  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const [preco, setPreco] = useState("");
  const [quilometragem, setQuilometragem] = useState("");
  const [status, setStatus] = useState("");


  useEffect(() => {
    axios.get("http://localhost:8080/marca")
      .then((res) => setMarcas(res.data))
      .catch((err) => console.error("Erro ao buscar marcas", err));
  }, []);


  useEffect(() => {
    if (marcaSelecionada) {
        axios.get(`http://localhost:8080/modelos/marca/${marcaSelecionada}`)
        .then((res) => setModelos(res.data))
        .catch((err) => console.error("Erro ao buscar modelos", err));
    } else {
      setModelos([]);
    }
  }, [marcaSelecionada]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/veiculos", {
        placa,
        ano: parseInt(ano),
        cor,
        preco: parseFloat(preco),
        quilometragem: parseFloat(quilometragem),
        statusDisponibilidade: status,
        modelo: { id: parseInt(modeloSelecionado) },
      });

      alert("Veículo cadastrado com sucesso!");
      setPlaca(""); setAno(""); setCor(""); setPreco("");
      setQuilometragem(""); setStatus(""); setMarcaSelecionada("");
      setModeloSelecionado("");
    } catch (error) {
      console.error("Erro ao cadastrar veículo", error);
      alert("Erro ao cadastrar veículo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Cadastrar Veículo</h2>

      <select value={marcaSelecionada} onChange={(e) => setMarcaSelecionada(e.target.value)} required>
        <option value="">Selecione a Marca</option>
        {marcas.map((marca) => (
          <option key={marca.id} value={marca.id}>{marca.nome}</option>
        ))}
      </select>

      <select value={modeloSelecionado} onChange={(e) => setModeloSelecionado(e.target.value)} required>
        <option value="">Selecione o Modelo</option>
        {modelos.map((modelo) => (
          <option key={modelo.id} value={modelo.id}>{modelo.nome}</option>
        ))}
      </select>

      <input value={placa} onChange={(e) => setPlaca(e.target.value)} placeholder="Placa" required />
      <input type="number" value={ano} onChange={(e) => setAno(e.target.value)} placeholder="Ano" required />
      <input value={cor} onChange={(e) => setCor(e.target.value)} placeholder="Cor" required />
      <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Preço" required />
      <input type="number" value={quilometragem} onChange={(e) => setQuilometragem(e.target.value)} placeholder="Quilometragem" required />

      <select value={status} onChange={(e) => setStatus(e.target.value)} required>
        <option value="">Status</option>
        <option value="Disponivel">Disponível</option>
        <option value="Reservado">Reservado</option>
        <option value="Manutencao">Manutenção</option>
      </select>

      <button type="submit">Cadastrar</button>
    </form>
  );
};

const formStyle = {
  backgroundColor: "#1f1f1f",
  color: "#fff",
  padding: "20px",
  borderRadius: "10px",
  maxWidth: "500px",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

export default CadastraVeiculo;
