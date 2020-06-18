import bcrypt from 'bcrypt';
import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    ManyToMany,
} from 'typeorm';
import { IUser } from '../interfaces/user';
import { MessageEntity } from './message.entity';
import { RoomEntity } from './room.entity';

@Entity()
export class UserEntity extends BaseEntity implements IUser {
    @BeforeInsert()
    async onInsert() {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }

    @BeforeUpdate()
    updateDates() {}

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
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
}
