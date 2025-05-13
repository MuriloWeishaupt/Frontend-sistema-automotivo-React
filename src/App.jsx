import React, { useState, useEffect } from 'react';
import FormularioEdicao from './Components/FormularioEdicao';
import ListaVeiculos from './Components/ListaVeiculos';
import CadastraVeiculo from './Components/CadastraVeiculo';
import FiltroVeiculo from './Components/FiltroVeiculo'; 
import axios from 'axios';

function App() {
  const [veiculos, setVeiculos] = useState([]);
  const [veiculoEditando, setVeiculoEditando] = useState(null);

  const carregarVeiculos = async () => {
    const response = await axios.get("http://localhost:8080/veiculos");
    setVeiculos(response.data);
  };

  const atualizarVeiculo = async (veiculoAtualizado) => {
    try {
      await axios.put(`http://localhost:8080/veiculos/${veiculoAtualizado.id}`, veiculoAtualizado);
      setVeiculoEditando(null);
      carregarVeiculos();
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
      <h1 >Concessionária Gran Auto</h1>

      <CadastraVeiculo />
      <FiltroVeiculo setVeiculos={setVeiculos} />

      <ListaVeiculos
        veiculos={veiculos}
        onEdit={(veiculo) => setVeiculoEditando(veiculo)}
        onDelete={excluirVeiculo}
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
