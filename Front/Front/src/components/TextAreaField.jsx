import TextArea from './TextArea';
import '../css/components/Field.css';

const TextAreaField = ({ label, ...props }) => {
    return(
        <div className="field-container">
            <label>{label}</label>
            <TextArea {...props}/>
        </div>
    )
};

export default TextAreaField;