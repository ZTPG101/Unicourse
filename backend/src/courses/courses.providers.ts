import { Course } from "src/database/entities/course.entity";
import { DataSource } from "typeorm";

export const coursesProviders = [
  {
    provide: 'COURSE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Course),
    inject: ['DATA_SOURCE'],
  },
];
