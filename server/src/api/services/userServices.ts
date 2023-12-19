import { ApiError } from '../helpers/ApiErrors';
import UserHelpers from '../helpers/UserHelper';
import { IAccountCreation } from '../interfaces/IAccountCreation';
import DatabaseServices from './databaseServices';
import hashPassword from '../helpers/hashPassword';
import { TradeCreationRequest } from '../types/TradeCreationRequest';

class UserServices {
  static async create(user: IAccountCreation) {
    const hashedPassword = await UserServices.getHashedPassword(user.password);

    const createdUser = await DatabaseServices.createUser(
      user,
      hashedPassword as string,
    );

    return createdUser;
  }

  static async getHashedPassword(password: string) {
    try {
      const hashedPassword = await hashPassword(password);
      return hashedPassword;
    } catch (error) {
      throw ApiError.handle(error);
    }
  }

  static async getData(email: string) {
    try {
      const userData = await DatabaseServices.getUserAndTradeHistory(email);
      return userData;
    } catch (error) {
      throw new ApiError('failToGetUserData', 500);
    }
  }

  static async addTrade(jobData: TradeCreationRequest) {
    const { user, newTrade } = jobData;
    const newAccBalances = UserHelpers.getUpdatedAccountBalance(user, newTrade);
    try {
      const updatedUser = await DatabaseServices.updateUserBalanceAndAddTrade(
        user,
        newAccBalances,
        newTrade,
      );
      return { updatedUser, newTrade };
    } catch (error) {
      return error as ApiError;
    }
  }

  static async checkUserExistence(email: string) {
    try {
      const user = await DatabaseServices.getUserAndTradeHistory(email);
      return user;
    } catch (error) {
      console.log(error);
      throw new ApiError('userDoesntExist', 400);
    }
  }
}

export default UserServices;
