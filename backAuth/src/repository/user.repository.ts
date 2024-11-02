import { UserModel, User, UserInput } from '../models';
import { UserRepositoryInterface } from './user.repository.interface';

/**
 * UserRepository class that implements UserRepositoryInterface
 * This class is responsible for handling all the database operations related to the User model
 * @class UserRepository implements UserRepositoryInterface
 * @method createUser - creates a new user
 * @method findUserByEmail - finds a user by email
 * @method findUserById - finds a user by id
 * @method updateUser - updates a user
 * @method deleteUser - deletes a user
 */
export class UserRepository implements UserRepositoryInterface {
  /**
   * Creates a new user
   * @param user - UserInput
   * @returns Promise<User>
   */
  async createUser(user: UserInput): Promise<User> {
    return await UserModel.create(user);
  }

  /**
   * Finds a user by email
   * @param email - string
   * @returns Promise<User | null>
   */
  async findUserByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
  }

  /**
   * Finds a user by id
   * @param id - string
   * @returns Promise<User | null>
   */
  async findUserById(id: string) {
    return await UserModel.findById(id);
  }

  /**
   * Updates a user
   * @param id - string
   * @param user - UserInput
   * @returns Promise<boolean>
   */
  async updateUser(id: string, user: UserInput): Promise<boolean> {
    const updated = await UserModel.updateOne({ _id: id }, user);
    return updated.modifiedCount === 1;
  }

  /**
   * Deletes a user
   * @param id - string
   * @returns Promise<boolean>
   */
  async deleteUser(id: string): Promise<boolean> {
    const deleted = await UserModel.deleteOne({ _id: id });
    return deleted.deletedCount === 1;
  }
}
