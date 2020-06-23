import {
    Arg,
    FieldResolver,
    Int,
    Mutation,
    Query,
    Resolver,
    Root,
    UseMiddleware,
} from 'type-graphql';
import { PaginatorResponseGQL, ResponseGQL } from '../../interfaces/response';
import { IUser } from '../../interfaces/user';
import { jwtAuth } from '../../middlewares/jwt.middleware';
import { RoomService } from '../../services/room.service';
import { UserService } from '../../services/user.service';
import {
    JWTResponse,
    PaginationUserResponse,
    UserResponse,
} from '../types/response.type';
import { CreateUserDto, LoginDto, UserType } from '../types/user.type';

@Resolver(() => UserType)
export class UserResolver {
    @Mutation(() => UserResponse)
    async createUser(
        @Arg('input', () => CreateUserDto) input: CreateUserDto
    ): Promise<ResponseGQL<IUser>> {
        try {
            const result = await UserService.createUser(input);
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

    @Query(() => UserResponse)
    async getUserById(
        @Arg('id', () => String) id: string
    ): Promise<ResponseGQL<IUser>> {
        try {
            const result = await UserService.getUserById(id);
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
    async updateUser(
        @Arg('id', () => String) id: string,
        @Arg('input', () => CreateUserDto)
        input: CreateUserDto
    ): Promise<ResponseGQL<IUser>> {
        try {
            const result = await UserService.updateUser(id, input);
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
    async users(
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

    @FieldResolver()
    rooms(@Root() user: any) {
        return Promise.all(
            user.rooms.map((room: string) => RoomService.getRoomById(room))
        );
    }
}
