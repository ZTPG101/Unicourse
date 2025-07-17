import { OrderItem } from 'src/database/entities/orderItem.entity';
import { DataSource } from 'typeorm';

export const orderItemsProviders = [
  {
    provide: 'ORDER_ITEM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(OrderItem),
    inject: ['DATA_SOURCE'],
  }
];
