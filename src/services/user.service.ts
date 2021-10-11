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

	static getUsers(
		page: number = 1,
		pageSize: number = 10
	): Promise<[UserEntity[], number]> {
		return UserService.userRepository.findAndCount({
			order: { name: 'DESC' },
			take: pageSize,
			skip: page,
		});
	}

	static getUserById(id: string): Promise<UserEntity> {
		return UserService.userRepository.findOneOrFail(id, {
			loadRelationIds: true,
		});
	}

	static getUserEnireById(id: string): Promise<UserEntity> {
		return UserService.userRepository.findOneOrFail(id);
	}

	static getUsersByRoom(id: string) {
		return UserService.userRepository.findAndCount({
			where: {
				rooms: In([id]),
			},
		});
	}

	static async login(name: string, password: string): Promise<string> {
		const query = UserService.userRepository.createQueryBuilder();
		query.where('user.id = :id', { id: 1 });

		const user = await UserService.userRepository.findOneOrFail(undefined, {
			select: ['password', 'name'],
			where: {
				name,
			},
		});
		if (!(await user.comparePassword(password))) {
			throw new Error('Error login');
		}
		return user.generateJWT();
	}

	static getUsersByIds(ids: string[]) {
		return UserService.userRepository.findByIds(ids, {
			loadRelationIds: true,
		});
	}
}
