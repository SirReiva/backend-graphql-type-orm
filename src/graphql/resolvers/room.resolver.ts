import {
	Arg,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
} from 'type-graphql';
import { ResponseGQL } from '../../interfaces/response';
import { IResolverRoom, IRoom } from '../../interfaces/room';
import { MessageService } from '../../services/message.service';
import { RoomService } from '../../services/room.service';
import { UserService } from '../../services/user.service';
import { RoomResponse } from '../types/response.type';
import { CreateRoomDto, RoomType } from '../types/room.type';

@Resolver(() => RoomType)
export class RoomResolver {
	@Mutation(() => RoomResponse)
	async createRoom(
		@Arg('input', () => CreateRoomDto) input: CreateRoomDto
	): Promise<ResponseGQL<IRoom>> {
		try {
			const result = await RoomService.createRoom(input.creator, {
				name: input.name,
			});
			return {
				flag: true,
				result,
			};
		} catch (error) {
			return {
				flag: false,
				errors: ['' + error],
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
				errors: ['' + error],
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
	members(@Root() room: IResolverRoom) {
		return UserService.getUsersByIds(room.members);
	}

	@FieldResolver()
	messages(@Root() room: IResolverRoom) {
		if (!room.messages) return [];
		return MessageService.getMessagessByIds(room.messages);
	}
}
