import { IMessage } from './message';

export interface IUser {
    id: string;
    name: string;
    password: string;
    messages: Array<IMessage>;
}
