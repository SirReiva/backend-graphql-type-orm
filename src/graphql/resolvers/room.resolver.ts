import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { ResponseGQL } from '../../interfaces/response';
import { IRoom } from '../../interfaces/room';
import { RoomService } from '../../services/room.service';
import { RoomResponse } from '../types/response.type';
import { CreateRoomDto } from '../types/room.type';

@Resolver()
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
}
