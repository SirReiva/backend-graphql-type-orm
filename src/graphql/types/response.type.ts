import { ObjectType, Field } from 'type-graphql';
import { ResponseGQL } from '../../interfaces/response';

@ObjectType('Response')
export class ResponseGQLType implements ResponseGQL {
    @Field(() => Boolean, { nullable: false })
    flag!: boolean;

    @Field(() => [String!], { nullable: true })
    errors!: string[];
}
