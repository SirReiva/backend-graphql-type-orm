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
		const from = await UserService.getUserEnireById(idUser);
		const room = await RoomService.getRoomEntireById(idRoom);

		const message = MessageService.messageRepository.create({
			...messge,
			from,
			room,
		});
		const msg = await message.save();
		room.lastMessage = msg.id;
		const res = await MessageService.getMessageById(message.id);
		await room.save();
		return res;
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
