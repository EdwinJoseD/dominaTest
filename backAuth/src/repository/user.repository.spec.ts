import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { UserModel, User, UserInput } from '../models';
import { UserRepository, UserRepositoryInterface } from '../repository';

describe('should validate user repository', () => {
  let userRepository: UserRepositoryInterface;

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  it('should create a user', async () => {
    const userInput: UserInput = {
      email: 'test@test.com',
      password: '123456',
    };
    jest.spyOn(UserModel, 'create').mockResolvedValue({
      _id: '1',
      email: userInput.email,
      password: userInput.password,
    } as any);
    const user: User = await userRepository.createUser(userInput);
    expect(user).toBeDefined();
    expect(user.email).toBe(userInput.email);
  });

  it('should get a user by email', async () => {
    const email = 'test@test.com';
    jest.spyOn(UserModel, 'findOne').mockResolvedValue({
      _id: '1',
      email: email,
    } as any);
    const user: User | null = await userRepository.findUserByEmail(email);
    expect(user).toBeDefined();
    expect(user?.email).toBe(email);
  });

  it('should get a user by id', async () => {
    const id = '1';
    jest.spyOn(UserModel, 'findById').mockResolvedValue({
      _id: id,
      email: 'test@test.com',
    } as any);
    const user: User | null = await userRepository.findUserById(id);
    expect(user).toBeDefined();
    expect(user?._id).toBe(id);
  });

  it('should update a user', async () => {
    const id = '1';
    const userInput: UserInput = {
      email: 'test@test.com',
      password: '123',
    };
    jest.spyOn(UserModel, 'updateOne').mockResolvedValue({
      modifiedCount: 1,
    } as any);
    const updated: boolean = await userRepository.updateUser(id, userInput);
    expect(updated).toBeTruthy();
  });

  it('should delete a user', async () => {
    const id = '1';
    jest.spyOn(UserModel, 'deleteOne').mockResolvedValue({
      deletedCount: 1,
    } as any);
    const deleted: boolean = await userRepository.deleteUser(id);
    expect(deleted).toBeTruthy();
  });
});
