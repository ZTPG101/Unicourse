import { Session } from "src/database/entities/session.entity";
import { DataSource } from "typeorm";


export const sessionProviders = [
  {
    provide: 'SESSION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Session),
    inject: ['DATA_SOURCE'],
  },
];