import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BillingDetails } from "./billingDetails.entity";
import { OrderItem } from "./orderItem.entity";
import { User } from "./user.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @OneToMany(() => OrderItem, item => item.order)
  items: OrderItem[];

  @Column()
  status: string;

  @Column({ type: 'decimal' })
  total: number;

  @Column({ unique: true, nullable: true })
  paypalOrderId: string;

  @OneToOne(() => BillingDetails)
  @JoinColumn()
  billingDetails: BillingDetails;

  @CreateDateColumn()
  createdAt: Date;
}
