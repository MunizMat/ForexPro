import hashPassword from '../../../src/api/helpers/hashPassword';
import bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('Password hashing helper function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call bcrypt gensalt with 10', async () => {
    await hashPassword('somePassword');

    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
  });

  it('should call bcrypt hash correct arguments', async () => {
    const mockSalt = 'mock-salt';

    jest.spyOn(bcrypt, 'genSalt').mockResolvedValue(mockSalt as never);

    await hashPassword('somePassword');

    expect(bcrypt.hash).toHaveBeenCalledWith('somePassword', mockSalt);
  });

  it('should return hashed password if hashing succeeds', async () => {
    const mockSalt = 'mock-salt' as never;
    const mockHashedPassword = 'hashed-password' as never;

    jest.spyOn(bcrypt, 'genSalt').mockResolvedValue(mockSalt);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue(mockHashedPassword);

    await expect(hashPassword('some-password')).resolves.toBe(
      mockHashedPassword,
    );
  });
});
