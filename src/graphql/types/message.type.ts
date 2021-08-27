import { Field, ID, ObjectType, InputType } from 'type-graphql';
import { IMessage } from '../../interfaces/message';
import { RoomType } from './room.type';
import { UserType } from './user.type';

@ObjectType('Message')
export class MessageType implements IMessage {
	@Field(() => ID, { nullable: false })
	id!: string;

	@Field(() => RoomType, { nullable: false })
	room!: RoomType;

	@Field(() => UserType, { nullable: false })
	from!: UserType;

	@Field(() => String, { nullable: false })
	payload!: string;

	@Field(() => String, { nullable: false })
	createdAt!: string;
}

@InputType()
export class CreateMessageDto {
	@Field()
	payload!: string;

	@Field()
	room!: string;

	@Field()
	from!: string;
}
