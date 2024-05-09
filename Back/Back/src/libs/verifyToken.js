import jwt from 'jsonwebtoken';
import envData from '../config.js';
import { headers, erroresToken } from '../constants/sistema.js';

const verifyToken = (req, res, next) => {
    try {
        const token = req.header(headers.AUTH_TOKEN) || '';
        if(token == '') {
            console.error('Error: Client did not provide a token');
            res.status(401).json({ message: 'Error: invalite token' });
            return;
        }

        jwt.verify(token, envData.secretTokenWord, (err, decoded) => {
            if(err) {
                if(err.name === 'JsonWebTokenError') {
                    res.status(401).json({ error: erroresToken.TOKEN_INVALIDO, message: 'El token ingresado es inválido o incorrecto' });
                    return;
                } else if(err.name === 'TokenExpiredError') {
                    res.status(401).json({ error: erroresToken.TOKEN_EXPIRADO, message: 'El token ingresado ha expirado' });
                    return;
                } else {
                    res.status(401).json({ error: erroresToken.ERROR_VERIFICACION, message: err.message });
                    return;
                }
            } else {
                req.payload = decoded;
                next();
            }
        });
    } catch(error) {
        console.error(error.message);
        res.sendStatus(500);
    }
}

export default verifyToken