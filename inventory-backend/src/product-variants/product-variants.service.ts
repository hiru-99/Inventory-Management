import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariant } from './product-variant.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ProductVariantsService {
    constructor(
    @InjectRepository(ProductVariant) private productVariantRepository: Repository<ProductVariant>,
    private readonly productService: ProductsService,
  ) {}

  async findByProduct(productId: number) {
    return this.productVariantRepository.find({ where: { product: { id: productId } }, relations: ['stocks'] });
  }

  async findOne(id: number): Promise<ProductVariant> {
  const variant = await this.productVariantRepository.findOne({
    where: { id },
    relations: ['product', 'stocks'],
  });
  if (!variant) throw new NotFoundException(`Variant ${id} not found`);
  return variant;
}

  async create(productId: number, name: string, sku?: string, description?: string) {
    const product = await this.productService.findOne(productId);
    const variant = this.productVariantRepository.create({
        name, 
        product, 
        sku, 
        description, });
    return this.productVariantRepository.save(variant);
  }

  async update(id: number, 
    updateData: { name?: string; sku?: string; description?: string }) {
  const variant = await this.productVariantRepository.findOneBy({ id });
  if (!variant) throw new NotFoundException(`Variant ${id} not found`);
  Object.assign(variant, updateData);
  return this.productVariantRepository.save(variant);
}

  async remove(id: number): Promise<boolean> {
    await this.productVariantRepository.delete(id);
    return true;
  }
}