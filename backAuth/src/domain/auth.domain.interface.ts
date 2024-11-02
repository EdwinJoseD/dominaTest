import { User, UserInput } from '../models';

/**
 * Interface for the AuthDomain class
 * @interface AuthDomainInterface
 */
export interface AuthDomainInterface {
  /**
   * @method login - Logs in a user
   * @param {UserInput} user - The user to log in
   * @returns {Promise<string>} The token
   */
  login(user: UserInput): Promise<string>;

  /**
   * @method register - Registers a user
   * @param {UserInput} user - The user to register
   * @returns {Promise<User>} The registered user
   */
  register(user: UserInput): Promise<User>;

  /**
   * @method me - Gets the user
   * @param {string} token - The token
   * @returns {Promise<User>} The user
   */
  me(token: string): Promise<User>;

  /**
   * @method logout - Logs out a user
   * @param {string} token - The token
   * @returns {Promise<void>}
   */
  logout(token: string): Promise<void>;

  /**
   * @method verifyToken - Verifies a token
   * @param {string} token - The token
   * @returns {Promise<boolean>} True if the token is valid, false otherwise
   */
  verifyToken(token: string): Promise<boolean>;
}
