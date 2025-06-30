import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Course } from './course.entity';
import { Enrollment } from './enrollment.entity';
import { Review } from './review.entity';

export type UserRole = 'admin' | 'instructure' | 'student';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: 'student' })
  role: UserRole;

  @Column({ nullable: true })
  provider: 'google' | 'facebook' | null;

  @Column({ nullable: true })
  providerId: string;

  @OneToMany(() => Course, (course) => course.instructor)
  courses: Course[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments: Enrollment[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
