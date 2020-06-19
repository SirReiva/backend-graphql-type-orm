import { IUser } from './user';
import { IMessage } from './message';

export interface IRoom {
    id: string;
    name: string;
    members: IUser[];
    messages: IMessage[];
}
