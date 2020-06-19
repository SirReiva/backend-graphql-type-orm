import {
    Arg,
    Mutation,
    Resolver,
    Int,
    Query,
    UseMiddleware,
} from 'type-graphql';
import { ResponseGQL, PaginatorResponseGQL } from '../../interfaces/response';
import { UserService } from '../../services/user.service';
import {
    UserResponse,
    PaginationUserResponse,
    JWTResponse,
} from '../types/response.type';
import { CreateUserDto, LoginDto } from '../types/user.type';
import { jwtAuth } from '../../middlewares/jwt.middleware';
import { IUser } from '../../interfaces/user';

@Resolver()
export class UserResolver {
    @Mutation(() => UserResponse)
    async createUser(
        @Arg('input', () => CreateUserDto) input: CreateUserDto
    ): Promise<ResponseGQL<IUser>> {
        try {
            const result = await UserService.createUser(input);
            result.password = '';
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

    @Query(() => JWTResponse)
    async login(
        @Arg('input', () => LoginDto)
        input: LoginDto
    ): Promise<ResponseGQL<string>> {
        try {
            const result = await UserService.login(input.name, input.password);
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

    @Mutation(() => UserResponse)
    @UseMiddleware(jwtAuth)
    async updateProduct(
        @Arg('id', () => String) id: string,
        @Arg('input', () => CreateUserDto)
        input: CreateUserDto
    ): Promise<ResponseGQL<IUser>> {
        try {
            const result = await UserService.updateUser(id, input);
            result.password = '';
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

    @Query(() => PaginationUserResponse)
    @UseMiddleware(jwtAuth)
    async products(
        @Arg('page', () => Int, { defaultValue: 1 }) page: number,
        @Arg('size', () => Int, { defaultValue: 10 }) pageSize: number
    ): Promise<PaginatorResponseGQL<IUser>> {
        const [items, total] = await UserService.getUsers(page, pageSize);
        return {
            items,
            total,
            page,
            pageSize,
        };
    }
}
