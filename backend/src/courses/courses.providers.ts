import { Category } from "src/database/entities/category.entity";
import { Course } from "src/database/entities/course.entity";
import { User } from "src/database/entities/user.entity";
import { Instructor } from "src/database/entities/instructor.entity";
import { DataSource } from "typeorm";

export const coursesProviders = [
  {
    provide: 'COURSE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Course),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'INSTRUCTOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Instructor),
    inject: ['DATA_SOURCE'],
  },
];
