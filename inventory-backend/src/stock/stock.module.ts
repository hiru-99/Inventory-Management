import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockResolver } from './stock.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './stock.entity';
import { ProductVariantsModule } from 'src/product-variants/product-variants.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stock]), ProductVariantsModule],
  providers: [StockService, StockResolver],
})
export class StockModule {}
