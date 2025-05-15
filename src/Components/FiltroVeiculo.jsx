import React, { useState } from "react";
import axios from 'axios';
import "../App.css"

const FiltroVeiculo = ({ setVeiculos }) => {
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [status, setStatus] = useState("");
    const [precoMax, setPrecoMax] = useState("");
    const [ano, setAno] = useState("");

    const filtrarVeiculo = async () => {
        try {
            const params = {
                marca: marca || undefined,
                modelo: modelo || undefined,
                ano: ano || undefined,
                precoMax: precoMax || undefined,
                status: status || undefined,
            };

            const response = await axios.get("http://localhost:8080/veiculos/filtrar", { 
                params,
                paramsSerializer: params => {
                    return Object.entries(params)
                        .filter(([_, value]) => value !== undefined)
                        .map(([key, value]) => `${key}=${value}`)
                        .join('&');
                }
            });


            setMarca("");
            setModelo("");
            setStatus("");
            setPrecoMax("");
            setAno("");

            setVeiculos(response.data);
        } catch (error) {
            console.error("Falha ao filtrar veículos:", error);
        }
    };

    return (
        <div style={styles.filterContainer}>
            <h2 style={styles.h2}>Central de filtragem</h2>
            <input
                style={styles.input}
                type="text"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                placeholder="Marca"
            />
            <input
                style={styles.input}
                type="text"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                placeholder="Modelo"
            />
            <input
                style={styles.input}
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Status"
            />
            <input
                style={styles.input}
                type="number"
                value={precoMax}
                onChange={(e) => setPrecoMax(e.target.value)}
                placeholder="Preço Máximo"
            />
            <input
                style={styles.input}
                type="number"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                placeholder="Ano"
            />
            <button onClick={filtrarVeiculo}>Filtrar</button>
        </div>
    );
};

const styles = {
    filterContainer: {
        backgroundColor: '#333',
        display: "Block",
        maxWidth: '60%',
        alignItems: "center",
        borderRadius: '10px',
        paddingLeft: '50px',
        paddingTop: '5px',
        paddingBottom: '5px',
        margin: "auto",
        marginTop: "20%",
        justifyContent: "center"
    },

    input: {
        maxWidth: "12%"
    },

    h2: {
        margin: "auto",
        color: "#f39c12"
    }
}



export default FiltroVeiculo;