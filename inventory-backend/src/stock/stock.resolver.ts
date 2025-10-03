import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { StockService } from './stock.service';
import { Stock } from './stock.entity';

@Resolver(() => Stock)
export class StockResolver {
  constructor(private readonly service: StockService) {}

  @Query(() => [Stock])
  async stocks(@Args('variantId', { type: () => Int }) variantId: number) {
    return this.service.findByVariant(variantId);
  }

   @Query(() => [Stock])
  async allStocks() {
    return this.service.findAll();
  }

  @Mutation(() => Stock)
  async createStock(
    @Args('variantId', { type: () => Int }) variantId: number,
    @Args('quantity', { type: () => Int }) quantity: number,
    @Args('location', { type: () => String, nullable: true }) location?: string
  ) {
    return this.service.create(variantId, quantity, location);
  }

  @Mutation(() => Stock)
  async updateStock(
    @Args('id', { type: () => Int }) id: number,
    @Args('quantity', { type: () => Int }) quantity: number,
    @Args('location', { type: () => String, nullable: true }) location?: string
  ) {
    return this.service.update(id, quantity, location);
  }

  @Mutation(() => Boolean)
  async deleteStock(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}
