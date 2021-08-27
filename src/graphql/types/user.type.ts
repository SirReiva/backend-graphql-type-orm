import { IUser } from '../../interfaces/user';
import { MessageType } from './message.type';
import { ObjectType, Field, ID, InputType } from 'type-graphql';
import { RoomType } from './room.type';

@ObjectType('User')
export class UserType implements IUser {
	@Field(() => ID, { nullable: false })
	id!: string;

	@Field(() => String, { nullable: false })
	name!: string;

	@Field(() => [MessageType], { nullable: false })
	messages!: MessageType[];

	@Field(() => String, { nullable: false })
	avatar!: string;

	@Field(() => [RoomType], { nullable: false })
	rooms!: RoomType[];
}

@InputType()
export class CreateUserDto {
	@Field()
	name!: string;

	@Field()
	password!: string;

	@Field(() => String, { nullable: true })
	avatar!: string;
}

@InputType()
export class LoginDto {
	@Field()
	name!: string;

	@Field()
	password!: string;
}
