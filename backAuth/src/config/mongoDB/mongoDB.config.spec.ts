import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import mongoose from 'mongoose';

//************* config **************************//
import { MongoDB } from './mongoDB.config';

describe('should validate config mongoDB', () => {
  it('validate conect success mongoDB ', async () => {
    jest.spyOn(mongoose, 'connect').mockResolvedValue(mongoose);
    MongoDB();
    expect(mongoose.connect).toBeCalled();
  });
  it('validate conect error mogoDB ', async () => {
    jest
      .spyOn(mongoose, 'connect')
      .mockRejectedValue(new Error('error de conection'));
    try {
      await MongoDB();
    } catch (error: any) {
      expect(error.message).toEqual(
        '[DatabaseMongo]: MongoDB connection failed'
      );
    }
  });
});
