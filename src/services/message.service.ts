import { Repository } from 'typeorm';
import { InjectRepo } from '../decorators';
import { MessageEntity } from '../entity/message.entity';
import { IMessage } from '../interfaces/message';
import { RoomService } from './room.service';
import { UserService } from './user.service';

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
            loadRelationIds: true,
            where: {
                room: id,
            },
        });
    }

    static async getMessageById(id: string) {
        return await MessageService.messageRepository.findOneOrFail(id, {
            loadRelationIds: true,
        });
    }
}
