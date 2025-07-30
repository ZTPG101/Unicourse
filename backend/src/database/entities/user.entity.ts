import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { Enrollment } from './enrollment.entity';
import { Review } from './review.entity';
import { Session } from './session.entity';
import { Cart } from './cart.entity';
import { Order } from './order.entity';
import { BillingDetails } from './billingDetails.entity';
import { Instructor } from './instructor.entity';
import { UserRole, UserRoleType } from 'src/auth/types/roles.enum';
import * as bcrypt from 'bcrypt';

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
    nullable: true,
  })
  role: UserRoleType;

  @OneToOne(() => Instructor, (instructor) => instructor.user)
  instructor: Instructor;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

  @OneToMany(() => Course, (course) => course.instructor)
  courses: Course[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments: Enrollment[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => BillingDetails, (billingDetails) => billingDetails.user)
  billingDetails: BillingDetails[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
