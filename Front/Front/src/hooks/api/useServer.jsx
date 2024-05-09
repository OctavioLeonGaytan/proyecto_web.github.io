const useServer = () => {
    const protocolo = 'http';
    const servidor = 'localhost';
    const puerto = '3000';

    const urlBase = `${protocolo}://${servidor}:${puerto}`;
    const urlApiBase = `${urlBase}/api`;
    const urlRecursosBase = `${urlBase}/resources`;

    return { protocolo, servidor, puerto, urlApiBase, urlBase, urlRecursosBase };
};

export default useServer;