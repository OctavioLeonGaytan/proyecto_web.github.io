import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table';
import dayjs from 'dayjs';

import PageTitle from "../components/PageTitle";
import ErrorMessageLogo from '../components/ErrorMessageLogo';
import Table from '../components/Table';
import TableContainer from '../components/TableContainer';
import ButtonPlus from '../components/ButtonPlus';
import Loader from '../components/Loader';
import ModalAddComputer from '../components/computers/ModalAddComputer';
import ModalEditComputer from '../components/computers/ModalEditComputer';

import useUserData from '../hooks/useUserData';
import useIcon, { constantes as iconsContantes } from "../hooks/useIcon";
import useApiComputers, { constants as apiComputersConstants } from '../hooks/api/useApiComputers';
import useApiDepartamets, { constants as apiDepartametsConstants } from '../hooks/api/useApiDepartaments';

import '../css/pages/Computers.css';

const Computers = () => {

    const [ state, setState ] = useState({
        computers: undefined,
        updateComputers: false,
        table: undefined,
        modalAddOpen: false,
        
        modalEditOpen: false,
        selectedComputer: undefined,
        
        departaments: undefined,
    });

    const [ errorState, setErrorState ] = useState({
        error: false,
        errorMessage: undefined
    });

    const [ sorting, setSorting ] = useState([]);
    const [ filtering, setFiltering ] = useState('');

    const userData = useUserData();
    const computerIcon = useIcon({ icon: iconsContantes.COMPUTER, color: '#58627B' });
    const magnifyingGlassIcon = useIcon({ icon: iconsContantes.MAGNIFYING_GLASS, color: '#58627B' });

    const getComputers = useApiComputers(apiComputersConstants.GET_COMPUTERS);

    const getDepartaments = useApiDepartamets(apiDepartametsConstants.GET_DEPARTAMENTS);

    document.title = 'Computadoras | Comtec';

    const loadingData = !state.computers || !state.departaments;

    const selectComputer = (computerId) => {
        const selectedComputer = state.computers.find(computer => computer.id == computerId);

        setState({
            ...state,
            selectedComputer,
            modalEditOpen: true,
        });
    }

    const cellStyle = { cursor: 'pointer' }

    const table = useReactTable({
        data: loadingData ? [] : state.computers,
        columns: loadingData ? [] : [
            { header: 'Marca', cell: ({ row }) => <span style={cellStyle} onClick={() => selectComputer(row.original.id)}>{row.original.Marca}</span> },
            { header: 'Modelo', cell: ({ row }) => <span style={cellStyle} onClick={() => selectComputer(row.original.id)}>{row.original.Modelo}</span> },
            { header: 'Numero Serie', cell: ({ row }) => <span style={cellStyle} onClick={() => selectComputer(row.original.id)}>{row.original.Numero_Serie}</span> },
            { header: 'Hostname', cell: ({ row }) => <span style={cellStyle} onClick={() => selectComputer(row.original.id)}>{row.original.Host_Name}</span> },
            { header: 'Fecha registro', cell: ({ row }) => <span style={cellStyle} onClick={() => selectComputer(row.original.id)}>{dayjs(row.original.Fecha_Registro).format('DD/MM/YYYY')}</span> },
            { header: 'Fecha ultimo mantenimiento', cell: ({ row }) => <span style={cellStyle} onClick={() => selectComputer(row.original.id)}>{ row.original.Fecha_Ultimo_Mantenimiento ? dayjs(row.original.Fecha_Ultimo_Mantenimiento).format('DD/MM/YYYY') : ''}</span> },
            { header: 'RAM', cell: ({ row }) => <span style={cellStyle} onClick={() => selectComputer(row.original.id)}>{`${row.original.RAM}GB`}</span> },
            { header: 'Tipo almacenamiento', cell: ({ row }) => <span style={cellStyle} onClick={() => selectComputer(row.original.id)}>{row.original.Tipo_Almacenamiento}</span> },
            { header: 'Capacidad almacenamiento', cell: ({ row }) => <span style={cellStyle} onClick={() => selectComputer(row.original.id)}>{`${row.original.Capacidad_Almacenamiento}GB`}</span> },
            { header: 'Procesador', cell: ({ row }) => <span style={cellStyle} onClick={() => selectComputer(row.original.id)}>{row.original.Procesador}</span> },
            { header: 'Estado', cell: ({ row }) => row.original.Estado == 'Activo' ? <span className='indicador-activo' onClick={() => selectComputer(row.original.id)} style={cellStyle}>Activo</span> : <span className='indicador-baja' onClick={() => selectComputer(row.original.id)} style={cellStyle}>Baja</span> },
            { header: 'Plantel', cell: ({ row }) => {
                const departament = state.departaments.find(departament => departament.id == row.original.Departamento)
                return <span style={cellStyle} onClick={() => selectComputer(row.original.id)}>{departament.nombreSucursal}</span>
            }},
            { header: 'Ubicación', cell: ({ row }) => {
                const departament = state.departaments.find(departament => departament.id == row.original.Departamento)
                return <span style={cellStyle} onClick={() => selectComputer(row.original.id)}>{departament.Nombre}</span>
            }}
        ],
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { sorting, globalFilter: filtering },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

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

            const computers = await getComputers(userData.token);
            if(!Array.isArray(computers)) {
                setErrorState({
                    ...errorState,
                    error: true,
                    errorMessage: 'Error obteniendo la información de los equipos, si persiste el problema contacte a soporte.'
                });
                return;
            }

            setState({
                ...state,
                departaments,
                computers
            });
        }

        loadData();
    }, []);

    useEffect(() => {
        const updateComputers = async () => {
            const computers = await getComputers(userData.token);
            if(!Array.isArray(computers)) {
                setErrorState({
                    ...errorState,
                    error: true,
                    errorMessage: 'Error obteniendo la información de los equipos, si persiste el problema contacte a soporte.'
                });
                return;
            }

            setState({
                ...state,
                computers,
                updateComputers: false
            });
        }

        state.updateComputers
            ?   updateComputers()
            :   null;
    }, [state.updateComputers]);

    return (
        <main className="computers">
            <PageTitle icon={computerIcon}>Computadoras</PageTitle>
            {errorState.error
                ?   <ErrorMessageLogo>{errorState.errorMessage}</ErrorMessageLogo>
                :   <>
                        {loadingData
                            ?   <Loader>Cargando...</Loader>
                            :   <TableContainer>
                                    <div className='head-table-container'>
                                        <div className='input-search-table-container'>
                                            <input
                                                className='input-search-table'
                                                type='text'
                                                value={filtering}
                                                onChange={e => setFiltering(e.target.value)}
                                            />
                                            <div className='input-search-icon-table'>
                                                {magnifyingGlassIcon}
                                            </div>
                                        </div>
                                        <ButtonPlus onClick={() => setState({ ...state, modalAddOpen: true })} />
                                    </div> 
                                    <Table tablaData={table}></Table>
                                </TableContainer>
                        } 
                    </>
            }
            {state.modalAddOpen
                ?   <ModalAddComputer
                        closeEvent={() => setState({ ...state, modalAddOpen: false, updateComputers: true })}
                    />
                :   null
            }
            {state.modalEditOpen
                ?   <ModalEditComputer
                        closeEvent={() => setState({ ...state, modalEditOpen: false, updateComputers: true })}
                        selectedComputer={state.selectedComputer}
                        selectSelfEvent={selectComputer}
                    />
                :   null
            }
        </main>
    );
}

export default Computers;