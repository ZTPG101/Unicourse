import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ordersProviders } from './orders.providers';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module';

@Module({
  imports: [DatabaseModule, EnrollmentsModule],
  controllers: [OrdersController],
  providers: [OrdersService, ...ordersProviders],
  exports: [OrdersService, ...ordersProviders],
})
export class OrdersModule {}
