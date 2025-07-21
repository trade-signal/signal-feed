import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from './database.config';

@Module({
  imports: [TypeOrmModule.forRoot(postgresConfig)],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
