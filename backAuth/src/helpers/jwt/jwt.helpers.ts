import jwt from 'jsonwebtoken';
import { User } from '../../models';
const { JWT_SECRET } = process.env;

export const generateToken = (payload: User) => {
  return jwt.sign(payload, `${JWT_SECRET}`, {
    expiresIn: '1d',
  });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, `${JWT_SECRET}`);
};

export const decodeToken = (token: string) => {
    return jwt.decode(token);
};