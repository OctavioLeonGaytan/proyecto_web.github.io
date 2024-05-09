import '../css/components/ErrorMessage.css';

const ErrorMessage = ({ children }) => {
    return <span className="error-message">{children}</span>
};

export default ErrorMessage;