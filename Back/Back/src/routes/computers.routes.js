import { Router } from "express";
import { methods as computersMethods } from "../controllers/computers.controller.js";
import verifyToken from "../libs/verifyToken.js";

const router = Router();

router.get('/computers', verifyToken, computersMethods.getComputers);
router.get('/mantenience', verifyToken, computersMethods.getManteniences);

router.post('/computer', verifyToken, computersMethods.addComputer);
router.post('/mantenience', verifyToken, computersMethods.registerManteniance);
router.patch('/computer', verifyToken, computersMethods.updateComputer);
router.delete('/computer', verifyToken, computersMethods.deleteComputer);

export default router;