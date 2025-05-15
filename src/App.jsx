import React, { useState, useEffect } from 'react';
import FormularioEdicao from './Components/FormularioEdicao';
import ListaVeiculos from './Components/ListaVeiculos';
import CadastraVeiculo from './Components/CadastraVeiculo';
import CadastraModelo from './Components/CadastraModelo';
import CadastraMarca from './Components/CadastraMarca';
import FiltroVeiculo from './Components/FiltroVeiculo'; 
import axios from 'axios';
import Cabecalho from './Components/Cabecalho';

function App() {
  const [veiculos, setVeiculos] = useState([]);
  const [veiculoEditando, setVeiculoEditando] = useState(null);
  const [mostrarModalVeiculo, setMostrarModalVeiculo] = useState(false);
  const [mostrarModalMarca, setMostrarModalMarca] = useState(false);
  const [mostrarModalModelo, setMostrarModalModelo] = useState(false);


  const carregarVeiculos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/veiculos");
      setVeiculos(response.data);
    } catch (error) {
      console.error("Erro ao carregar veículos:", error);
    }
  };

  const atualizarVeiculo = async (veiculoAtualizado) => {
    try {
      await axios.put(`http://localhost:8080/veiculos/${veiculoAtualizado.id}`, veiculoAtualizado);
      setVeiculoEditando(null);

      if (veiculoAtualizado.statusDisponibilidade === "VENDIDO") {
        await axios.delete(`http://localhost:8080/veiculos/${veiculoAtualizado.id}`);
        setVeiculos((prev) => prev.filter(v => v.id !== veiculoAtualizado.id));
      } else {
        setVeiculos((prev) =>
          prev.map((v) => (v.id === veiculoAtualizado.id ? veiculoAtualizado : v))
        );
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
      <Cabecalho
        onCadastrarVeiculo={() => setMostrarModalVeiculo(true)}
        onCadastrarMarca={() => setMostrarModalMarca(true)}
        onCadastrarModelo={() => setMostrarModalModelo(true)}
      />

      <FiltroVeiculo setVeiculos={setVeiculos} />

      <ListaVeiculos
        veiculos={veiculos}
        onEdit={(veiculo) => setVeiculoEditando(veiculo)}
        onDelete={excluirVeiculo}
      />

      <CadastraMarca
        mostrarModal={mostrarModalMarca}
        setMostrarModal={setMostrarModalMarca}
        aoCadastrar={carregarVeiculos}
      />

      <CadastraModelo
        mostrarModal={mostrarModalModelo}
        setMostrarModal={setMostrarModalModelo}
        aoCadastrar={carregarVeiculos}
      />


      <CadastraVeiculo
        mostrarModal={mostrarModalVeiculo}
        setMostrarModal={setMostrarModalVeiculo}
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
