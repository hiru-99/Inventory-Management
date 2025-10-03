import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { ProductVariant } from './product-variant.entity';
import { ProductVariantsService } from './product-variants.service';

@Resolver(()=> ProductVariant)
export class ProductVariantsResolver {
    constructor(private readonly service: ProductVariantsService) {}

  @Query(() => [ProductVariant])
  variants(@Args('productId', { type: () => Int }) productId: number) {
    return this.service.findByProduct(productId);
  }

  @Mutation(() => ProductVariant)
  createVariant(@Args('productId', { type: () => Int }) productId: number, 
  @Args('name') name: string,
  @Args('sku', { nullable: true }) sku?: string,
  @Args('description', { nullable: true }) description?: string) {
    return this.service.create(productId, name, sku, description);
  }

  @Mutation(() => ProductVariant)
  updateVariant(@Args('id', { type: () => Int }) id: number, 
  @Args('name') name: string,
  @Args('sku', { nullable: true }) sku?: string,
  @Args('description', { nullable: true }) description?: string) {
    return this.service.update(id, { name, sku, description });
  }

  @Mutation(() => Boolean)
  deleteVariant(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}
