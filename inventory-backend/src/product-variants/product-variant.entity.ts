import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Product } from 'src/products/products.entity';
import { Stock } from 'src/stock/stock.entity';



@ObjectType()
@Entity()
export class ProductVariant {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.variants, {onDelete: 'CASCADE'})
  product: Product;

  @Field(() => [Stock], { nullable: true })
  @OneToMany(() => Stock, (stock) => stock.variant, {cascade:true})
  stocks: Stock[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  sku?: string;

   @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  
}
