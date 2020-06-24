import { Arg, Mutation, Resolver, FieldResolver, Root } from 'type-graphql';
import { ResponseGQL } from '../../interfaces/response';
import { MessageService } from '../../services/message.service';
import { CreateMessageDto, MessageType } from '../types/message.type';
import { IMessage } from '../../interfaces/message';
import { MessageResponse } from '../types/response.type';
import { RoomService } from '../../services/room.service';
import { UserService } from '../../services/user.service';
import { MessageEntity } from '../../entity/message.entity';
import { RoomEntity } from '../../entity/room.entity';
import { UserEntity } from '../../entity/user.entity';
import { reloadEntity } from '../../utils';

@Resolver(() => MessageType)
export class MessageResolver {
    @Mutation(() => MessageResponse)
    async postMessage(
        @Arg('input', () => CreateMessageDto) input: CreateMessageDto
    ): Promise<ResponseGQL<IMessage>> {
        try {
            const result = await MessageService.createMessage(
                input.from,
                input.room,
                {
                    payload: input.payload,
                }
            );
            return {
                flag: true,
                result,
            };
        } catch (error) {
            return {
                flag: false,
                errors: [error],
            };
        }
    }

    @FieldResolver()
    room(@Root() message: MessageEntity) {
        return message.room instanceof RoomEntity
            ? reloadEntity(message.room)
            : RoomService.getRoomById(message.room);
    }

    @FieldResolver()
    from(@Root() message: MessageEntity) {
        return message.from instanceof UserEntity
            ? reloadEntity(message.from)
            : UserService.getUserById(message.from);
    }
}
