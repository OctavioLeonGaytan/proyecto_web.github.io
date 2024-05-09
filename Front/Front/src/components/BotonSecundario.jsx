import '../css/components/BotonSecundario.css';

const BotonSecundario = ({ children, ...rest }) => {
    return (
        <button className="boton-secundario" {...rest}>
            {children}
        </button>
    );
}

export default BotonSecundario;