import { describe, expect, it } from '@jest/globals';

//************* helpers *********************************//
import { decodeToken } from './jwt.helpers';

let tokenTest =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRva2VuIjoidG9rZW4ifSwiaWF0IjoxNjY5MDU5MzEyfQ.CEjKKKPSiSC5qE9NBPiXmycPZxIGlD2X7Zi0E5zBBRw';

describe('jwt methods token', () => {
  it('response success decode token', () => {
    let data = decodeToken(tokenTest);
    expect(data).toEqual({ iat: 1669059312, user: { token: 'token' } });
  });
});
