import { Arg, FieldResolver, Mutation, Resolver, Root } from 'type-graphql';
import { IMessage, IResolverMessage } from '../../interfaces/message';
import { ResponseGQL } from '../../interfaces/response';
import { MessageService } from '../../services/message.service';
import { RoomService } from '../../services/room.service';
import { UserService } from '../../services/user.service';
import { CreateMessageDto, MessageType } from '../types/message.type';
import { MessageResponse } from '../types/response.type';

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
    room(@Root() message: IResolverMessage) {
        return RoomService.getRoomById(message.id);
    }

    @FieldResolver()
    from(@Root() message: IResolverMessage) {
        return UserService.getUserById(message.id);
    }
}
