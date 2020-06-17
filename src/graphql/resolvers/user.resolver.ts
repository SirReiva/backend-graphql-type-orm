import {
    Arg,
    Mutation,
    Resolver,
    Int,
    Query,
    UseMiddleware,
} from 'type-graphql';
import { ResponseGQL } from '../../interfaces/response';
import { UserService } from '../../services/user.service';
import { ResponseGQLType, PaginationResponse } from '../types/response.type';
import { CreateUserDto } from '../types/user.type';
import { jwtAuth } from '../../middlewares/jwt.middleware';

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

    @Query(() => PaginationResponse)
    @UseMiddleware(jwtAuth)
    async products(
        @Arg('page', () => Int, { defaultValue: 1 }) page: number,
        @Arg('size', () => Int, { defaultValue: 10 }) pageSize: number
    ): Promise<PaginationResponse> {
        const [items, total] = await UserService.getUsers(page, pageSize);
        return {
            items,
            total,
            page,
            pageSize,
        };
    }
}
