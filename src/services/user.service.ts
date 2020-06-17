import { getRepository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { IUser } from '../interfaces/user';

/*
async findAll(query): Promise<Paginate> {
    const take = query.take || 10
    const skip = query.skip || 0
    const keyword = query.keyword || ''

    const [result, total] = await this.userRepository.findAndCount(
        {
            where: { name: Like('%' + keyword + '%') }, order: { name: "DESC" },
            take: take,
            skip: skip
        }
    );

    return {
        data: result,
        count: total
    }
}
*/

export class UserService {
    private static userRepository = getRepository(UserEntity);

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
}
