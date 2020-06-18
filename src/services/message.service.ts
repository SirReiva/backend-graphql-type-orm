import { Repository, getRepository } from 'typeorm';
import { MessageEntity } from '../entity/message.entity';
import { IMessage } from '../interfaces/message';

export class MessageService {
    private static _repo: Repository<MessageEntity> | null = null;
    private static get messageRepository() {
        if (!MessageService._repo)
            MessageService._repo = getRepository(MessageEntity);
        return MessageService._repo;
    }

    static async createMessage(
        messge: Partial<IMessage>
    ): Promise<MessageEntity> {
        return await MessageService.messageRepository
            .create({
                ...messge,
            })
            .save();
    }
}
