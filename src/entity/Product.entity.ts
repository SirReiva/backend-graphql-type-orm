import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    BaseEntity,
    BeforeInsert,
} from 'typeorm';
import { Field, Int, ObjectType, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class Product extends BaseEntity {
    @BeforeInsert()
    beforei() {
        console.log('Insert');
    }

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name!: string;

    @Field(() => Int)
    @Column('int', { default: 0 })
    quantity!: number;

    @Field(() => String)
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: string;
}
