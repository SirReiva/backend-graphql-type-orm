import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { IUser } from './user';

export interface AuthExpressContext extends ExpressContext {
	user?: Partial<IUser>;
}
