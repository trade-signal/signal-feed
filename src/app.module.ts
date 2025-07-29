import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { DatabaseModule } from 'src/common/databases/database.module';
import { StockModule } from 'src/modules/stocks-a/stock.module';

@Module({
  imports: [
    DatabaseModule,
    StockModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql', // 生成 schema 文件
      playground: true, // 开发环境启用 GraphQL Playground
      introspection: true, // 启用 introspection
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
