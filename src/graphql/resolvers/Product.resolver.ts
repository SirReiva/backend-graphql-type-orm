import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Field,
    InputType,
    Int,
} from 'type-graphql';
import { Product } from '../../entity/Product.entity';

@InputType()
class CreateProductDto {
    @Field()
    name!: string;

    @Field()
    quantity!: number;
}

@InputType()
class ProductUpdateInputDto {
    @Field(() => String, { nullable: true })
    name?: string;

    @Field(() => Int, { nullable: true })
    quantity?: number;
}

@Resolver()
export class ProducdResolver {
    @Mutation(() => Product)
    async createProduct(
        @Arg('input', () => CreateProductDto) input: CreateProductDto
    ) {
        return await Product.create({
            ...input,
        }).save();
    }

    @Mutation(() => Product)
    async deleteProduct(@Arg('id', () => Int) id: number) {
        const product = await Product.findOne({
            id,
        });
        if (!product) return new Error('Product not found');
        product?.remove();
        return product;
    }

    @Mutation(() => Boolean)
    async updateProduct(
        @Arg('id', () => Int) id: number,
        @Arg('fields', () => ProductUpdateInputDto)
        fields: ProductUpdateInputDto
    ) {
        await Product.update({ id }, fields);
        return true;
    }

    @Query(() => [Product])
    async products() {
        return await Product.find();
    }
}
