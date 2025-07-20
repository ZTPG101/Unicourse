import { Instructor } from "src/database/entities/instructor.entity";
import { User } from "src/database/entities/user.entity";
import { DataSource } from "typeorm";

export const instructorsProviders = [
  {
    provide: 'INSTRUCTOR_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Instructor),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];