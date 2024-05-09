export const constantes = {
    CAPITALIZE: 'capitalize'
}

const capitalize = (str) => {
    const strList = str.toLowerCase().split(' ')
    
    const newStrList = strList.map((e) => {
        const firstLetter = e.charAt(0)
        const auxStr = e.slice(1)
        return firstLetter.toUpperCase() + auxStr
    })

    return newStrList.join(' ')
}

const useString = (fn) => {
    const functions = {
        capitalize
    }

    return functions[fn]
}

export default useString