import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import config from '../config';
import { AuthExpressContext } from '../interfaces/authExpressContext';
import { IUser } from '../interfaces/user';

const decodeToken = (token: string): Promise<Partial<IUser>> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if (err) return reject('Not valid token');
            return resolve(decoded);
        });
    });
};

export const isAuth: MiddlewareFn<AuthExpressContext> = async (
    { context },
    next
) => {
    try {
        const authorization = context.req.headers['authorization'];

        if (!authorization) {
            throw new AuthenticationError('Not authenticated');
        }
        const token = authorization.split(' ')[1];
        const payload = await decodeToken(token);
        context.user = payload;
    } catch (err) {
        console.log(err);
        throw new AuthenticationError(err || 'Not authenticated');
    }
    return next();
};
