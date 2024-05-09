import { Router } from "express";
import { methods as departamentsMethods } from "../controllers/departaments.controller.js";
import verifyToken from "../libs/verifyToken.js";

const router = Router();

router.get('/departaments', verifyToken, departamentsMethods.getDepartaments);

export default router;