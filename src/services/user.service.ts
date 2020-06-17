import { getRepository, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { IUser } from '../interfaces/user';

export class UserService {
    private static _repo: Repository<UserEntity> | null = null;
    private static get userRepository() {
        if (!UserService._repo) UserService._repo = getRepository(UserEntity);
        return UserService._repo;
    }

    static async createUser(input: Partial<IUser>): Promise<UserEntity> {
        return await UserService.userRepository
            .create({
                ...input,
            })
            .save();
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
}
