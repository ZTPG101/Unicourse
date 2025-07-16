import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BillingDetails } from "./billingDetails.entity";
import { OrderItem } from "./orderItem.entity";
import { User } from "./user.entity";

// order.entity.ts (NestJS/TypeORM example)
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @OneToMany(() => OrderItem, item => item.order)
  items: OrderItem[];

  @Column()
  status: string; // e.g. 'pending', 'paid', 'shipped'

  @Column({ type: 'decimal' })
  total: number;

  @OneToOne(() => BillingDetails)
  @JoinColumn()
  billingDetails: BillingDetails;

  @CreateDateColumn()
  createdAt: Date;
}
