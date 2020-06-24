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
import { RoomEntity } from '../../entity/room.entity';
import { UserEntity } from '../../entity/user.entity';
import { MessageEntity } from '../../entity/message.entity';
import { reloadEntity } from '../../utils';

@Resolver(() => RoomType)
export class RoomResolver {
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
    async members(@Root() room: RoomEntity) {
        return Promise.all(
            room.members.map((input) =>
                input instanceof UserEntity
                    ? reloadEntity(input)
                    : UserService.getUserById(input)
            )
        );
    }

    @FieldResolver()
    messages(@Root() room: RoomEntity) {
        return Promise.all(
            room.messages.map((input) =>
                input instanceof MessageEntity
                    ? reloadEntity(input)
                    : MessageService.getMessageById(input)
            )
        );
    }
}
