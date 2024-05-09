import '../css/components/PageTitle.css';

const PageTitle = ({ children, icon, ...props }) => {
    return (
        <div className="page-title-container" {...props}>
            <div className="page-title-icon-container">
                {icon}
            </div>
            <h1 className="page-title">{children}</h1>
        </div>
    );
}

export default PageTitle;