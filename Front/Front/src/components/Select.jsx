import { useField } from "formik";
import ErrorLabel from "./ErrorLabel";
import '../css/components/Select.css';

const Select = ({ ...props }) => {
    const [ field, meta ] = useField(props);
    const className = meta.error && meta.touched ? `select select-error` : 'select';

    return(
        <div>
            <select className={className} {...field} {...props}/>
            {meta.touched && meta.error 
                ? <ErrorLabel>{meta.error.errorMessage}</ErrorLabel>
                : null
            }
        </div>
    );
};

export default Select;