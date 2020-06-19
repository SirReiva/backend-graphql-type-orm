import { Arg, Mutation, Resolver } from 'type-graphql';
import { ResponseGQL } from '../../interfaces/response';
import { MessageService } from '../../services/message.service';
import { CreateMessageDto } from '../types/message.type';
import { IMessage } from '../../interfaces/message';
import { MessageResponse } from '../types/response.type';

@Resolver()
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
}
