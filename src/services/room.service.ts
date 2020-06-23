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

        return await RoomService.roomRepository
            .create({
                ...input,
                members: [creator],
                messages: [],
            })
            .save();
    }

    static async getRoomById(id: string): Promise<RoomEntity> {
        return await RoomService.roomRepository.findOneOrFail(id, {
            loadRelationIds: true,
        });
    }

    static async getRoomByIdAndUser(
        idRoom: string,
        user: UserEntity,
        relations: string[] = []
    ) {
        return await RoomService.roomRepository.findOneOrFail(idRoom, {
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
}