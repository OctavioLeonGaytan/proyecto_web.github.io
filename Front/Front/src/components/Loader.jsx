import useIcon from '../hooks/useIcon'
import '../css/components/Loader.css'

const Loader = ({ children, ...props }) => {
    const ulsaIcon = useIcon({ icon: 'gear', color: '#DCE1EE'})
    return (
        <div className="loader-container" {...props}>
            <h2>{children}</h2>
            <div className="spinner">
               {ulsaIcon}
            </div>
        </div>
    )
}

export default Loader