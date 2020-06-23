import {
    Arg,
    Mutation,
    Query,
    Resolver,
    FieldResolver,
    Root,
} from 'type-graphql';
import { ResponseGQL } from '../../interfaces/response';
import { IRoom } from '../../interfaces/room';
import { RoomService } from '../../services/room.service';
import { RoomResponse } from '../types/response.type';
import { CreateRoomDto, RoomType } from '../types/room.type';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';

@Resolver(() => RoomType)
export class RoomResolver {
    @Query(() => String)
    hello() {
        return 'hello';
    }

    @Mutation(() => RoomResponse)
    async createRoom(
        @Arg('input', () => CreateRoomDto) input: CreateRoomDto
    ): Promise<ResponseGQL<IRoom>> {
        try {
            await RoomService.createRoom(input.creator, {
                name: input.name,
            });
            return {
                flag: true,
            };
        } catch (error) {
            return {
                flag: false,
                errors: [error],
            };
        }
    }

    @Query(() => RoomResponse)
    async getRoomById(
        @Arg('id', () => String) id: string
    ): Promise<ResponseGQL<IRoom>> {
        try {
            const result = await RoomService.getRoomById(id);
            return {
                flag: true,
                result,
            };
        } catch (error) {
            return {
                flag: false,
                errors: [error],
            };
        }
    }

    @Mutation(() => Boolean)
    async deleteRoom(@Arg('id', () => String) id: string): Promise<Boolean> {
        try {
            return await RoomService.deleteRoom(id);
        } catch (error) {
            return false;
        }
    }

    @FieldResolver()
    members(@Root() room: any) {
        return Promise.all(
            room.members.map((uId: string) => UserService.getUserById(uId))
        );
    }

    @FieldResolver()
    messages(@Root() room: any) {
        return Promise.all(
            room.messages.map((mId: string) =>
                MessageService.getMessageById(mId)
            )
        );
    }
}
