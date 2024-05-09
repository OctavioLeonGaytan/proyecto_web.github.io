import useIcon, { constantes as iconsContantes } from "../hooks/useIcon";

import '../css/components/ButtonPlus.css';

const ButtonPlus = ({ ...props }) => {

    const plusIcon = useIcon({ icon: iconsContantes.PLUS, color: '#FFFFFF' });

    return (
        <button className="button-plus" {...props}>
            {plusIcon}
        </button>
    );
}

export default ButtonPlus;