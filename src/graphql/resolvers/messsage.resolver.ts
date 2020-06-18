import { Resolver, Mutation, Arg } from 'type-graphql';
import { ResponseGQLType } from '../types/response.type';
import { CreateMessageDto } from '../types/message.type';
import { MessageService } from '../../services/message.service';
import { ResponseGQL } from '../../interfaces/response';

@Resolver()
export class MessageResolver {
    @Mutation(() => ResponseGQLType)
    async postMessage(
        @Arg('input', () => CreateMessageDto) input: CreateMessageDto
    ): Promise<ResponseGQL> {
        try {
            await MessageService.createMessage(input as any);
            return {
                flag: true,
            };
        } catch (error) {
            return {
                flag: false,
                errors: [error],
            };
        }
    }
}
