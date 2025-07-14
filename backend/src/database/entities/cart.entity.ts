import {
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { User } from './user.entity';
import { Course } from './course.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @ManyToMany(() => Course)
  @JoinTable({ name: 'cart_courses_course' })
  items: Course[];

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
