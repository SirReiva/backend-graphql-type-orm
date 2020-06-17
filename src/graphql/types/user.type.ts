import { IUser } from '../../interfaces/user';
import { MessageType } from './message.type';
import { ObjectType, Field, ID, InputType } from 'type-graphql';

@ObjectType('User')
export class UserType implements IUser {
    @Field(() => ID, { nullable: false })
    id!: string;

    @Field(() => [MessageType], { nullable: false })
    messages!: MessageType[];

    @Field(() => String, { nullable: false })
    name!: string;

    @Field(() => String, { nullable: false })
    password!: string;

    @Field(() => String, { nullable: false })
    avatar!: string;
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
