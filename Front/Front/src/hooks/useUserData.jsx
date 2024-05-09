const useUserData = () => {
    if(!localStorage.getItem('comtecUser')) {
        return undefined;
    }

    const userData =  JSON.parse(localStorage.getItem('comtecUser'));

    return userData;
}

export default useUserData;