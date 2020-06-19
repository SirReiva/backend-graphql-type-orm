import { Field, Int, ObjectType, ClassType } from 'type-graphql';
import { PaginatorResponseGQL, ResponseGQL } from '../../interfaces/response';
import { UserType } from './user.type';
import { MessageType } from './message.type';
import { RoomType } from './room.type';

function SingleResponse<TItem>(TItemClass: ClassType<TItem>) {
    @ObjectType({ isAbstract: true })
    abstract class ResponseClass implements ResponseGQL<TItem> {
        @Field((type) => TItemClass)
        result!: TItem;

        @Field(() => Boolean)
        flag!: boolean;

        @Field(() => [String], { nullable: true })
        errors!: string[];
    }
    return ResponseClass;
}

function PaginateResponse<TItem>(TItemClass: ClassType<TItem>) {
    @ObjectType({ isAbstract: true })
    abstract class ResponseClass implements PaginatorResponseGQL<TItem> {
        @Field(() => Int, { nullable: false })
        page!: number;

        @Field(() => Int, { nullable: false })
        pageSize!: number;

        @Field(() => Int, { nullable: false })
        total!: number;

        @Field(() => [UserType!], { nullable: false })
        items!: TItem[];
    }
    return ResponseClass;
}

@ObjectType('UserResponse')
export class UserResponse extends SingleResponse(UserType) {}

@ObjectType('JWTResponse')
export class JWTResponse extends SingleResponse(String) {}

@ObjectType('MessageResponse')
export class MessageResponse extends SingleResponse(MessageType) {}

@ObjectType('RoomResponse')
export class RoomResponse extends SingleResponse(RoomType) {}

@ObjectType('PaginationUserResponse')
export class PaginationUserResponse extends PaginateResponse(UserType) {}

@ObjectType('PaginationMessgeResponse')
export class PaginationMessgeResponse extends PaginateResponse(
    MessageResponse
) {}

@ObjectType('PaginationRoomResponse')
export class PaginationRoomResponse extends PaginateResponse(RoomType) {}
