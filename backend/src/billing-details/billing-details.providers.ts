import { BillingDetails } from 'src/database/entities/billingDetails.entity';
import { DataSource } from 'typeorm';

export const billingDetailsProviders = [
  {
    provide: 'BILLING_DETAILS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(BillingDetails),
    inject: ['DATA_SOURCE'],
  }
];
