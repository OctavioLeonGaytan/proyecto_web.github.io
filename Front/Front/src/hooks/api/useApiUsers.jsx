import useServer from "./useServer";

const { urlApiBase } = useServer();

const signIn = async (email, password) => {
    const apiEndpoint = `${urlApiBase}/Users/sign-in`;

    const response = await fetch(apiEndpoint, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ email, password })
    });

    return response;
}

export const constantes = {
    SIGN_IN: 'signIn'
}

const functions = {
    signIn
}

const useApiUsers = (fn) => {
    return functions[fn]
}

export default useApiUsers;