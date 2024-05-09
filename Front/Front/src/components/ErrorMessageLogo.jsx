import ErrorMessage from '../components/ErrorMessage';
import useIcon from '../hooks/useIcon';
import '../css/components/ErrorMessageLogo.css';

const ErrorMessageLogo = ({children}) => {
    const ulsaIcon = useIcon({ icon: 'gears', color: '#DCE1EE' });
    return (
        <div className='error-message-container'>
            <ErrorMessage>{children}</ErrorMessage>
            <div className='error-message-logo-container'>
                {ulsaIcon}
            </div>
        </div>
    )
};

export default ErrorMessageLogo;