import { Module } from '@nestjs/common';
import { BillingDetailsService } from './billing-details.service';
import { BillingDetailsController } from './billing-details.controller';
import { DatabaseModule } from 'src/database/database.module';
import { billingDetailsProviders } from './billing-details.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BillingDetailsController],
  providers: [BillingDetailsService, ...billingDetailsProviders],
  exports: [BillingDetailsService, ...billingDetailsProviders],
})
export class BillingDetailsModule {}
