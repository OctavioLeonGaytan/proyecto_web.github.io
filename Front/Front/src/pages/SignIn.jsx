import { useState, useEffect } from 'react';
import useServer from '../hooks/api/useServer';
import { Formik, Form } from 'formik';
import { useNavigate, Link } from 'react-router-dom'

import Field from '../components/Field';
import Button from '../components/Button';
import ErrorLabel from '../components/ErrorLabel';

import useApiUsers, { constantes as apiUsersConstantes } from '../hooks/api/useApiUsers';

import '../css/pages/SignIn.css';

const SignIn = () => {

    const { urlRecursosBase } = useServer();
    const navigate = useNavigate();

    const signIn = useApiUsers(apiUsersConstantes.SIGN_IN);

    document.title = 'Iniciar Sesion | Comtec';

    const [state, setState] = useState({
        errorLogin: false,
        userCredentials: undefined,
    });

    //Contiene todas las validaciones de los campos del formulario
    const validate = values => {
        const errors = {}

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!values.email) {
            errors.email = {
                errorMessage: 'El correo es requerido',
                errorPrimary: false
            }
        } else if (!emailRegex.test(values.email)) {
            errors.email = { 
                errorMessage: 'Formato de correo invalido',
                errorPrimary: true
            } 
        }

        if(!values.password) {
            errors.password = {
                errorMessage: 'La contraseña es requerida',
                errorPrimary: false
            } 
        } else if(values.password.length < 8) {
            errors.password = {
                errorMessage: 'La contraseña debe tener una longitud minima de 8',
                errorPrimary: true
            }
        }

        return errors;
    } 

    //Usado para validar si la sesión esta iniciada
    useEffect(() => {
        if(localStorage.getItem('comtecUser')) {
            navigate('/dashboard');
        }
    });

    useEffect(() => {
        const signInSubmit = async () => {
            const response = await signIn(state.userCredentials.email, state.userCredentials.password);

            if(response.ok) {
                const data = await response.json();

                localStorage.setItem('comtecUser', JSON.stringify(data));
                navigate('/dashboard');
            } else {
                response.status == 401 || response.status == 404
                    ?   setState({ ...state, errorLogin: true })
                    :   null
            }
        }

        state.userCredentials
            ?   signInSubmit()
            :   null;

    }, [state.userCredentials]);

    return (
        <div className="sign-main-container" style={{backgroundImage: `url('${urlRecursosBase}/images/degraded-background.png')`}}>
            <main className='main-sign-container'>
                <div className='sign-form-container'>
                    <div className='sign-form-container-logo-container'>
                        <img src='https://f07e0fc768.cbaul-cdnwnd.com/8bc1795bfc55e1082ab1298203a38b5f/200000000-860cf87047/50000000.png?ph=f07e0fc768' />
                    </div>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validate={validate}
                        onSubmit={values => setState({ ...state, userCredentials: { email: values.email, password: values.password } })}
                    >
                        {({ values }) => {
                            return (
                                <Form>
                                    {state.errorLogin
                                        ?   <div className='sign-in-error-label-container'>
                                                <ErrorLabel>Usuario o contraseña incorrectos</ErrorLabel>
                                            </div>
                                        :   null
                                    }
                                    <div className='sign-inputs-container'>
                                        <Field
                                            name='email'
                                            type='email'
                                            label='Correo'
                                            placeholder='Correo electrónico'
                                        />
                                        <Field
                                            name='password'
                                            type='password'
                                            label='Contraseña'
                                            placeholder='Contraseña'
                                        />
                                        <Button type='submit'>Iniciar Sesión</Button>
                                        <Link to='#'>¿No estas registrado aún?</Link>
                                    </div>
                                </Form>
                            );
                        }} 
                    </Formik> 
                </div>
            </main>
        </div>
    );
}

export default SignIn;