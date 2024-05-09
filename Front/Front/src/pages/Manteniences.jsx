import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table';
import dayjs from 'dayjs';
import PageTitle from "../components/PageTitle";
import ErrorMessageLogo from "../components/ErrorMessageLogo";
import Loader from "../components/Loader";
import TableContainer from "../components/TableContainer";
import Table from "../components/Table";

import useIcon, {constantes as iconsContantes} from "../hooks/useIcon";
import useApiComputers, {constants as apiComputersConstants} from '../hooks/api/useApiComputers';
import useUserData from '../hooks/useUserData';

import '../css/pages/Branchs.css';

const Manteniences = () => {

    const screwdriverWrenchIcon = useIcon({ icon: iconsContantes.SCREWDRIVER_WRENCH, color: '#58627B' });
    const magnifyingGlassIcon = useIcon({ icon: iconsContantes.MAGNIFYING_GLASS, color: '#58627B' });

    const getManteniences = useApiComputers(apiComputersConstants.GET_MANTENIENCES);

    const userData = useUserData();

    const [ state, setState ] = useState({
        manteniences: undefined,
    });

    const [ errorState, setErrorState ] = useState({
        error: false,
        errorMessage: undefined
    });

    const [ sorting, setSorting ] = useState([]);
    const [ filtering, setFiltering ] = useState('');

    const loadingData = !state.manteniences;

    const table = useReactTable({
        data: loadingData ? [] : state.manteniences,
        columns: loadingData ? [] : [
            {header: 'Marca', accessorKey: 'Marca'},
            {header: 'Modelo', accessorKey: 'Modelo'},
            {header: 'Numero de Serie', accessorKey: 'Numero_Serie'},
            {header: 'Hostname', accessorKey: 'Host_Name'},
            {header: 'Fecha', cell: ({row}) => dayjs(row.original.Fecha).format('DD/MM/YYYY')},
            {header: 'Razón', accessorKey: 'Razon'},
            {header: 'Descripción', accessorKey: 'Descripcion'},
            {header: 'Proximo mantenimiento programado', cell: ({row}) => row.original.Proximo_Mantenimiento ? dayjs(row.original.Proximo_Mantenimiento).format('DD/MM/YYYY') : ''},
        ],
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { sorting, globalFilter: filtering },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

    useEffect(() => {
        const fn = async () => {
            const manteniences = await getManteniences(userData.token);
            if(!Array.isArray(manteniences)) {
                setErrorState({
                    ...errorState,
                    error: true,
                    errorMessage: 'Error obteniendo la información de los mantenimientos, si persiste el problema contacte a soporte.'
                });
                return;
            }

            setState({
                ...state,
                manteniences 
            });
        }

        fn();
    }, []);

    document.title = 'Mantenimientos | Comtec';

    return (
        <main>
            <PageTitle icon={screwdriverWrenchIcon}>Mantenimientos</PageTitle>
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
                                    </div> 
                                    <Table tablaData={table}></Table>
                                </TableContainer>
                        } 
                    </>
            }
        </main>
    );
}

export default Manteniences;