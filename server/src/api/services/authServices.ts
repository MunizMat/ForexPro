import AuthHelpers from '../helpers/AuthHelpers';

class AuthService {
  static async loginUser(email: string, password: string) {
    const verifiedUser = await AuthHelpers.verifyUserCredentials({
      email,
      password,
    });

    const token = AuthHelpers.generateToken(verifiedUser.id);

    return {
      user: {
        ...verifiedUser,
        password: '',
      },
      token,
    };
  }
}

export default AuthService;
