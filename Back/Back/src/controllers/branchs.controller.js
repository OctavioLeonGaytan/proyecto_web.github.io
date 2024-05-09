import { getPool } from "../database/database.js";

const getBranchs = async (req, res) => {
    let conexion;
    try {
        conexion = await (await getPool()).getConnection();

        const branchsQuery = `SELECT * FROM Sucursal`;
        const branchs = await conexion.query(branchsQuery);

        res.send(branchs);
    } catch (error) {
       console.error(error.message);
       res.sendStatus(500);
    } finally {
        if(conexion)
            conexion.release();
    }
}

export const methods = {
    getBranchs
}