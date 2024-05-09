import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import useIcon, { constantes as iconsContantes } from "../../hooks/useIcon";
import useApiDepartamets, { constants as apiDepartametsConstants} from '../../hooks/api/useApiDepartaments';
import useApiBranchs, { constants as apiBranchsConstants } from '../../hooks/api/useApiBranchs';
import useApiComputers, { constants as apiComputersConstants } from '../../hooks/api/useApiComputers';
import useUserData from '../../hooks/useUserData';
import TextAreaField from '../TextAreaField';

import ModalBlackCover from "../ModalBlackCover";
import Field from '../Field';
import Button from '../Button';
import Loader from '../Loader';
import ErrorMessageLogo from '../ErrorMessageLogo';
import BotonSecundario from '../BotonSecundario';

import { trademarksModels, processors, typesDrive, computerStatus, manteniencesTypes } from '../../constants/computers';

import '../../css/components/computers/ModalAddComputer.css';

const ModalEditComputer = ({ closeEvent, selectedComputer, selectSelfEvent }) => {

    const xIcon = useIcon({ icon: iconsContantes.X_MARK, color: '#58627B' });
    const userData = useUserData();

    const getDepartaments = useApiDepartamets(apiDepartametsConstants.GET_DEPARTAMENTS);
    const getBranchs = useApiBranchs(apiBranchsConstants.GET_BRANCHS);
    const updateComputer = useApiComputers(apiComputersConstants.UPDATE_COMPUTER);
    const deleteComputer = useApiComputers(apiComputersConstants.DELETE_COMPUTER);
    const registerMantenience = useApiComputers(apiComputersConstants.REGISTER_MANTENIENCE);

    const [ state, setState ] = useState({
        branchs: undefined,
        departaments: undefined,

        updateSucessfully: undefined,
        duplicatedNSOrHM: false,

        deleteSucessfully: undefined,

        registerMantenienceSucessfully: undefined,

        mantenienceModalOpen: false,
        registerMantenienceSucessfully: undefined,
    });

    const [ errorState, setErrorState ] = useState({
        error: false,
        errorMessage: undefined
    })

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

    const validateMantenienceForm = values => {
        const errors = {};

        if(!values.Tipo) {
            errors.Tipo = {
                errorMessage: 'El tipo de mantenimiento es requerido',
                errorPrimary: false
            }
        }

        if(!values.Razon) {
            errors.Razon = {
                errorMessage: 'La razón del mantenimiento es requerida',
                errorPrimary: false
            }
        }

        if(!values.Descripcion) {
            errors.Descripcion = {
                errorMessage: 'La descripción del mantenimiento es requerida',
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

    const updateComputerSelected = async (data) => {
        const resultUpdate = await updateComputer(userData.token, data);

        if(resultUpdate.ok) {
            setState({
                ...state,
                updateSucessfully: true,
                duplicatedNSOrHM: false,
            });

            setTimeout(() => {
                closeEvent();
            }, 1000);
        } else {

            if(resultUpdate.status == 409) {
                setState({
                    ...state,
                    updateSucessfully: false,
                    duplicatedNSOrHM: true,
                });
            } else {
                setState({
                    ...state,
                    updateSucessfully: false,
                    duplicatedNSOrHM: false,
                });
            } 
        }
    }

    const deleteSelectedComputer = async (id) => {
        const resultDelete = await deleteComputer(userData.token, { id });

        if(resultDelete.ok) {
            setState({
                ...state,
                deleteSucessfully: true,
                duplicatedNSOrHM: false,
            });

            setTimeout(() => {
                closeEvent();
            }, 1000);
        } else {
            setState({
                ...state,
                deleteSucessfully: false,
                duplicatedNSOrHM: false,
            });
        }
    }

    const registerMantenienceEvent = async (values) => {
        const registerResult = await registerMantenience(userData.token, values);

        if(registerResult.ok) {
            setState({
                ...state,
                registerMantenienceSucessfully: true
            });

            setTimeout(() => {
                closeModalAddMantenience();
            }, 2000);
        } else {
            setState({
                ...state,
                registerMantenienceSucessfully: false
            });
        }
    }

    const openModalAddMantenience = () => {
        setState({
            ...state,
            mantenienceModalOpen: true
        });
    }

    const closeModalAddMantenience = () => {
        setState({
            ...state,
            mantenienceModalOpen: false,
            registerMantenienceSucessfully: undefined
        })
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
        <>
            <ModalBlackCover>
                <div className="modal-add-computer">
                    {!state.mantenienceModalOpen
                        ?   <button className='button-close-modal' onClick={closeEvent}>
                                {xIcon}
                            </button>
                        :   <button className='button-close-modal' onClick={closeModalAddMantenience}>
                                {xIcon}
                            </button>
                    }
                <br/>
                <br/>
                {!state.mantenienceModalOpen
                    ?   <h2 className='titulo-modal'>{`Actualizar computadora ${selectedComputer.Host_Name}`}</h2>
                    :   <h2 className='titulo-modal'>{`Registrar Mantenimiento (${selectedComputer.Host_Name})`}</h2>
                } 
                {errorState.error
                    ?   <ErrorMessageLogo>{errorState.errorMessage}</ErrorMessageLogo>
                    :   <>
                            {loadingData
                                ?   <Loader>Cargando...</Loader>
                                :   <>
                                        <div className='modal-add-computer-form-container'>
                                            {!state.mantenienceModalOpen
                                                ?   <Formik
                                                        initialValues={{
                                                            Marca: selectedComputer.Marca,
                                                            Modelo: selectedComputer.Modelo,
                                                            Numero_Serie: selectedComputer.Numero_Serie,
                                                            Host_Name: selectedComputer.Host_Name,
                                                            RAM: selectedComputer.RAM,
                                                            Tipo_Almacenamiento: selectedComputer.Tipo_Almacenamiento,
                                                            Capacidad_Almacenamiento: selectedComputer.Capacidad_Almacenamiento,
                                                            Procesador: selectedComputer.Procesador,
                                                            Estado: selectedComputer.Estado,
                                                            Plantel: state.departaments.find(departament => departament.id == selectedComputer.Departamento).idSucursal,
                                                            Departamento: selectedComputer.Departamento,
                                                        }}
                                                        validate={validate}
                                                        onSubmit={values => updateComputerSelected({ ...values, id: selectedComputer.id })}
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
                                                                            disabled={true}
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
                                                                            <BotonSecundario type='button' onClick={() => deleteSelectedComputer(selectedComputer.id)}>Borrar</BotonSecundario>
                                                                            {/* <BotonSecundario type='button' onClick={() => registerMantenienceToSelectedComputer(selectedComputer.id)}>Registrar Mantenimiento</BotonSecundario> */}
                                                                            <BotonSecundario type='button' onClick={() => openModalAddMantenience()}>Registrar Mantenimiento</BotonSecundario>
                                                                            <Button type='submit'>Guardar</Button>
                                                                        </div>
                                                                </Form>
                                                            );
                                                        }} 
                                                    </Formik>
                                                :   null
                                            } 

                                            {state.mantenienceModalOpen
                                                ?   <Formik
                                                        initialValues={{
                                                            Tipo: '',
                                                            Razon: '',
                                                            Descripcion: '',
                                                            Proximo_Mantenimiento: '',
                                                        }}
                                                        validate={validateMantenienceForm}
                                                        onSubmit={values => registerMantenienceEvent({ ...values, id: selectedComputer.id })}
                                                    >
                                                        {({ values }) => {
                                                            console.log(values)
                                                            return (
                                                                <Form>
                                                                        <Field name='Tipo' label='Tipo'>
                                                                            <option value=''>---Seleccionar---</option>
                                                                            {Object.keys(manteniencesTypes).map(mantenienceTypeKey => {
                                                                                return (
                                                                                    <option
                                                                                        key={`mantenience-type-${manteniencesTypes[mantenienceTypeKey]}`}
                                                                                        value={manteniencesTypes[mantenienceTypeKey]}
                                                                                    >
                                                                                        {manteniencesTypes[mantenienceTypeKey]}
                                                                                    </option>
                                                                                )
                                                                            })}
                                                                        </Field>
                                                                        <Field
                                                                            name='Razon'
                                                                            type='text'
                                                                            label='Razón'
                                                                            placeholder='Razón del mantenimiento'
                                                                        />
                                                                        <TextAreaField
                                                                            name='Descripcion'
                                                                            type='text'
                                                                            placeholder='Descripción'
                                                                            label='Descripcion'
                                                                        />
                                                                        <Field
                                                                            type='date'
                                                                            name='Proximo_Mantenimiento'
                                                                            label='Proximo Mantenimiento'
                                                                        />
                                                                        <div className='add-computer-form-button-container'>
                                                                            <Button type='submit'>Guardar</Button>
                                                                        </div>
                                                                </Form>
                                                            );
                                                        }} 
                                                    </Formik> 
                                                :   null
                                            }

                                            {/* Mensajes de estado */}
                                            {state.updateSucessfully == true
                                                ?   <span style={{ color: 'green' }}>Computadora actualizada correctamente</span>
                                                :   null
                                            }
                                            {state.updateSucessfully == false && !state.duplicatedNSOrHM
                                                ?   <span style={{ color: 'red' }}>Error actualizando computadora</span>
                                                :   null
                                            }
                                            {state.updateSucessfully == false && state.duplicatedNSOrHM
                                                ?   <span style={{ color: 'red' }}>Error actualizando computadora, Numero de serie o Hostname ya existente</span>
                                                :   null
                                            }
                                            {state.deleteSucessfully == true
                                                ?   <span style={{ color: 'green' }}>Computadora eliminada correctamente</span>
                                                :   null
                                            }
                                            {state.deleteSucessfully == false
                                                ?   <span style={{ color: 'red' }}>Error eliminando computadora</span>
                                                :   null
                                            }

                                            {state.registerMantenienceSucessfully == true
                                                ?   <span style={{ color: 'green' }}>Registro mantenimiento añadido exitosamente</span>
                                                :   null
                                            }
                                            {state.registerMantenienceSucessfully == false
                                                ?   <span style={{ color: 'red' }}>Error registrando mantenimiento</span>
                                                :   null
                                            }
                                        </div>
                                    </>
                            }
                        </>
                    } 
                </div>
            </ModalBlackCover>
        </>
    );
}

export default ModalEditComputer;