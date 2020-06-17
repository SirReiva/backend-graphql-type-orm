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

@Entity()
export class MessageEntity extends BaseEntity implements IMessage {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne((type) => UserEntity, (user) => user.messages)
    from!: UserEntity;

    @ManyToOne((type) => UserEntity, (user) => user.messages)
    to!: UserEntity;

    @Column()
    payload!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: string;
}
