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

		const message = await MessageService.messageRepository.create({
			...messge,
			from,
			room,
		});
		await message.save();
		return await MessageService.getMessageById(message.id);
	}

	static getMesssgesByRoom(id: string) {
		return MessageService.messageRepository.findAndCount({
			loadRelationIds: true,
			where: {
				room: id,
			},
		});
	}

	static getMessageById(id: string) {
		return MessageService.messageRepository.findOneOrFail(id, {
			loadRelationIds: true,
		});
	}

	static getMessagessByIds(ids: string[]) {
		return MessageService.messageRepository.findByIds(ids, {
			loadRelationIds: true,
		});
	}
}
