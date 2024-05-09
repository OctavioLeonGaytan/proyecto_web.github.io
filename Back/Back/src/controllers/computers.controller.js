import { getPool } from "../database/database.js";

import { errorsComputers } from "../constants/sistema.js";

/* /api/computers/computer :POST*/
const addComputer = async (req, res) => {
    let conexion;
    try {
        const {
            Marca,
            Modelo,
            Numero_Serie,
            Host_Name,
            RAM,
            Tipo_Almacenamiento,
            Capacidad_Almacenamiento,
            Procesador,
            Estado,
            Departamento
        } = req.body;

        if(!Marca) {
            res.status(400).json({
                error: errorsComputers.MARCA_NO_PROPORCIONADA,
                message: 'Se debe especificar una Marca en la petición'
            });
            return;
        }

        if(!Modelo) {
            res.status(400).json({
                error: errorsComputers.MODELO_NO_PROPORCIONADO, 
                message: 'Se debe especificar un Modelo en la petición'
            });
            return;
        }

        if(!Numero_Serie) {
            res.status(400).json({
                error: errorsComputers.NUMERO_SERIE_NO_PROPORCIONADO, 
                message: 'Se debe especificar un Numero de serie en la petición'
            });
            return;
        }

        if(!Host_Name) {
            res.status(400).json({
                error: errorsComputers.HOST_NAME_NO_PROPORCIONADO, 
                message: 'Se debe especificar un Hostname en la petición'
            });
            return;
        }

        if(!RAM) {
            res.status(400).json({
                error: errorsComputers.RAM_NO_PROPORCIONADA,
                message: 'Se debe especificar la RAM en la petición'
            });
            return;
        }

        if(!Tipo_Almacenamiento) {
            res.status(400).json({
                error: errorsComputers.TIPO_ALMACENAMIENTO_NO_PROPORCIONADO,
                message: 'Se debe especificar un Tipo almacenamiento en la petición'
            });
            return;
        }

        if(!Capacidad_Almacenamiento) {
            res.status(400).json({
                error: errorsComputers.CAPACIDAD_ALMACENAMIENTO_NO_PROPORCIONADA,
                message: 'Se debe especificar la capacidad de almacenamiento en la petición'
            });
            return;
        }

        if(!Procesador) {
            res.status(400).json({
                error: errorsComputers.PROCESADOR_NO_PROPORCIONADO,
                message: 'Se debe especificar el procesador en la petición'
            });
            return;
        }

        if(!Estado) {
            res.status(400).json({
                error: errorsComputers.ESTADO_NO_PROPORCIONADO,
                message: 'Se debe especificar el estado en la petición'
            });
            return;
        }

        if(!Departamento) {
            res.status(400).json({
                error: errorsComputers.DEPARTAMENTO_NO_PROPORCIONADO,
                message: 'Se debe especificar el departamento en la petición'
            });
            return;
        }

        conexion = await (await getPool()).getConnection();

        const computerConsultQuery = `SELECT COUNT(*) AS 'total' FROM Computadora WHERE ?`;

        /*** Verificamos la existencia del número de serie ingresado ***/
        const computerCheckSerie = await conexion.query(computerConsultQuery, { Numero_Serie });

        if(computerCheckSerie[0].total != 0) {
            res.status(409).json({
                error: errorsComputers.NUMERO_SERIE_YA_EXISTENTE,
                message: 'El numero de serie ingresado ya se encuentra registrado'
            });
            return;
        }
        /*** ******************************************************* ***/

        /*** Verificamos la existencia del hostname ingresado ***/
        const computerCheckHostName = await conexion.query(computerConsultQuery, { Host_Name });

        if(computerCheckHostName[0].total != 0) {
            res.status(409).json({
                error: errorsComputers.HOST_NAME_YA_EXISTENTE,
                message: 'El hostname ingresado ya se encuentra registrado'
            });
            return;
        }
        /*** ******************************************************* ***/

        const insertQuery = `INSERT INTO Computadora SET ?, Fecha_Registro = NOW()`;
        const insertedDetails = await conexion.query(insertQuery, {
            Marca,
            Modelo,
            Numero_Serie,
            Host_Name,
            RAM,
            Tipo_Almacenamiento,
            Capacidad_Almacenamiento,
            Procesador,
            Estado,
            Departamento
        });

        const computerInsertedQuery = 'SELECT * FROM Computadora WHERE id = ?';
        const computerInserted = await conexion.query(computerInsertedQuery, [insertedDetails.insertId]);

        res.send(computerInserted);

    } catch(error) {
        console.error(error.message);
        res.sendStatus(500);
    }
}

/* /api/computers/computers :GET */
const getComputers = async (req, res) => {
    let conexion;
    try {
        conexion = await (await getPool()).getConnection();

        const computersQuery = `SELECT * FROM Computadora`;
        const computersResult = await conexion.query(computersQuery);

        const mantenienceComputerQuery = `SELECT Fecha FROM Mantenimiento WHERE Computadora = ? ORDER BY id DESC LIMIT 1`;
        let computers = computersResult.map(async (computer) => {
            const mantenience = await conexion.query(mantenienceComputerQuery, [computer.id]);

            if(mantenience.length == 0) {
                computer.Fecha_Ultimo_Mantenimiento = null;
            } else {
                computer.Fecha_Ultimo_Mantenimiento = mantenience[0].Fecha
            }

            return computer;
        });

        await Promise.all(computers)
            .then(result => {computers = result})
            .catch(error => {throw new Error(error)})

        res.send(computers);
    } catch(error) {
        console.error(error.message);
        res.sendStatus(500);
    } finally {
        if(conexion)
            conexion.release();
    }
}

/* /api/computers/manteniences :GET */
const getManteniences = async (req, res) => {
    let conexion;
    try {
        conexion = await (await getPool()).getConnection();

        const manteniencesQuery = `SELECT
                                        Computadora.Marca,
                                        Computadora.Modelo,
                                        Computadora.Numero_Serie,
                                        Computadora.Host_Name,
                                        Mantenimiento.Fecha,
                                        Mantenimiento.Tipo,
                                        Mantenimiento.Razon,
                                        Mantenimiento.Descripcion,
                                        Mantenimiento.Proximo_Mantenimiento
                                    FROM Mantenimiento JOIN Computadora ON Mantenimiento.Computadora = Computadora.id`;
        const manteniences = await conexion.query(manteniencesQuery);

        res.send(manteniences);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(500);
    } finally {

    }
}

/* /api/computers/computer :PATCH */
const updateComputer = async (req, res) => {
    let conexion;
    try {
        const {
            id,
            Marca,
            Modelo,
            Numero_Serie,
            Host_Name,
            RAM,
            Tipo_Almacenamiento,
            Capacidad_Almacenamiento,
            Procesador,
            Estado,
            Departamento
        } = req.body;

        if(!id) {
            res.status(400).json({
                error: errorsComputers.MARCA_NO_PROPORCIONADA,
                message: 'Se debe especificar una Marca en la petición'
            });
            return;
        }

        if(!Marca) {
            res.status(400).json({
                error: errorsComputers.MARCA_NO_PROPORCIONADA,
                message: 'Se debe especificar una Marca en la petición'
            });
            return;
        }

        if(!Modelo) {
            res.status(400).json({
                error: errorsComputers.MODELO_NO_PROPORCIONADO, 
                message: 'Se debe especificar un Modelo en la petición'
            });
            return;
        }

        if(!Numero_Serie) {
            res.status(400).json({
                error: errorsComputers.NUMERO_SERIE_NO_PROPORCIONADO, 
                message: 'Se debe especificar un Numero de serie en la petición'
            });
            return;
        }

        if(!Host_Name) {
            res.status(400).json({
                error: errorsComputers.HOST_NAME_NO_PROPORCIONADO, 
                message: 'Se debe especificar un Hostname en la petición'
            });
            return;
        }

        if(!RAM) {
            res.status(400).json({
                error: errorsComputers.RAM_NO_PROPORCIONADA,
                message: 'Se debe especificar la RAM en la petición'
            });
            return;
        }

        if(!Tipo_Almacenamiento) {
            res.status(400).json({
                error: errorsComputers.TIPO_ALMACENAMIENTO_NO_PROPORCIONADO,
                message: 'Se debe especificar un Tipo almacenamiento en la petición'
            });
            return;
        }

        if(!Capacidad_Almacenamiento) {
            res.status(400).json({
                error: errorsComputers.CAPACIDAD_ALMACENAMIENTO_NO_PROPORCIONADA,
                message: 'Se debe especificar la capacidad de almacenamiento en la petición'
            });
            return;
        }

        if(!Procesador) {
            res.status(400).json({
                error: errorsComputers.PROCESADOR_NO_PROPORCIONADO,
                message: 'Se debe especificar el procesador en la petición'
            });
            return;
        }

        if(!Estado) {
            res.status(400).json({
                error: errorsComputers.ESTADO_NO_PROPORCIONADO,
                message: 'Se debe especificar el estado en la petición'
            });
            return;
        }

        if(!Departamento) {
            res.status(400).json({
                error: errorsComputers.DEPARTAMENTO_NO_PROPORCIONADO,
                message: 'Se debe especificar el departamento en la petición'
            });
            return;
        }

        conexion = await (await getPool()).getConnection();

        const computerConsultQuery = `SELECT COUNT(*) AS 'total' FROM Computadora WHERE ? AND id != ${id}`;
        /*** Verificamos la existencia del número de serie ingresado ***/
        const computerCheckSerie = await conexion.query(computerConsultQuery, { Numero_Serie });

        if(computerCheckSerie[0].total != 0) {
            res.status(409).json({
                error: errorsComputers.NUMERO_SERIE_YA_EXISTENTE,
                message: 'El numero de serie ingresado ya se encuentra registrado'
            });
            return;
        }
        /*** ******************************************************* ***/

        /*** Verificamos la existencia del hostname ingresado ***/
        const computerCheckHostName = await conexion.query(computerConsultQuery, { Host_Name });

        if(computerCheckHostName[0].total != 0) {
            res.status(409).json({
                error: errorsComputers.HOST_NAME_YA_EXISTENTE,
                message: 'El hostname ingresado ya se encuentra registrado'
            });
            return;
        }
        /*** ******************************************************* ***/

        const updateQuery = `UPDATE Computadora SET ? WHERE id = ${id}`;
        await conexion.query(updateQuery, {
            Marca,
            Modelo,
            Numero_Serie,
            Host_Name,
            RAM,
            Tipo_Almacenamiento,
            Capacidad_Almacenamiento,
            Procesador,
            Estado,
            Departamento
        });

        res.sendStatus(200);

    } catch(error) {
        console.error(error.message);
        res.sendStatus(500);
    }
}

/* /api/computers/computer :delete */
const deleteComputer = async (req, res) => {
    let conexion;
    try {
        const { id } = req.body;

        if(!id) {
            res.status(400).json({
                error: errorsComputers.MARCA_NO_PROPORCIONADA,
                message: 'Se debe especificar una Marca en la petición'
            });
            return;
        }

        conexion = await (await getPool()).getConnection();
        console.log('id to delete: ', id)

        const deleteQuery = `DELETE FROM Computadora WHERE id = ?`;
        const resultDelete = await conexion.query(deleteQuery, [id]);

        console.log(resultDelete);

        res.sendStatus(200);

    } catch (error) {
        console.error(error.message);
        res.sendStatus(500);
    } finally {
        if(conexion)
            conexion.release();
    }
}

/* /api/computers/computer :POST */
const registerManteniance = async (req, res) => {
    let conexion;
    try {
        const { id, Tipo, Razon, Descripcion, Proximo_Mantenimiento } = req.body;

        conexion = await (await getPool()).getConnection();

        const registerMantenianceQuery = `INSERT INTO Mantenimiento SET ?, Fecha = NOW()`;
        await conexion.query(registerMantenianceQuery, { Tipo, Razon, Descripcion, Proximo_Mantenimiento, Computadora: id });

        res.sendStatus(200);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(500);
    }
}

export const methods = {
    addComputer,
    getComputers,
    getManteniences,
    updateComputer,
    deleteComputer,
    registerManteniance,
}