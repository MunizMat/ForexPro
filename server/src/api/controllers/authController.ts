import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/authServices';

class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const { user, token } = await AuthService.loginUser(email, password);

      return res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
