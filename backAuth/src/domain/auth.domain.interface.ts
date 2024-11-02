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
}
