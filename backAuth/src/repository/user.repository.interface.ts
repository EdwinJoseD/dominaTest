import { User, UserInput } from '../models';

/**
 * Interface for the UserRepository class
 * @interface UserRepositoryInterface
 */
export interface UserRepositoryInterface {
  /**
   * @method createUser - Create a new user
   * @param {UserInput} user - The user to create
   * @returns {Promise<User>} The created user
   */
  createUser(user: UserInput): Promise<User>;

  /**
   * @method findUserByEmail - Find a user by email
   * @param {string} email - The email to search for
   * @returns {Promise<User | null>} The user found or null
   */
  findUserByEmail(email: string): Promise<User | null>;

  /**
   * @method findUserById - Find a user by id
   * @param {string} id - The id to search for
   * @returns {Promise<User | null>} The user found or null
   */
  findUserById(id: string): Promise<User | null>;

  /**
   * @method updateUser - Update a user
   * @param {string} id - The id of the user to update
   * @param {UserInput} user - The user data to update
   * @returns {Promise<boolean>} The updated user or null
   */
  updateUser(id: string, user: UserInput): Promise<boolean>;

  /**
   * @method deleteUser - Delete a user
   * @param {string} id - The id of the user to delete
   * @returns {Promise<boolean>} True if the user was deleted, false otherwise
   */
  deleteUser(id: string): Promise<boolean>;
}
