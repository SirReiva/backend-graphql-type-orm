import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm';
import { IRoom } from '../interfaces/room';
import { UserEntity } from './user.entity';
import { MessageEntity } from './message.entity';

@Entity()
export class RoomEntity extends BaseEntity implements IRoom {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    name!: string;

    @ManyToMany((type) => UserEntity, (user) => user.rooms, {
        cascade: true,
    })
    @JoinTable()
    members!: UserEntity[];

    @OneToMany((type) => MessageEntity, (message) => message.room)
    messages!: MessageEntity[];
}
