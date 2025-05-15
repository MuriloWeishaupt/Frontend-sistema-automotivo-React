import React, { useState } from 'react';
import axios from 'axios';

const CadastraModelo = ({ mostrarModal, setMostrarModal, aoCadastrar }) => {
  const [nomeModelo, setNomeModelo] = useState('');

  const handleCadastrar = async () => {
    try {
      await axios.post('http://localhost:8080/modelos', { nome: nomeModelo });
      setNomeModelo('');
      setMostrarModal(false);
      aoCadastrar();
    } catch (error) {
      console.error('Erro ao cadastrar modelo:', error);
    }
  };

  if (!mostrarModal) return null;

  return (
    <div style={styles.modal}>
      <h2>Cadastrar Modelo</h2>
      <input
        type="text"
        placeholder="Nome do modelo"
        value={nomeModelo}
        onChange={(e) => setNomeModelo(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleCadastrar} style={styles.button}>
        Cadastrar
      </button>
      <button style={styles.fechar} type="button" onClick={() => setMostrarModal(false)}>Fechar</button>

    </div>
  );
};

const styles = {
  modal: {
    backgroundColor: '#333',
    padding: '20px',
    borderRadius: '10px',
    color: '#fff',
    zIndex: 1000,
    width: "30%",
    margin: "auto"
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    width: '90%',
    borderRadius: '5px',
    border: 'none',
  },
  button: {
    backgroundColor: '#f39c12',
    border: 'none',
    padding: '10px 15px',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: '5px',
    cursor: 'pointer',
    width: "40%",
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

export default CadastraModelo;
