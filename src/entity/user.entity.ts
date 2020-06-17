import bcrypt from 'bcrypt';
import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IUser } from '../interfaces/user';
import { MessageEntity } from './message.entity';

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

    comparePassword(unencryptedPassword: string): Promise<boolean> {
        return bcrypt.compare(unencryptedPassword, this.password);
    }
}
