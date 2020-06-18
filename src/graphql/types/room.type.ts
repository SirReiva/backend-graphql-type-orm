import { IRoom } from '../../interfaces/room';
import { ObjectType, ID, Field } from 'type-graphql';
import { UserType } from './user.type';
import { MessageType } from './message.type';

@ObjectType('Room')
export class RoomType implements IRoom {
    @Field(() => ID, { nullable: false })
    id!: string;

    @Field(() => ID, { nullable: false })
    name!: string;

    @Field(() => [UserType], { nullable: false })
    members!: UserType[];

    @Field(() => [MessageType], { nullable: false })
    messages!: MessageType[];
}
