// src/carts/cart.providers.ts
import { DataSource } from 'typeorm';
import { Cart } from '../database/entities/cart.entity';
import { Course } from '../database/entities/course.entity';

export const cartProviders = [
  {
    provide: 'CART_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cart),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'COURSE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Course),
    inject: ['DATA_SOURCE'],
  },
];
