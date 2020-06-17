import { Arg, Mutation, Resolver } from 'type-graphql';
import { ResponseGQL } from '../../interfaces/response';
import { UserService } from '../../services/user.service';
import { ResponseGQLType } from '../types/response.type';
import { CreateUserDto } from '../types/user.type';

@Resolver()
export class UserResolver {
    @Mutation(() => ResponseGQLType)
    async createUser(
        @Arg('input', () => CreateUserDto) input: CreateUserDto
    ): Promise<ResponseGQL> {
        try {
            await UserService.createUser(input);
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

    @Mutation(() => Boolean)
    async updateProduct(
        @Arg('id', () => String) id: string,
        @Arg('fields', () => CreateUserDto)
        fields: CreateUserDto
    ): Promise<ResponseGQL> {
        try {
            await UserService.updateUser(id, fields);
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
