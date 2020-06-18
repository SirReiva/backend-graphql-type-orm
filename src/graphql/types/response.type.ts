import { Field, Int, ObjectType } from 'type-graphql';
import { PaginatorResponseGQL, ResponseGQL } from '../../interfaces/response';
import { UserType } from './user.type';

@ObjectType('Response')
export class ResponseGQLType implements ResponseGQL {
    @Field(() => Boolean, { nullable: false })
    flag!: boolean;

    @Field(() => [String!], { nullable: true })
    errors!: string[];
}

@ObjectType('PaginationResponse')
export class PaginationResponse implements PaginatorResponseGQL {
    @Field(() => Int, { nullable: false })
    page!: number;

    @Field(() => Int, { nullable: false })
    pageSize!: number;

    @Field(() => Int, { nullable: false })
    total!: number;

    @Field(() => [UserType!], { nullable: false })
    items!: any[];
}

// const PaginateResultUnion = createUnionType({
//     name: 'ItemsResult',
//     types: () => [UserType, RoomType] as const,
// });
