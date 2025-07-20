import { BillingDetails } from 'src/database/entities/billingDetails.entity';
import { Cart } from 'src/database/entities/cart.entity';
import { Enrollment } from 'src/database/entities/enrollment.entity';
import { Order } from 'src/database/entities/order.entity';
import { OrderItem } from 'src/database/entities/orderItem.entity';
import { DataSource } from 'typeorm';

export const ordersProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ORDER_ITEM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(OrderItem),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'BILLING_DETAILS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(BillingDetails),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CART_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cart),
    inject: ['DATA_SOURCE'],
  },
];
