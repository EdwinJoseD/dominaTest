import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { NextFunction } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';

const { res } = getMockRes();

//*************** meddlewares ************************//
import { verifytoken, MessageError } from './verifyToken.middleware';

//********************** types *******************************//
import { HttpCode } from '../helpers';

describe('should validate autorization middleware', () => {
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    process.env = {
      JWT_SECRET: 'test',
    };
  });

  it('validate not authorization token', async () => {
    const expectedResponse = {
      message: MessageError.ERROR_TOKEN_AUTHORIZATION,
      status: HttpCode.UNAUTHORIZED,
    };

    verifytoken(getMockReq(), res, nextFunction);

    expect(res.json).toBeCalledWith(expectedResponse);
  });

  it('validate authorization token', async () => {
    let user = {
      name: 'test',
      email: 'test@test.com',
      iat: 1667322189,
    };
    let tokenJwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInJvbGVzIjpbImluc3RhbGxlcl9zaWduYXR1cmUiXSwiZGF0YSI6eyJpZCI6IjEyMyJ9fSwiaWF0IjoxNzAwNjcxMzgwfQ.KRiWEAy4cPtaaJXgDymxRFHW4M0zLvYozVnOwQmm-tc';
    let token = 'Bearer ' + tokenJwt;

    let req = getMockReq({
      headers: { authorization: token },
    });

    verifytoken(req, res, nextFunction);
    expect(req.body.userToken).toEqual(tokenJwt);
  });
});
