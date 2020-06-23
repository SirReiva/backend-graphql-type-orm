import { IMessage } from './message';
import { IRoom } from './room';

export interface IUser {
    id: string;
    name: string;
    password?: string;
    messages: Array<IMessage>;
    avatar: string;
    rooms: IRoom[];
}
