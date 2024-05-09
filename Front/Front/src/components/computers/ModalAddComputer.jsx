import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import useIcon, { constantes as iconsContantes } from "../../hooks/useIcon";
import useApiDepartamets, { constants as apiDepartametsConstants} from '../../hooks/api/useApiDepartaments';
import useApiBranchs, { constants as apiBranchsConstants } from '../../hooks/api/useApiBranchs';
import useApiComputers, { constants as apiComputersConstants } from '../../hooks/api/useApiComputers';
import useUserData from '../../hooks/useUserData';

import ModalBlackCover from "../ModalBlackCover";
import Field from '../Field';
import Button from '../Button';
import Loader from '../Loader';
import ErrorMessageLogo from '../ErrorMessageLogo';

import { trademarksModels, processors, typesDrive, computerStatus } from '../../constants/computers';

import '../../css/components/computers/ModalAddComputer.css';

const ModalAddComputer = ({ closeEvent }) => {

    const xIcon = useIcon({ icon: iconsContantes.X_MARK, color: '#58627B' });
    const userData = useUserData();

    const getDepartaments = useApiDepartamets(apiDepartametsConstants.GET_DEPARTAMENTS);
    const getBranchs = useApiBranchs(apiBranchsConstants.GET_BRANCHS);
    const addComputer = useApiComputers(apiComputersConstants.ADD_COMPUTER);

    const [ state, setState ] = useState({
        branchs: undefined,
        departaments: undefined,

        addSucessfully: undefined,
        duplicatedNSOrHM: false,
    });

    const [ errorState, setErrorState ] = useState({
        error: false,
        errorMessage: undefined
    });

    const validate = values => {
        const errors = {};

        if(!values.Marca) {
            errors.Marca = {
                errorMessage: 'La Marca es requerida',
                errorPrimary: false
            }
        }

        if(!values.Modelo) {
            errors.Modelo = {
                errorMessage: 'El Modelo es requerido',
                errorPrimary: false
            }
        }

        if(!values.Numero_Serie) {
            errors.Numero_Serie = {
                errorMessage: 'El Numero de serie requerido',
                errorPrimary: false
            }
        }

        if(!values.Host_Name) {
            errors.Host_Name = {
                errorMessage: 'el Hostname requerido',
                errorPrimary: false
            }
        }

        if(!values.RAM) {
            errors.RAM = {
                errorMessage: 'La RAM es requerida',
                errorPrimary: false
            }
        }

        if(!values.Tipo_Almacenamiento) {
            errors.Tipo_Almacenamiento = {
                errorMessage: 'El tipo de almacenamiento es requerido',
                errorPrimary: false
            }
        }

        if(!values.Capacidad_Almacenamiento) {
            errors.Capacidad_Almacenamiento = {
                errorMessage: 'La Capacidad de almacenamiento es requerida',
                errorPrimary: false
            }
        }

        if(!values.Procesador) {
            errors.Procesador = {
                errorMessage: 'El Procesador es requerido',
                errorPrimary: false
            }
        }

        if(!values.Estado) {
            errors.Estado = {
                errorMessage: 'El Estado es requerido',
                errorPrimary: false
            }
        }

        if(!values.Departamento) {
            errors.Departamento = {
                errorMessage: 'El Departamento es requerido',
                errorPrimary: false
            }
        }

        return errors;
    }

    const loadCurrentModels = (values) => {
        const trademarkModel = trademarksModels.find(trademark => trademark.marca == values.Marca);
        if(!trademarkModel) {
            return []
        }

        return trademarkModel.modelos.map(model => {
            return (
                <option value={model} key={`models-computer-select-${model}`}>
                    {model}
                </option>
            )
        })
    }

    const loadDepartaments = (values) => {
        const departaments = state.departaments.filter(departament => departament.idSucursal == values.Plantel);

        if(!departaments) {
            return []
        }

        return departaments.map(departament => <option value={departament.id} key={`departamet-${departament.id}`}>{departament.Nombre}</option>)
    }

    const registerComputer = async (data) => {
        const resultAdd = await addComputer(userData.token, data);

        if(resultAdd.ok) {
            setState({
                ...state,
                addSucessfully: true,
                duplicatedNSOrHM: false,
            });

            setTimeout(() => {
                closeEvent();
            }, 1000);
        } else {

            if(resultAdd.status == 409) {
                setState({
                    ...state,
                    addSucessfully: false,
                    duplicatedNSOrHM: true,
                });
            } else {
                setState({
                    ...state,
                    addSucessfully: false,
                    duplicatedNSOrHM: false,
                });
            } 
        }
    }

    useEffect(() => {
        const loadData = async () => {
            const departaments = await getDepartaments(userData.token);
            if(!Array.isArray(departaments)) {
                setErrorState({
                    ...errorState,
                    error: true,
                    errorMessage: 'Error obteniendo la información de los departamentos, si persiste el problema contacte a soporte.'
                });
                return;
            }

            const branchs = await getBranchs(userData.token);
            if(!Array.isArray(branchs)) {
                setErrorState({
                    ...errorState,
                    error: true,
                    errorMessage: 'Error obteniendo la información de los planteles, si persiste el problema contacte a soporte.'
                });
                return;
            }

            setState({
                ...state,
                departaments,
                branchs
            });
        }
        
        loadData();
    }, []);

    const loadingData = !state.departaments || !state.branchs;

    return (
        <ModalBlackCover>
            <div className="modal-add-computer">
                <button className='button-close-modal' onClick={closeEvent}>
                    {xIcon}
                </button>
                <br/>
                <br/>
                <h2 className='titulo-modal'>Registrar computadora</h2>
                {errorState.error
                    ?   <ErrorMessageLogo>{errorState.errorMessage}</ErrorMessageLogo>
                    :   <>
                            {loadingData
                                ?   <Loader>Cargando...</Loader>
                                :   <>
                                        <div className='modal-add-computer-form-container'>
                                            <Formik
                                                initialValues={{
                                                    Marca: '',
                                                    Modelo: '',
                                                    Numero_Serie: '',
                                                    Host_Name: '',
                                                    RAM: '',
                                                    Tipo_Almacenamiento: '',
                                                    Capacidad_Almacenamiento: '',
                                                    Procesador: '',
                                                    Estado: '',
                                                    Plantel: '',
                                                    Departamento: '',
                                                }}
                                                validate={validate}
                                                onSubmit={values => registerComputer({ ...values })}
                                            >
                                                {({ values }) => {
                                                    return (
                                                        <Form>
                                                                <Field
                                                                    name='Marca'
                                                                    label='Marca'
                                                                >
                                                                    <option value=''>---Seleccionar---</option>
                                                                    {trademarksModels.map(trademark => {
                                                                        return (
                                                                            <option value={trademark.marca} key={`trademark-computer-select-${trademark.marca}`}>
                                                                                {trademark.marca}
                                                                            </option>
                                                                        )
                                                                    })}
                                                                </Field>
                                                                <Field
                                                                    name='Modelo'
                                                                    label='Modelo'
                                                                >
                                                                    <option value=''>---Seleccionar---</option>
                                                                    {loadCurrentModels(values)} 
                                                                </Field>
                                                                <Field
                                                                    name='Numero_Serie'
                                                                    type='text'
                                                                    label='Numero de serie'
                                                                    placeholder='Numero de serie'
                                                                />
                                                                <Field
                                                                    name='Host_Name'
                                                                    type='text'
                                                                    label='Hostname'
                                                                    placeholder='Hostname'
                                                                />
                                                                <Field
                                                                    name='RAM'
                                                                    type='number'
                                                                    label='RAM (GB)'
                                                                    placeholder='RAM (GB)'
                                                                />
                                                                <Field
                                                                    name='Tipo_Almacenamiento'
                                                                    label='Tipo almacenamiento'
                                                                >
                                                                    <option value=''>---Seleccionar---</option>
                                                                    {typesDrive.map(type => {
                                                                        return (
                                                                            <option value={type} key={`type-drive-computer-select-${type}`}>
                                                                                {type}
                                                                            </option>
                                                                        )
                                                                    })}
                                                                </Field>
                                                                <Field
                                                                    name='Capacidad_Almacenamiento'
                                                                    type='number'
                                                                    label='Capacidad almacenamiento (GB)'
                                                                    placeholder='Capacidad (GB)'
                                                                />
                                                                <Field
                                                                    name='Procesador'
                                                                    label='Procesador'
                                                                >
                                                                    <option value=''>---Seleccionar---</option>
                                                                    {processors.map(processor => {
                                                                        return (
                                                                            <option value={processor} key={`processor-computer-select-${processor}`}>
                                                                                {processor}
                                                                            </option>
                                                                        )
                                                                    })}
                                                                </Field>
                                                                <Field
                                                                    name='Estado'
                                                                    label='Estado'
                                                                >
                                                                    <option value=''>---Seleccionar---</option>
                                                                    {computerStatus.map(state => {
                                                                        return (
                                                                            <option value={state} key={`computer-state-computer-select-${state}`}>
                                                                                {state}
                                                                            </option>
                                                                        )
                                                                    })}
                                                                </Field>
                                                                <Field
                                                                    name='Plantel'
                                                                    label='Plantel'
                                                                >
                                                                    <option value=''>---Seleccionar---</option>
                                                                    {state.branchs.map(branch => <option value={branch.id} key={`branchs-${branch.id}`}>{branch.Nombre}</option>)}
                                                                </Field>
                                                                <Field
                                                                    name='Departamento'
                                                                    label='Departamento'
                                                                >
                                                                    <option value=''>---Seleccionar---</option>
                                                                    {loadDepartaments(values)}
                                                                </Field>
                                                                <div className='add-computer-form-button-container'>
                                                                    <Button type='submit'>Guardar</Button>
                                                                </div>
                                                        </Form>
                                                    );
                                                }} 
                                            </Formik>

                                            {/* Mensajes de error */}
                                            {state.addSucessfully == true
                                                ?   <span style={{ color: 'green' }}>Computadora registrada correctamente</span>
                                                :   null
                                            }
                                            {state.addSucessfully == false && !state.duplicatedNSOrHM
                                                ?   <span style={{ color: 'red' }}>Error registrando computadora</span>
                                                :   null
                                            }
                                            {state.addSucessfully == false && state.duplicatedNSOrHM
                                                ?   <span style={{ color: 'red' }}>Error registrando computadora, Numero de serie o Hostname ya existente</span>
                                                :   null
                                            }
                                        </div>
                                    </>
                            }
                        </>
                } 
            </div>
        </ModalBlackCover>
    );
}

export default ModalAddComputer;