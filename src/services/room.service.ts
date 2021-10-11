import { Repository } from 'typeorm';
import { InjectRepo } from '../decorators';
import { RoomEntity } from '../entity/room.entity';
import { IRoom } from '../interfaces/room';
import { UserService } from './user.service';
import { isNumber } from 'util';
import { UserEntity } from '../entity/user.entity';

export class RoomService {
	@InjectRepo(RoomEntity)
	private static roomRepository: Repository<RoomEntity>;

	static async createRoom(
		idUser: string,
		input: Partial<IRoom>
	): Promise<RoomEntity> {
		const creator = await UserService.getUserById(idUser);

		const room = await RoomService.roomRepository.create({
			...input,
			members: [creator],
			messages: [],
		});
		await room.save();
		return await RoomService.getRoomById(room.id);
	}

	static getRoomById(id: string): Promise<RoomEntity> {
		return RoomService.roomRepository.findOneOrFail(id, {
			loadRelationIds: true,
		});
	}

	static getRoomEntireById(id: string): Promise<RoomEntity> {
		return RoomService.roomRepository.findOneOrFail(id);
	}

	static getRoomByIdAndUser(
		idRoom: string,
		user: UserEntity,
		relations: string[] = []
	) {
		return RoomService.roomRepository.findOneOrFail(idRoom, {
			relations: [...relations, 'members'],
			where: {
				members: user,
			},
		});
	}

	static async deleteRoom(id: string): Promise<Boolean> {
		const res = await RoomService.roomRepository.delete(id);
		return isNumber(res.affected) && res.affected > 0;
	}

	static getRoomsByIds(ids: string[]) {
		return RoomService.roomRepository.findByIds(ids, {
			loadRelationIds: true,
		});
	}
}
