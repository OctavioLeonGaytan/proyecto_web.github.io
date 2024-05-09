import { Router } from "express";
import { methods as branchsMethods } from "../controllers/branchs.controller.js";
import verifyToken from "../libs/verifyToken.js";

const router = Router();

router.get('/branchs', verifyToken, branchsMethods.getBranchs);

export default router;