import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [ProductsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',     
      password: 'postgres', 
      database: 'inventory_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // schema auto-generated
      playground: true, // enable GraphQL playground
    }),
    ProductVariantsModule,
    StockModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
