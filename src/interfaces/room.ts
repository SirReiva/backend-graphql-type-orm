import { IUser } from './user';
import { IMessage } from './message';

export interface IRoom {
	id: string;
	name: string;
	members: (IUser | string)[];
	messages?: (IMessage | string)[];
	lastMessage?: IMessage | string;
}

export interface IResolverRoom extends IRoom {
	messages?: string[];
	members: string[];
}
