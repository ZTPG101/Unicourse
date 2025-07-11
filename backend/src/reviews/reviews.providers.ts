import { Review } from 'src/database/entities/review.entity';
import { DataSource } from 'typeorm';

export const reviewsProviders = [
  {
    provide: 'REVIEW_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Review),
    inject: ['DATA_SOURCE'],
  },
];
