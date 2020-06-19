import { Repository, getRepository } from 'typeorm';
import { RoomEntity } from '../entity/room.entity';
import { IRoom } from '../interfaces/room';
import { UserService } from './user.service';
import { InjectRepo } from '../decorators';

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
        return await RoomService.roomRepository.findOneOrFail(id);
    }
}
