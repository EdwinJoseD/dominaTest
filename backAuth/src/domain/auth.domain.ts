import { User, UserInput } from '../models/user.type';
import { hash, compare } from 'bcrypt';
import { UserRepository, UserRepositoryInterface } from '../repository';
import { AppError, HttpCode } from '../helpers';
import {
  generateToken,
  verifyToken,
  decodeToken,
} from '../helpers/jwt/jwt.helpers';
import { AuthDomainInterface } from './auth.domain.interface';

/**
 * AuthDomain class that implements AuthDomainInterface
 * This class is responsible for handling all the business logic related to the authentication
 * @class AuthDomain
 * @method login - logs in a user
 * @method register - registers a user
 */
export class AuthDomain implements AuthDomainInterface {
  private userRepository: UserRepositoryInterface;

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Logs in a user
   * @param {UserInput} user - The user to log in
   * @returns {Promise<string>} The token
   * @throws {AppError} If the user is not found or the password is invalid
   */
  async login(user: UserInput): Promise<string> {
    const userExists = await this.userRepository.findUserByEmail(user.email);
    if (!userExists) {
      throw new AppError({
        message: 'User not found',
        status: HttpCode.BAD_REQUEST,
      });
    }
    const isPasswordValid = await compare(user.password, userExists.password);
    if (!isPasswordValid) {
      throw new AppError({
        message: 'Invalid password',
        status: HttpCode.BAD_REQUEST,
      });
    }
    const token = generateToken(userExists);
    return token;
  }

  /**
   * Registers a user
   * @param {UserInput} user - The user to register
   * @returns {Promise<User>} The registered user
   * @throws {AppError} If the user already exists
   */
  async register(user: UserInput): Promise<User> {
    const userExists = await this.userRepository.findUserByEmail(user.email);
    if (userExists) {
      throw new AppError({
        message: 'User already exists',
        status: HttpCode.BAD_REQUEST,
      });
    }
    const userToCreate: UserInput = {
      ...user,
      password: await hash(user.password, 10),
    };
    return await this.userRepository.createUser(userToCreate);
  }

  /**
   * Gets the user
   * @param {string} token - The token
   * @returns {Promise<User>} The user
   * @throws {AppError} If the token is invalid
   */
  async me(token: string): Promise<User> {
    const decodedToken: any = decodeToken(token);
    if (!decodedToken) {
      throw new AppError({
        message: 'Invalid token',
        status: HttpCode.UNAUTHORIZED,
      });
    }
    const user = await this.userRepository.findUserByEmail(decodedToken._id);
    if (!user) {
      throw new AppError({
        message: 'User not found',
        status: HttpCode.BAD_REQUEST,
      });
    }
    return user;
  }

  /**
   * Logs out a user
   * @param {string} token - The token
   * @returns {Promise<void>}
   */
  async logout(token: string): Promise<void> {
    // Do something
  }

  /**
   * Verifies a token
   * @param {string} token - The token
   * @returns {Promise<boolean>} True if the token is valid, false otherwise
   */
  async verifyToken(token: string): Promise<boolean> {
    const verify = verifyToken(token);
    return verify ? true : false;
  }
}
