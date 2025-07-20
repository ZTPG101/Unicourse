import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Course } from './course.entity';

@Entity()
export class Instructor {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.instructor)
  @JoinColumn()
  user: User;

  @OneToMany(() => Course, (courses) => courses.instructor)
  courses: Course[];

  @Column()
  occupation: string;

  @Column({ type: 'text' })
  bio: string;

  @Column()
  education: string;
  // { degree: string; school: string; }

  @Column({ type: 'int', default: 0 })
  experience: number;

  @Column({ type: 'int', nullable: true })
  studentsTrained: number;

  @Column({ type: 'int', nullable: true })
  coursesCount: number;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true })
  pinterest: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  instagram: string;
}
