import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Enrollment } from './enrollment.entity';
import { Instructor } from './instructor.entity';
import { Lesson } from './lesson.entity';
import { Review } from './review.entity';

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

  @ManyToOne(() => Instructor, (instructor) => instructor.courses, {
    eager: true,
  })
  instructor: Instructor;

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

  @Column({
    type: 'simple-json',
    nullable: true,
    default: '[]',
    comment:
      'Stores an array of strings detailing what the student will learn.',
  })
  learningObjectives: string[];

  @Column({
    type: 'simple-json',
    nullable: true,
    default: '[]',
    comment: 'Stores an array of objects for course requirements.',
  })
  requirements: { title: string; text: string; icon?: string }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
