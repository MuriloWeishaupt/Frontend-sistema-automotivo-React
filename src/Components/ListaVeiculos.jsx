import React, { useState } from "react";
import "../App.css";

const ListaVeiculos = ({ veiculos, onEdit, onDelete }) => {

  console.log(veiculos)

  return (
    <div style={styles.container}>
      {veiculos.length === 0 ? (
        <p style={styles.mensagem}>Nenhum veículo encontrado!</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Marca</th>
              <th style={styles.th}>Modelo</th>
              <th style={styles.th}>Ano</th>
              <th style={styles.th}>Cor</th>
              <th style={styles.th}>Placa</th>
              <th style={styles.th}>Preço</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {veiculos.map((veiculo) => (
              <tr key={veiculo.id}>
                <td style={styles.td}>
                  {veiculo.modelo?.marca?.nome || "N/A"}
                </td>
                <td style={styles.td}>
                  {veiculo.modelo?.nome || "N/A"}
                </td>
                <td style={{ ...styles.td, textAlign: "right" }}>{veiculo.ano}</td>
                <td style={{ ...styles.td, textAlign: "right" }}>{veiculo.cor}</td>
                <td style={{ ...styles.td, textAlign: "right" }}>{veiculo.placa}</td>
                <td style={{ ...styles.td, textAlign: "right" }}>
                  {Number(veiculo.preco).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td style={{ ...styles.td, color: getStatusColor(veiculo.statusDisponibilidade) }}>
                  {veiculo.statusDisponibilidade}
                </td>
                <td>
                  <button onClick={() => onEdit(veiculo)}>Editar</button>
                  <button onClick={() => onDelete(veiculo.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: "-20%",
    backgroundColor: "#121212",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "800px",
    margin: "40px auto",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    color: "#fff",
  },

  mensagem: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#aaa",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#1f1f1f",
    color: "#f39c12",
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #333",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #444",
  },
};

const getStatusColor = (status) => {
  if (!status) return "white";
  switch (status.toLowerCase()) {
    case "disponivel":
      return "limegreen";
    case "vendido":
      return "crimson";
    case "manutenção":
      return "orange";
    case "reservado":
      return "white"
    default:
      return "limegreen";
  }
};

export default ListaVeiculos;
