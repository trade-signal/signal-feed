import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/databases/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
