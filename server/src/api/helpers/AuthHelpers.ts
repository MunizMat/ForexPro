import UserServices from '../services/userServices';
import jwt from 'jsonwebtoken';
import { IUserCredentials } from '../interfaces/IUserCredentials';
import dotenv from 'dotenv';
import UserHelpers from './UserHelper';
dotenv.config();

export default class AuthHelpers {
  static async verifyUserCredentials({ email, password }: IUserCredentials) {
    const user = await UserServices.checkUserExistence(email);

    UserHelpers.verifyPasword(password, user.password);

    return user;
  }

  static generateToken(userId: number) {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY ?? '', {
      expiresIn: '2d',
    });
  }
}
