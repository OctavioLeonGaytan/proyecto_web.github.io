const ModalBlackCover = ({children, ...props}) => {
    
    const styles = {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: '3',
        position: 'absolute',
        top: 0,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <div className="modal-black-cover" {...props} style={styles}>
            {children}
        </div>
    );
}

export default ModalBlackCover;