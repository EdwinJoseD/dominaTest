import { User, UserInput } from '../models/user.type';
import { hash, compare } from 'bcrypt';
import { UserRepository, UserRepositoryInterface } from '../repository';
import { AppError, HttpCode } from '../helpers';
import { generateToken } from '../helpers/jwt/jwt.helpers';
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
}
