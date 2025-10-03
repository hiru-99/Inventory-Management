import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantsResolver } from './product-variants.resolver';

describe('ProductVariantsResolver', () => {
  let resolver: ProductVariantsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductVariantsResolver],
    }).compile();

    resolver = module.get<ProductVariantsResolver>(ProductVariantsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
