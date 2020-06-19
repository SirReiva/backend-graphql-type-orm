import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IMessage } from '../interfaces/message';
import { UserEntity } from './user.entity';
import { RoomEntity } from './room.entity';

@Entity()
export class MessageEntity extends BaseEntity implements IMessage {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne((type) => RoomEntity, (room) => room)
    room!: RoomEntity;

    @ManyToOne((type) => UserEntity, (user) => user.messages)
    from!: UserEntity;

    @Column()
    payload!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: string;
}
