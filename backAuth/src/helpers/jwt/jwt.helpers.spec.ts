import { describe, expect, it } from '@jest/globals';

//************* helpers *********************************//
import { generateToken, verifyToken, decodeToken } from './jwt.helpers';
import { User } from '../../models';

let tokenTest =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRva2VuIjoidG9rZW4ifSwiaWF0IjoxNjY5MDU5MzEyfQ.CEjKKKPSiSC5qE9NBPiXmycPZxIGlD2X7Zi0E5zBBRw';

describe('jwt methods token', () => {
  it('response success create token', () => {
    let info: User = {
      _id: 'id' as any,
      email: 'email',
      password: 'password',
    };

    let token = generateToken(info);
    expect(token).toBeDefined();
  });

  it('response success validate token', () => {
    let data = verifyToken(tokenTest);
    expect(data).toEqual({ iat: 1669059312, user: { token: 'token' } });
  });

  it('response success decode token', () => {
    let data = decodeToken(tokenTest);
    expect(data).toEqual({ iat: 1669059312, user: { token: 'token' } });
  });
});
