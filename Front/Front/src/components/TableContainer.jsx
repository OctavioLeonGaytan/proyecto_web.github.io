import '../css/components/TableContainer.css';

const TableContainer = ({children, ...props}) => {
    return (
        <div className="table-container" {...props}>{children}</div>
    );
}

export default TableContainer;