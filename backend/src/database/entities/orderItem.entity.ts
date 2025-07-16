import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";
import { Order } from "./order.entity";
import { Course } from "./course.entity";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.items)
  order: Order;

  @ManyToOne(() => Course)
  course: Course;

  @Column({ type: 'decimal' })
  price: number;

  @CreateDateColumn()
  createdAt: Date;
} 