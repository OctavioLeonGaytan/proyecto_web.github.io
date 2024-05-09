import mysql from 'promise-mysql'
import envData from '../config.js'

const pool = mysql.createPool({
    host: envData.databaseHost,
    database: envData.databaseName,
    user: envData.databaseUser,
    password: envData.databasePassword,
    connectionLimit: 10
})

export const getPool = () => {
    return pool
}