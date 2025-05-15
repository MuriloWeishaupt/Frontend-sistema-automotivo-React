import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const CadastraVeiculo = ({ mostrarModal, setMostrarModal, aoCadastrar }) => {
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
    if (mostrarModal) {
      axios.get("http://localhost:8080/marca")
        .then((res) => setMarcas(res.data))
        .catch((err) => console.error("Erro ao buscar marcas", err));
    }
  }, [mostrarModal]);

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


      setPlaca("");
      setAno("");
      setCor("");
      setPreco("");
      setQuilometragem("");
      setStatus("");
      setMarcaSelecionada("");
      setModeloSelecionado("");


      setMostrarModal(false);
      aoCadastrar();

    } catch (error) {
      console.error("Erro ao cadastrar veículo", error);
      alert("Erro ao cadastrar veículo.");
    }
  };

  return (
    <>
      {mostrarModal && (
        <div className="modal">
          <form onSubmit={handleSubmit} className="form-cadastro">
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
              <option value="DISPONÍVEL">DISPONÍVEL</option>
              <option value="RESERVADO">RESERVADO</option>
              <option value="MANUTENÇÃO">MANUTENÇÃO</option>
            </select>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button style={styles.button} type="submit">Cadastrar</button>
              <button style={styles.fechar} type="button" onClick={() => setMostrarModal(false)}>Fechar</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

const styles = {
  button: {
    backgroundColor: "#f39c12",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: "bold",
    width: "30%"
  },
  fechar: {
    backgroundColor: "#f39c12",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: "bold"
  }
};

export default CadastraVeiculo;
