import React, { useState } from "react";
import axios from "axios";

const CadastraMarca = ({ mostrarModal, setMostrarModal, aoCadastrar }) => {
  const [nomeMarca, setNomeMarca] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/marca", { nome: nomeMarca });
      alert("Marca cadastrada com sucesso!");
      setNomeMarca("");
      setMostrarModal(false);
      aoCadastrar();
    } catch (error) {
      console.error("Erro ao cadastrar marca", error);
      alert("Erro ao cadastrar marca.");
    }
  };

  return (
    <>
      {mostrarModal && (
        <div className="modal">
          <form onSubmit={handleSubmit} className="form-cadastro">
            <h2>Cadastrar Marca</h2>
            <input
              value={nomeMarca}
              onChange={(e) => setNomeMarca(e.target.value)}
              placeholder="Nome da Marca"
              required
            />
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

export default CadastraMarca;
