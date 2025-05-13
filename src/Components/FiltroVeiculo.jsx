import React, { useState } from "react";
import axios from 'axios';

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
        <div style={styles.container}>
            <input
                type="text"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                placeholder="Marca"
            />
            <input
                type="text"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                placeholder="Modelo"
            />
            <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Status"
            />
            <input
                type="number"
                value={precoMax}
                onChange={(e) => setPrecoMax(e.target.value)}
                placeholder="Preço Máximo"
            />
            <input
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
    container: {
        display: 'flex',
        gap: '10px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        marginBottom: '20px'
    }
};

export default FiltroVeiculo;