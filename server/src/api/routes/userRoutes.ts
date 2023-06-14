import { Router } from 'express';
import UserController from '../controllers/userContorller';
import { loginRequired } from '../middlewares/loginRequired';

const router: Router = Router();

router.post('/', UserController.create);
router.post('/:userId/trade', loginRequired, UserController.enqueueTrade);

export default router;
