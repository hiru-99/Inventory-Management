import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProductVariant } from 'src/product-variants/product-variant.entity';

@ObjectType()
@Entity()
export class Stock {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field()
  @Column()
  location: string;

  @Field(() => ProductVariant, { nullable: true })
  @ManyToOne(() => ProductVariant, (variant) => variant.stocks)
  variant?: ProductVariant;
}
