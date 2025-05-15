import logo from '../assets/gran-auto.png';

const Cabecalho = ({ onCadastrarVeiculo, onCadastrarMarca, onCadastrarModelo}) => {
    return (
       <header style={styles.header}>
            <img 
                src={logo} 
                alt="Logo Gran Auto" 
                style={styles.logo} 
            />
            <h1 style={styles.h1}>Concessionária Gran Auto</h1>
            <div style={styles.botoes}>
                <button style={styles.button} onClick={onCadastrarMarca}>
                    Cadastrar Marca
                </button>
                <button style={styles.button} onClick={onCadastrarModelo}>
                    Cadastrar Modelo
                </button>
                <button style={styles.button} onClick={onCadastrarVeiculo}>
                    Cadastrar Veículo
                </button>
            </div>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 40px',
        backgroundColor: '#171717',        
        boxShadow: '0 2px 8px rgba(0,0,0,0.5)', 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '80px'
    },
    logo: {
        width: '120px',
        objectFit: 'contain'
    },

    h1: {
        color: "#f39c12"
    }
};

export default Cabecalho;
