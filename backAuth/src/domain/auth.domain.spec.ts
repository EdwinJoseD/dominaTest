import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { AuthDomain, AuthDomainInterface } from '../domain';
import { User, UserInput } from '../models';
import { UserRepository } from '../repository';
import { generateToken, verifyToken, decodeToken } from '../helpers';
import * as crypt from 'bcrypt';
jest.mock('bcrypt');
jest.mock('../helpers/jwt/jwt.helpers');
const mockDecodeToken = decodeToken as jest.MockedFunction<typeof decodeToken>;
const mockCreateToken = generateToken as jest.MockedFunction<
  typeof generateToken
>;
const mockVerifyToken = verifyToken as jest.MockedFunction<typeof verifyToken>;

describe('should validate the AuthDomain class', () => {
  let authDomain: AuthDomainInterface;

  beforeEach(() => {
    authDomain = new AuthDomain();
  });

  it('should validate the login method', async () => {
    const user: UserInput = {
      email: '',
      password: '',
    };
    jest
      .spyOn(UserRepository.prototype, 'findUserByEmail')
      .mockResolvedValueOnce({} as User);
    jest.spyOn(crypt, 'compare').mockResolvedValue(true as never);
    mockCreateToken.mockReturnValue('token');
    const token = await authDomain.login(user);
    expect(token).toBe('token');
  });

  it('should validate the login method when the user is not found', async () => {
    const user: UserInput = {
      email: '',
      password: '',
    };
    jest
      .spyOn(UserRepository.prototype, 'findUserByEmail')
      .mockResolvedValueOnce(null);
    try {
      await authDomain.login(user);
    } catch (error: any) {
      expect(error.message).toBe('User not found');
      expect(error.status).toBe(400);
    }
  });

  it('should validate the login method when the password is invalid', async () => {
    const user: UserInput = {
      email: '',
      password: '',
    };
    jest
      .spyOn(UserRepository.prototype, 'findUserByEmail')
      .mockResolvedValueOnce({} as User);
    jest.spyOn(crypt, 'compare').mockResolvedValue(false as never);
    try {
      await authDomain.login(user);
    } catch (error: any) {
      expect(error.message).toBe('Invalid password');
      expect(error.status).toBe(400);
    }
  });

  it('should validate the register method', async () => {
    const user: UserInput = {
      email: '',
      password: '',
    };
    jest
      .spyOn(UserRepository.prototype, 'findUserByEmail')
      .mockResolvedValueOnce(null);
    jest.spyOn(crypt, 'hash').mockResolvedValue('password' as never);
    jest
      .spyOn(UserRepository.prototype, 'createUser')
      .mockResolvedValueOnce({ _id: 'id' } as any);
    const userCreated = await authDomain.register(user);
    expect(userCreated).toEqual({
      _id: 'id',
    });
  });

  it('should validate the register method when the user already exists', async () => {
    const user: UserInput = {
      email: '',
      password: '',
    };
    jest
      .spyOn(UserRepository.prototype, 'findUserByEmail')
      .mockResolvedValueOnce({} as User);
    try {
      await authDomain.register(user);
    } catch (error: any) {
      expect(error.message).toBe('User already exists');
      expect(error.status).toBe(400);
    }
  });

  it('should validate the me method', async () => {
    const token = 'token';
    mockDecodeToken.mockReturnValue({ _id: 'id' });
    jest
      .spyOn(UserRepository.prototype, 'findUserByEmail')
      .mockResolvedValueOnce({ _id: 'id' } as any);
    const user = await authDomain.me(token);
    expect(user).toEqual({ _id: 'id' });
  });

  it('should validate the me method when the token is invalid', async () => {
    const token = 'token';
    mockDecodeToken.mockReturnValue(null);
    try {
      await authDomain.me(token);
    } catch (error: any) {
      expect(error.message).toBe('Invalid token');
      expect(error.status).toBe(401);
    }
  });

  it('should validate the me method when the user is not found', async () => {
    const token = 'token';
    mockDecodeToken.mockReturnValue({ _id: 'id' });
    jest
      .spyOn(UserRepository.prototype, 'findUserByEmail')
      .mockResolvedValueOnce(null);
    try {
      await authDomain.me(token);
    } catch (error: any) {
      expect(error.message).toBe('User not found');
      expect(error.status).toBe(400);
    }
  });

  it('should validate the verifyToken method', async () => {
    const token = 'token';
    mockVerifyToken.mockReturnValue('id');
    const verify = await authDomain.verifyToken(token);
    expect(verify).toBeTruthy();
  });

  it('should validate the logout method', async () => {
    const token = 'token';
    mockVerifyToken.mockReturnValue(undefined as never);
    const verify = await authDomain.logout(token);
    expect(verify).toBeFalsy();
  });
});
