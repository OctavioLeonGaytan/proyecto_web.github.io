import useServer from "./useServer";

const { urlApiBase } = useServer();

const getComputers = async (token) => {
    try {
        if(!token)
            throw new Error('Need add a token as argument in function "getComputers"');

        const apiEndpoint = `${urlApiBase}/computers/computers`;

        const result = await fetch(apiEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Auth-token': token
            }
        });

        if(result.ok) {
            const resultJson = await result.json();
            return resultJson;
        } else {
            return result;
        }
    } catch(error) {
        console.error(error.messsage);
    }
}

const getManteniences = async (token) => {
    try {
        if(!token)
            throw new Error('Need add a token as argument in function "getManteniences"');

        const apiEndpoint = `${urlApiBase}/computers/mantenience`;

        const result = await fetch(apiEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Auth-token': token
            }
        });

        if(result.ok) {
            const resultJson = await result.json();
            return resultJson;
        } else {
            return result;
        }
    } catch(error) {
        console.error(error.messsage);
    }
}

const addComputer = async (token, data) => {
    try {
        if(!token)
            throw new Error('Need add a token as argument in function "getComputers"');

        const apiEndpoint = `${urlApiBase}/computers/computer`;

        const result = await fetch(apiEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Auth-token': token
            },
            method: 'POST',
            body: JSON.stringify(data)
        });

        return result;

    } catch(error) {
        console.error(error.messsage);
    }
}

const updateComputer = async (token, data) => {
    try {
        if(!token)
            throw new Error('Need add a token as argument in function "updateComputers"');

        const apiEndpoint = `${urlApiBase}/computers/computer`;

        const result = await fetch(apiEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Auth-token': token
            },
            method: 'PATCH',
            body: JSON.stringify(data)
        });

        return result;

    } catch(error) {
        console.error(error.messsage);
    }
}

const deleteComputer = async (token, data) => {
    try {
        if(!token)
            throw new Error('Need add a token as argument in function "deleteComputers"');

        const apiEndpoint = `${urlApiBase}/computers/computer`;

        const result = await fetch(apiEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Auth-token': token
            },
            method: 'DELETE',
            body: JSON.stringify(data)
        });

        return result;

    } catch(error) {
        console.error(error.messsage);
    }
}

const registerMantenience = async (token, data) => {
    try {
        if(!token)
            throw new Error('Need add a token as argument in function "registerMantenience"');

        const apiEndpoint = `${urlApiBase}/computers/mantenience`;

        const result = await fetch(apiEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Auth-token': token
            },
            method: 'POST',
            body: JSON.stringify(data)
        });

        return result;

    } catch(error) {
        console.error(error.messsage);
    }
}

export const constants = {
    GET_COMPUTERS: 'getComputers',
    GET_MANTENIENCES: 'getManteniences',
    ADD_COMPUTER: 'addComputer',
    UPDATE_COMPUTER: 'updateComputer',
    DELETE_COMPUTER: 'deleteComputer',
    REGISTER_MANTENIENCE: 'registerMantenience',
}

const functions = {
    getComputers,
    getManteniences,
    addComputer,
    updateComputer,
    deleteComputer,
    registerMantenience,
}

const useApiComputers = (fn) => {
    return functions[fn];
}

export default useApiComputers;