import { useField } from 'formik';
import ErrorLabel from './ErrorLabel';
import '../css/components/Input.css';

const Input = ({ ...props }) => {
    const [field, meta] = useField(props)
    const className = meta.error && meta.touched ? `login-input input-error` : 'login-input' 
    
    return (
        <div>
            <input className={className} {...field} {...props}/>
            {meta.touched && meta.error && !meta.error.errorPrimary
                ? <ErrorLabel>{meta.error.errorMessage}</ErrorLabel>
                : null
            }
            {meta.error && meta.error.errorPrimary
                ? <ErrorLabel>{meta.error.errorMessage}</ErrorLabel>
                : null
            }
        </div>
    )
}

export default Input