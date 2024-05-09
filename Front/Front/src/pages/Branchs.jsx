import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table';
import PageTitle from "../components/PageTitle";
import ErrorMessageLogo from "../components/ErrorMessageLogo";
import Loader from "../components/Loader";
import TableContainer from "../components/TableContainer";
import Table from "../components/Table";

import useIcon, {constantes as iconsContantes} from "../hooks/useIcon";
import useApiDepartamets, { constants as apiDepartametsConstants } from '../hooks/api/useApiDepartaments';
import useApiBranchs, { constants as apiBranchsConstants } from '../hooks/api/useApiBranchs';
import useUserData from '../hooks/useUserData';

import '../css/pages/Branchs.css';

const Branchs = () => {

    const buildingIcon = useIcon({ icon: iconsContantes.BUILDING, color: '#58627B' });
    const magnifyingGlassIcon = useIcon({ icon: iconsContantes.MAGNIFYING_GLASS, color: '#58627B' });

    const getDepartaments = useApiDepartamets(apiDepartametsConstants.GET_DEPARTAMENTS);
    const getBranchs = useApiBranchs(apiBranchsConstants.GET_BRANCHS);
    const userData = useUserData();

    const [ state, setState ] = useState({
        branchs: undefined,
        departaments: undefined,
    });

    const [ errorState, setErrorState ] = useState({
        error: false,
        errorMessage: undefined
    });

    const [ sorting, setSorting ] = useState([]);
    const [ filtering, setFiltering ] = useState('');

    const loadingData = !state.branchs || !state.departaments;

    const table = useReactTable({
        data: loadingData ? [] : state.branchs,
        columns: loadingData ? [] : [
            { header: 'Código', accessorKey: 'Codigo' },
            { header: 'Plantel', accessorKey: 'Nombre' },
            { header: 'Departamentos', cell: ({ row }) => {
                const departamets = state.departaments.filter(departament => departament.idSucursal == row.original.id)
                return departamets.reduce((acc, elem) => `${acc} - ${elem.Nombre}`,'').slice(2);
            }},
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
                branchs,
                departaments
            });
        }

        fn();
    }, []);

    document.title = 'Planteles | Comtec';

    return (
        <main>
            <PageTitle icon={buildingIcon}>Planteles</PageTitle>
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

export default Branchs;