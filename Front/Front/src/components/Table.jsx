import { flexRender } from '@tanstack/react-table';
import '../css/components/Table.css';

const Table = ({ tablaData }) => {
    return (
        <table className='table' style={{ width: '100%' }}>
            <thead>
                {tablaData.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {
                            headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))
                        }
                    </tr>
                ))}
            </thead>
            <tbody>
                {tablaData.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}

                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;