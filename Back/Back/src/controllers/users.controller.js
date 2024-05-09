import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import envData from "../config.js";
import { getPool } from "../database/database.js";

const signUp = async (req, res) => {
    let conexion;
    try {
        const {
            email,
            contraseña,
            nombre,
            apellidoPaterno
        } = req.body;

        let { apellidoMaterno } = req.body;

        if(!email) {
            res.status(400).json({
                error: 'EmailNoProporcionado',
                message: 'Se debe especificar el email en la petición'
            });
            return;
        }

        if(!contraseña) {
            res.status(400).json({
                error: 'ContraseñaNoProporcionada',
                message: 'Se debe especificar la contraseña en la petición'
            });
            return;
        }

        if(!nombre) {
            res.status(400).json({
                error: 'NombreNoProporcionado',
                message: 'Se debe especificar el nombre en la petición'
            });
            return;
        }

        if(!apellidoPaterno) {
            res.status(400).json({
                error: 'ApellidoPaternoNoProporcionado',
                message: 'Se debe especificar el apellido paterno en la petición'
            });
            return;
        }

        conexion = await (await getPool()).getConnection();
        
        const usuarioQuery = `SELECT COUNT(*) AS 'total' FROM Usuario_Sistema WHERE Email = ?`;
        const usuarioResultado = await conexion.query(usuarioQuery, email);

        if(usuarioResultado[0].total == 0) {
            const payload = {
                email,
                nombre,
                apellidoPaterno
            }

            const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

            if(!apellidoMaterno)
                apellidoMaterno = null;

            const insercionQuery = `INSERT INTO Usuario_Sistema SET Nombre = ?, Apellido_Paterno = ?, Apellido_Materno = ?, Email = ?, Contrasena = ?`;
            await conexion.query(insercionQuery, [nombre, apellidoPaterno, apellidoMaterno, email, contraseñaHasheada]);

            res.sendStatus(200);

        } else {
            res.status(409).json({
                error: 'UsuarioYaRegistrado',
                message: 'El usuario que intantas registrar ya existe.'
            });
            return;
        }

    } catch(error) {
        console.error(error.message);
        res.sendStatus(500);
    } finally {
        if(conexion)
            conexion.release();
    }
}

const signIn = async (req, res) => {
    let conexion;
    try {

        const { email, password } = req.body;

        if(!email) {
            res.status(400).json({
                error: 'EmailNoProporcionado',
                message: 'Se debe especificar el email en la petición'
            });
            return;
        }

        if(!password) {
            res.status(400).json({
                error: 'ContraseñaNoProporcionada',
                message: 'Se debe especificar un password en la petición'
            });
            return;
        }

        conexion = await (await getPool()).getConnection();

        const usuarioQuery = `SELECT
                                Nombre AS 'nombre',
                                Apellido_Paterno AS 'apellidoPaterno',
                                Apellido_Materno AS 'apellidoMaterno',
                                Email AS 'email',
                                Contrasena
                            FROM Usuario_Sistema WHERE email = ?`;
        const usuarioResultado = await conexion.query(usuarioQuery, [email]);

        if(usuarioResultado.length == 0) {
            res.status(401).json({
                error: 'UsuarioNoEncontrado',
                menssage: 'El usuario no fue encontrado'
            });
            return;
        }

        bcrypt.compare(password, usuarioResultado[0].Contrasena, async (error, result) => {
            if(error) {
                console.error('Error comparing passwords in SignIn controller:', error);
            } else if (result) {
                const payload = {
                    nombre: usuarioResultado[0].nombre,
                    apellidoPaterno: usuarioResultado[0].apellidoPaterno,
                    apellidoMaterno: usuarioResultado[0].apellidoMaterno,
                    email: usuarioResultado[0].email
                }

                const token = jwt.sign(payload, envData.secretTokenWord);

                res.send({
                    message: 'SingIn Successfully',
                    token,
                    userData: payload
                });
            } else {
                res.status(401).json({
                    error: 'UsuarioNoEncontrado',
                    menssage: 'El usuario no fue encontrado'
                });
                return;
            }
        });

    } catch(error) {
        console.error(error.message);
        res.sendStatus(500);
    } finally {
        if(conexion)
            conexion.release();
    }
}

export const methods = {
    signUp,
    signIn,
}