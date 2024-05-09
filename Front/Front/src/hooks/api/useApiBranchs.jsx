import useServer from "./useServer";

const { urlApiBase } = useServer();

const getBranchs = async (token) => {
    try {
        if(!token)
            throw new Error('Need add a token as argument in function "getBranchs"');

        const apiEndpoint = `${urlApiBase}/branchs/branchs`;

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
    GET_BRANCHS: 'getBranchs',
}

const functions = {
    getBranchs
}

const useApiBranchs = (fn) => {
    return functions[fn];
}

export default useApiBranchs;