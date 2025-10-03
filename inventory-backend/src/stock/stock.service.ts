import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './stock.entity';
import { ProductVariantsService } from 'src/product-variants/product-variants.service';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock) private stockRepository: Repository<Stock>,
    private readonly variantService: ProductVariantsService,
  ) {}

  async findByVariant(variantId: number): Promise<Stock[]> {
  return this.stockRepository.find({
    where: { variant: { id: variantId } },
    relations: ['variant', 'variant.product'], 
  });
}

  findAll(): Promise<Stock[]> {
    return this.stockRepository.find({ relations: ['variant', 'variant.product'] });
  }

  async create(variantId: number, quantity: number, location: string) {
    const variant = await this.variantService.findOne(variantId); 
    if (!variant) throw new NotFoundException(`Variant ${variantId} not found`);
    const stock = this.stockRepository.create({ quantity, location, variant });
    return this.stockRepository.save(stock);
  }

  async update(id: number, quantity: number, location: string) {
    const stock = await this.stockRepository.findOneBy({ id });
    if (!stock) throw new NotFoundException(`Stock ${id} not found`);
    stock.quantity = quantity;
    stock.location = location;
    return this.stockRepository.save(stock);
  }

  async remove(id: number): Promise<boolean> {
    await this.stockRepository.delete(id);
    return true;
  }
}
