import Input from "./Input";
import Select from "./Select";
import '../css/components/Field.css';

const Field = ({ children, label, ...props }) => {
    return(
        <div className="field-container">
            <label>{label}</label>
            {children == undefined ?
                <Input {...props}/> :
                <Select {...props}>{children}</Select>
            }
        </div>
    )
};

export default Field;