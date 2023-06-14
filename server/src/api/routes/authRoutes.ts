import { Router } from 'express';
import AuthController from '../controllers/authController';

const router: Router = Router();

router.post('/', AuthController.login);

export default router;
