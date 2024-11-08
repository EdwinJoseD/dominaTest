import { describe, expect, it, jest } from '@jest/globals';
import * as SwaggerDoc from 'express-jsdoc-swagger';

let app: any = {
  use: jest.fn(),
  get: jest.fn(),
};
//**************config **********************//
import { Swagger } from './swagger.config';

describe('should validate config swagger', () => {
  it('validate initial swagger', async () => {
    expect(Swagger(app)).toBeInstanceOf(Object);
  });
});
