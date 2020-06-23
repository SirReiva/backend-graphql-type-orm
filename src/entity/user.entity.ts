import bcrypt from 'bcrypt';
import {
    BaseEntity,
    BeforeInsert,
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IUser } from '../interfaces/user';
import { MessageEntity } from './message.entity';
import { RoomEntity } from './room.entity';
import jwt from 'jsonwebtoken';
import config from '../config';

@Entity()
export class UserEntity extends BaseEntity implements IUser {
    @BeforeInsert()
    async onInsert() {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        unique: true,
    })
    name!: string;

    @Column({ select: false })
    password!: string;

    @OneToMany((type) => MessageEntity, (message) => message.from)
    messages!: MessageEntity[];

    @Column({
        default: 'nophoto.png',
    })
    avatar!: string;

    @ManyToMany((type) => RoomEntity, (room) => room.members)
    rooms!: RoomEntity[];

    comparePassword(unencryptedPassword: string): Promise<boolean> {
        return bcrypt.compare(unencryptedPassword, this.password);
    }

    generateJWT() {
        return jwt.sign(
            {
                name: this.name,
                avatar: this.avatar,
            },
            config.JWT_SECRET,
            {
                expiresIn: config.JWT_LIFE,
            }
        );
    }
}
