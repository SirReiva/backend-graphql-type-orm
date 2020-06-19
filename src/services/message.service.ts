import { Repository, getRepository } from 'typeorm';
import { MessageEntity } from '../entity/message.entity';
import { IMessage } from '../interfaces/message';
import { UserService } from './user.service';
import { RoomService } from './room.service';
import { InjectRepo } from '../decorators';

export class MessageService {
    @InjectRepo(MessageEntity)
    private static messageRepository: Repository<MessageEntity>;

    static async createMessage(
        idUser: string,
        idRoom: string,
        messge: Partial<IMessage>
    ): Promise<MessageEntity> {
        const from = await UserService.getUserById(idUser);
        const room = await RoomService.getRoomById(idRoom);

        return await MessageService.messageRepository
            .create({
                ...messge,
                from,
                room,
            })
            .save();
    }

    static async getMesssgesByRoom(id: string) {
        return await MessageService.messageRepository.findAndCount({
            where: {
                room: id,
            },
        });
    }
}
