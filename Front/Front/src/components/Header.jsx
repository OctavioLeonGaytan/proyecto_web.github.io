import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/useUserData';
import useIcon, { constantes as iconsContantes } from '../hooks/useIcon';
import useString, { constantes as stringConstantes } from '../hooks/useString';

import '../css/components/Header.css';

const Header = () => {

    const navigate = useNavigate();
    const userData = useUserData();
    const userIcon = useIcon({ icon: iconsContantes.USER, color: '#DCE1EE' });
    const userFilledIcon = useIcon({ icon: 'userFilled', color: '#DCE1EE' });
    const logOutIcon = useIcon({ icon: 'logOut', color: '#D22030' });

    const capitalize = useString(stringConstantes.CAPITALIZE);

    const [ state, setState ] = useState({
        userData: userData ? userData.userData : undefined,
        userModalOpen: false,
        signOut: false
    });

    const userModalClassName = state.userModalOpen ? 'user-modal-open' : 'user-modal-closed';
    const auxCoverClassName = state.userModalOpen ? 'header-aux-cover-open' : 'header-aux-cover'; 

    useEffect(() => {
        //Valida que el usuario tenga iniciado sesion y de ser así redirige a inicio de sesión
        !userData
            ?   navigate('/inicio-sesion')
            :   null;
    });

    useEffect(() => {
        const signOut = () => {
            localStorage.removeItem('comtecUser');
            navigate('/inicio-sesion');
        }

        state.signOut
            ?   signOut()
            :   null;

    }, [state.signOut]);

    return (
        <header className="header">
            <div className='header-content-container'>
                <div className='header-logo-container' onClick={() => navigate('/dashboard')}>
                    <img src='https://www.cancun.tecnm.mx/wp-content/themes/itcancun/img/mobilelogo.png'/>
                </div>
                <div className='header-elements-container'>
                    <div className='header-user-elements-container' onClick={() => setState({ ...state, userModalOpen: !state.userModalOpen })}>
                        <div className='header-user-elements'>
                                {state.userData
                                    ?   <div className='header-user-info-container'> 
                                            <span>{capitalize(`${state.userData.nombre} ${state.userData.apellidoPaterno}`)}</span>
                                        </div>
                                    :   null
                                } 
                            <div className='header-user-photo'>
                                    {userIcon}
                            </div>
                            {state.userModalOpen
                                ?   <div className={userModalClassName}>
                                        <div className='header-modal-element-container'>
                                            <div className='header-modal-element-icon-container'>
                                                {userFilledIcon}
                                            </div>
                                            <p>Perfil</p>
                                        </div>
                                        <div className='header-modal-element-container header-modal-sign-out-container' onClick={() => setState({ ...state, signOut: true })}>
                                            <div className='header-modal-element-icon-container'>
                                                {logOutIcon}
                                            </div>
                                            <p>Cerrar sesión</p>
                                        </div>
                                    </div>
                                :   null
                            }
                            
                        </div>
                    </div>
                    <button className='header-sign-out-container' onClick={() => setState({ ...state, signOut: true })}>
                        <div className='header-sign-out-icon-container'>
                            {logOutIcon}
                        </div>
                        <span>Cerrar sesión</span>
                    </button>
                    <div className={auxCoverClassName} onClick={() => setState({ ...state, userModalOpen: !state.userModalOpen })}></div>
                </div>
            </div>
        </header>
    );
}

export default Header;