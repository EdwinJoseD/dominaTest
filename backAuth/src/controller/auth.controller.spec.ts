import { jest, describe, it, expect } from '@jest/globals';
import app from '../config/app';
import request from 'supertest';
import { ResponseApi, HttpCode } from '../helpers';
import { AuthDomain } from '../domain';
import { User } from '../models';

const { PREFIX } = process.env;

describe('should validate the auth controller', () => {
  it('should validate the login method', async () => {
    const user = {
      email: 'test@test.com',
      password: '123456',
    };
    const responseApi: ResponseApi<string> = {
      status: HttpCode.OK,
      data: 'token',
    };
    jest.spyOn(AuthDomain.prototype, 'login').mockResolvedValue('token');
    const response = await request(app)
      .post(`${PREFIX}/api/auth/login`)
      .send(user);
    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toEqual(responseApi);
  });

  it('should validate the method login with error', async () => {
    const user = {
      email: '',
      password: '',
    };
    jest.spyOn(AuthDomain.prototype, 'login').mockResolvedValue('token');
    const response = await request(app)
      .post(`${PREFIX}/api/auth/login`)
      .send(user);
    expect(response.status).toBe(HttpCode.BAD_REQUEST);
  });

  it('should validate the register method', async () => {
    const user = {
      email: 'test@test.com',
      password: '123456',
    };
    const responseApi: ResponseApi<User> = {
      status: HttpCode.CREATED,
      data: {
        _id: '1',
        email: user.email,
        password: user.password,
      } as any,
    };
    jest.spyOn(AuthDomain.prototype, 'register').mockResolvedValue({
      _id: '1',
      email: user.email,
      password: user.password,
    } as any);
    const response = await request(app)
      .post(`${PREFIX}/api/auth/register`)
      .send(user);
    expect(response.status).toBe(HttpCode.CREATED);
    expect(response.body).toEqual(responseApi);
  });

  it('should validate the me method', async () => {
    const user = {
      _id: '1',
      email: 'test@test.com',
      password: '123456',
    };
    const responseApi: ResponseApi<User> = {
      status: HttpCode.OK,
      data: user as any,
    };
    jest.spyOn(AuthDomain.prototype, 'me').mockResolvedValue(user as any);
    const response = await request(app)
      .get(`${PREFIX}/api/auth/me`)
      .set('Authorization', 'Bearer token');
    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toEqual(responseApi);
  });

  it('should validate the verify method', async () => {
    const responseApi: ResponseApi<boolean> = {
      status: HttpCode.OK,
      data: true,
    };
    jest.spyOn(AuthDomain.prototype, 'verifyToken').mockResolvedValue(true);
    const response = await request(app)
      .get(`${PREFIX}/api/auth/verify`)
      .set('Authorization', 'Bearer token');
    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toEqual(responseApi);
  });
});
