import { In, Repository } from 'typeorm';
import { InjectRepo } from '../decorators';
import { UserEntity } from '../entity/user.entity';
import { IUser } from '../interfaces/user';

export class UserService {
    @InjectRepo(UserEntity)
    private static userRepository: Repository<UserEntity>;

    static async createUser(input: Partial<IUser>): Promise<UserEntity> {
        const user = await UserService.userRepository.create({
            ...input,
        });
        await user.save();
        return await UserService.getUserById(user.id);
    }

    static async updateUser(
        id: string,
        input: Partial<IUser>
    ): Promise<UserEntity> {
        const user = await UserService.userRepository.findOneOrFail(id);
        UserService.userRepository.merge(user, input);
        return user.save();
    }

    static async getUsers(
        page: number = 1,
        pageSize: number = 10
    ): Promise<[UserEntity[], number]> {
        return await UserService.userRepository.findAndCount({
            order: { name: 'DESC' },
            take: pageSize,
            skip: page,
        });
    }

    static async getUserById(id: string): Promise<UserEntity> {
        return await UserService.userRepository.findOneOrFail(id, {
            loadRelationIds: true,
        });
    }

    static async getUsersByRoom(id: string) {
        return await UserService.userRepository.findAndCount({
            where: {
                rooms: In([id]),
            },
        });
    }

    static async login(name: string, password: string): Promise<string> {
        const user = await UserService.userRepository.findOneOrFail(undefined, {
            where: {
                name,
            },
        });
        if (!(await user.comparePassword(password))) {
            throw new Error('Error login');
        }
        return user.generateJWT();
    }
}
