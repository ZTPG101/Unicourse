import { Module } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { DatabaseModule } from 'src/database/database.module';
import { categoryProviders } from './categories.providers';
import { CategoryController } from './categories.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService, ...categoryProviders],
  exports: [CategoryService, ...categoryProviders],
})
export class CategoryModule {}
