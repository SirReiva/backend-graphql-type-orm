import { Arg, Mutation, Resolver, FieldResolver, Root } from 'type-graphql';
import { ResponseGQL } from '../../interfaces/response';
import { MessageService } from '../../services/message.service';
import { CreateMessageDto, MessageType } from '../types/message.type';
import { IMessage } from '../../interfaces/message';
import { MessageResponse } from '../types/response.type';
import { RoomService } from '../../services/room.service';
import { UserService } from '../../services/user.service';

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
    room(@Root() message: any) {
        return RoomService.getRoomById(message.room);
    }

    @FieldResolver()
    from(@Root() message: any) {
        return UserService.getUserById(message.from);
    }
}
