import { Module } from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { ProductVariantsResolver } from './product-variants.resolver';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductVariant } from './product-variant.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariant]), ProductsModule],
  providers: [ProductVariantsService, ProductVariantsResolver],
  exports: [ProductVariantsService]
})
export class ProductVariantsModule {}
