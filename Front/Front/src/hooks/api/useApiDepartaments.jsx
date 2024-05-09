import useServer from "./useServer";

const { urlApiBase } = useServer();

const getDepartaments = async (token) => {
    try {
        if(!token)
            throw new Error('Need add a token as argument in function "getDepartaments"');

        const apiEndpoint = `${urlApiBase}/departaments/departaments`;

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

export const constants = {
    GET_DEPARTAMENTS: 'getDepartaments',
}

const functions = {
    getDepartaments 
}

const useApiDepartamets = (fn) => {
    return functions[fn];
}

export default useApiDepartamets;