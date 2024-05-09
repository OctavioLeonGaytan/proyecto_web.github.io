import { getPool } from "../database/database.js";

/* /api/departaments/departaments :GET*/
const getDepartaments = async (req, res) => {
    let conexion;
    try {
        conexion = await (await getPool()).getConnection();

        const departamentsQuery = `SELECT
                                        Departamento.id,
                                        Departamento.Nombre,
                                        Departamento.Sucursal AS 'idSucursal',
                                        Sucursal.Nombre AS 'nombreSucursal',
                                        Sucursal.Codigo AS 'codigoSucursal'
                                    FROM Departamento JOIN Sucursal ON Departamento.Sucursal = Sucursal.id`;
        const departaments = await conexion.query(departamentsQuery);

        res.send(departaments);

    } catch (error) {
       console.error(error.message);
       res.sendStatus(500);
    } finally {
        if(conexion)
            conexion.release();
    }
}

export const methods = {
    getDepartaments
}