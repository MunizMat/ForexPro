import { Request, Response } from 'express';
import AuthService from '../services/authServices';
import { ApiError } from '../helpers/ApiErrors';

class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const { user, token } = await AuthService.loginUser(email, password);

      return res.status(200).json({ user, token });
    } catch (error) {
      const { statusCode, translationReference } = error as ApiError;
      return res.status(statusCode).json({
        errorTranslationMessage: translationReference,
      });
    }
  }
}

export default AuthController;
