const BotoesCadastra = ({ onClick }) => {
    return (
        <button style={styles.button} onClick={onClick}>
            Cadastrar Veículo
        </button>
        
    );
};

const styles = {
    button: {
        padding: '10px',
        height: '50px',
        width: '180px',
        cursor: 'pointer',
        fontWeight: 'bold'
    }
};

export default BotoesCadastra;
