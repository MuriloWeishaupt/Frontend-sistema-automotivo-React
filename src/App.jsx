import React, { useState, useEffect } from 'react';
import FormularioEdicao from './Components/FormularioEdicao';
import ListaVeiculos from './Components/ListaVeiculos';
import CadastraVeiculo from './Components/CadastraVeiculo';
import FiltroVeiculo from './Components/FiltroVeiculo'; 
import axios from 'axios';
import Cabecalho from './Components/Cabecalho';

function App() {
  const [veiculos, setVeiculos] = useState([]);
  const [veiculoEditando, setVeiculoEditando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false); 

  const carregarVeiculos = async () => {
    const response = await axios.get("http://localhost:8080/veiculos");
    setVeiculos(response.data);
  };

  const atualizarVeiculo = async (veiculoAtualizado) => {
    try {
      await axios.put(`http://localhost:8080/veiculos/${veiculoAtualizado.id}`, veiculoAtualizado);
      setVeiculoEditando(null);
      if (veiculoAtualizado.statusDisponibilidade === "VENDIDO") {
        await axios.delete(`http://localhost:8080/veiculos/${veiculoAtualizado.id}`);
        setVeiculos((prev) => prev.filter(v => v.id !== veiculoAtualizado.id));
      } else {
        setVeiculos((prev) => prev.map(v => v.id === veiculoAtualizado.id ? veiculoAtualizado : v));
      }

    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
    }
  };

  const excluirVeiculo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/veiculos/${id}`);
      carregarVeiculos();
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
    }
  };

  useEffect(() => {
    carregarVeiculos();
  }, []);

  return (
    <div>
      <Cabecalho onCadastrarClick={() => setMostrarModal(true)} />

      <FiltroVeiculo setVeiculos={setVeiculos} />
      <ListaVeiculos
        veiculos={veiculos}
        onEdit={(veiculo) => setVeiculoEditando(veiculo)}
        onDelete={excluirVeiculo}
      />
    
      <CadastraVeiculo 
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        aoCadastrar={carregarVeiculos}
      />
      
      {veiculoEditando && (
        <FormularioEdicao
          veiculo={veiculoEditando}
          onAtualizar={atualizarVeiculo}
          onCancelar={() => setVeiculoEditando(null)}
        />
      )}
    </div>
  );
}

export default App;
