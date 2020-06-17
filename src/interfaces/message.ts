import { IUser } from './user';

export interface IMessage {
    id: string;
    from: IUser;
    to: IUser;
    payload: string;
    createdAt: string;
}
