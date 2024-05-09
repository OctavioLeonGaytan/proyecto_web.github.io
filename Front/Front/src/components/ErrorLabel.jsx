import '../css/components/ErrorLabel.css'

const ErrorLabel = ({ children, ...props }) => {
    const className = `error-label ${props.className}`

    return (
        <span className={className}>{children}</span>
    )
}

export default ErrorLabel