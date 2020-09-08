import { IMessage } from './message';
import { IRoom } from './room';

export interface IUser {
    id: string;
    name: string;
    password?: string;
    messages: (IMessage | string)[];
    avatar: string;
    rooms?: (IRoom | string)[];
}

export interface IResolverUser extends IUser {
    rooms?: string[];
}
