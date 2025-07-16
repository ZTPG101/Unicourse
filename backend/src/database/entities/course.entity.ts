import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { Lesson } from './lesson.entity';
import { Review } from './review.entity';
import { User } from './user.entity';
import { Category } from './category.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Category, (category) => category.courses, { eager: true })
  category: Category;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: 'Beginner' })
  level: string;

  @Column({ type: 'int', default: 0 })
  durationMinutes: number;

  @ManyToOne(() => User, (user) => user.courses, { eager: true })
  instructor: User;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  enrollments: Enrollment[];

  @OneToMany(() => Lesson, (lesson) => lesson.course, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  lessons: Lesson[];

  @OneToMany(() => Review, (review) => review.course, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  reviews: Review[];

  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviewCount: number;

  @Column({ default: 0 })
  lessonCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
