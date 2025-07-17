import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { orderItemsProviders } from './order-items.providers';
import { OrderItemsService } from './order-items.service';

@Module({
  imports: [DatabaseModule],
  providers: [OrderItemsService, ...orderItemsProviders],
  exports: [OrderItemsService, ...orderItemsProviders],
})
export class OrderItemsModule {}
