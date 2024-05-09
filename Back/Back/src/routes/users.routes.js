import { Router } from 'express';
import { methods as usersController } from '../controllers/users.controller.js';
import verifyToken from '../libs/verifyToken.js';

const router = Router();

router.post('/sign-up', usersController.signUp);
router.post('/sign-in', usersController.signIn);

export default router;