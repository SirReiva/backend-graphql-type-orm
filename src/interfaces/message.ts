import { IUser } from './user';
import { IRoom } from './room';

export interface IMessage {
    id: string;
    from: IUser;
    room: IRoom;
    payload: string;
    createdAt: string;
}
