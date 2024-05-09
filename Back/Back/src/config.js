import { config } from 'dotenv';

config();

const envData = {
    databaseHost: process.env.DATABASE_HOST || undefined,
    databaseName: process.env.DATABASE_NAME || undefined,
    databaseUser: process.env.DATABASE_USER || undefined,
    databasePassword: process.env.DATABASE_PASSWORD || undefined,
    secretTokenWord: process.env.SECRET_TOKEN_WORD || undefined,
};

try {
    if(!envData.databaseHost)
        throw new Error('Error: Archivo .env no contiene la propiedad DATABASE_HOST');

    if(envData.databaseHost === 'tu_database_host_aqui')
        throw new Error('Error: Valor en propiedad DATABASE_HOST de archivo .env es el valor por defecto, especifique el valor');

    if(!envData.databaseName)
        throw new Error('Error: Archivo .env no contiene la propiedad DATABASE_NAME');

    if(envData.databaseName === 'tu_database_name_aqui')
        throw new Error('Error: Valor en propiedad DATABASE_NAME de archivo .env es el valor por defecto, especifique el valor');

    if(!envData.databaseUser)
        throw new Error('Error: Archivo .env no contiene la propiedad DATABASE_USER');

    if(envData.databaseUser === 'tu_database_user_aqui')
        throw new Error('Error: Valor en propiedad DATABASE_USER de archivo .env es el valor por defecto, especifique el valor');

    if(!envData.databasePassword)
        throw new Error('Error: Archivo .env no contiene la propiedad PASSWORD');

    if(envData.databasePassword === 'tu_database_password_aqui')
        throw new Error('Error: Valor en propiedad DATABASE_PASSWORD de archivo .env es el valor por defecto, especifique el valor');

    if(!envData.secretTokenWord)
        throw new Error('Error: Archivo .env no contiene la propiedad SECRET_TOKEN_WORD');

    if(envData.secretTokenWord === 'tu_secret_token_word_aqui')
        throw new Error('Error: Valor en propiedad SECRET_TOKEN_WORD de archivo .env es el valor por defecto, especifique el valor');

} catch(error) {
    console.error(error.message);
}

export default envData;