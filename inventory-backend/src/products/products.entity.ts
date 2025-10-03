import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductVariant } from 'src/product-variants/product-variant.entity';

@ObjectType()
@Entity()
export class Product {
    @Field(()=>Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({nullable: true})
  @Column({ nullable: true })
  description?: string;

    @Field(()=> Float)
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price: number;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => [ProductVariant], { nullable: true })
  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants: ProductVariant[];
}
