import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Course } from './course.entity';
import { User } from './user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  rating: number;

  @Column()
  occupation: string;
  
  @Column('text')
  review: string;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Course, (course) => course.reviews, { onDelete: 'CASCADE' })
  course: Course;

  @CreateDateColumn()
  createdAt: Date;
}
