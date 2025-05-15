import React, { useState } from "react";
import Cabecalho from "./Cabecalho";
import CadastraVeiculo from "./CadastraVeiculo";
import BotaoCadastra from "./BotoesCadastra";

const PainelVeiculos = () => {
    const [mostrarModal, setMostrarModal] = useState(false);

    return (
        <div>
            <Cabecalho />
            <div style={{ marginTop: "80px", padding: "20px" }}>
                <BotaoCadastra onClick={() => setMostrarModal(true)} />
                <CadastraVeiculo mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} />
            </div>
        </div>
    );
};

export default PainelVeiculos;
