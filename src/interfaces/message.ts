import { IUser } from './user';
import { IRoom } from './room';

export interface IMessage {
	id: string;
	from: IUser | string;
	room: IRoom | string;
	payload: string;
	createdAt: string;
}

export interface IResolverMessage extends IMessage {
	from: string;
	room: string;
}
