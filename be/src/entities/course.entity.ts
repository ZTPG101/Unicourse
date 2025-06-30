import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Enrollment } from './enrollment.entity';
import { Review } from './review.entity';
import { Lesson } from './lesson.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 'general' })
  category: string;

  @ManyToOne(() => User, (user) => user.courses, { eager: true })
  instructor: User;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];

  @OneToMany(() => Review, (review) => review.course)
  reviews: Review[];

  @Column({ default: 0 })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
