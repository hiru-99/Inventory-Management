import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './products.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  createProduct(
    @Args('name') name: string,   //without using arguements use objects
    @Args('description', { nullable: true }) description: string,
    @Args('price') price: number,
  ) {
    return this.productsService.create({ name, description, price }); 
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('name', { nullable: true }) name: string,
    @Args('description', { nullable: true }) description: string,
    @Args('price', { nullable: true }) price: number,
  ) {
    return this.productsService.update(id, { name, description, price });
  }

  @Mutation(() => Boolean)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }
}
