import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { cartProviders } from './carts.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CartsController],
  providers: [CartsService, ...cartProviders],
  exports: [CartsService],
})
export class CartsModule {}
