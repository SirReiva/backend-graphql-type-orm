import { IMessage } from '../../interfaces/message';
import { ObjectType, Field, ID } from 'type-graphql';
import { UserType } from './user.type';

@ObjectType('Message')
export class MessageType implements IMessage {
    @Field(() => ID, { nullable: false })
    id!: string;

    @Field(() => UserType, { nullable: false })
    from!: UserType;

    @Field(() => UserType, { nullable: false })
    to!: UserType;

    @Field(() => String, { nullable: false })
    payload!: string;

    @Field(() => String, { nullable: false })
    createdAt!: string;
}
