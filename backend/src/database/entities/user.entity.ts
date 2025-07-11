import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { Enrollment } from './enrollment.entity';
import { Review } from './review.entity';

import * as bcrypt from 'bcrypt';
import { Session } from './session.entity';
import { UserRole, UserRoleType } from 'src/auth/types/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ 
    type: 'varchar',
    length: 20,
    default: UserRole.STUDENT,
    nullable: true 
  })
  role: UserRoleType;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  experience: number;

  // @Column({ nullable: true })
  // provider: 'google' | 'facebook' | null;

  // @Column({ nullable: true })
  // providerId: string;
  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
