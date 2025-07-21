import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from '../database/entities/order.entity';
import { OrderItem } from '../database/entities/orderItem.entity';
import { BillingDetails } from '../database/entities/billingDetails.entity';
import { Cart } from '../database/entities/cart.entity';
import { Course } from '../database/entities/course.entity';
import { User } from '../database/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { EnrollmentsService } from '../enrollments/enrollments.service';
import { CreateEnrollmentDto } from '../enrollments/dto/create-enrollment.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private readonly orderRepo: Repository<Order>,
    @Inject('ORDER_ITEM_REPOSITORY')
    private readonly orderItemRepo: Repository<OrderItem>,
    @Inject('BILLING_DETAILS_REPOSITORY')
    private readonly billingDetailsRepo: Repository<BillingDetails>,
    @Inject('CART_REPOSITORY')
    private readonly cartRepo: Repository<Cart>,
    // @Inject('COURSE_REPOSITORY')
    // private readonly courseRepo: Repository<Course>,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  async create(user: User, dto: CreateOrderDto): Promise <Order | null> {
    const cart = await this.cartRepo.findOne({ where: { user, status: 'pending' }, relations: ['items'] });
    if (!cart || !cart.items.length) throw new Error('Cart is empty');

    const billingDetails = await this.billingDetailsRepo.findOne({ where: { id: dto.billingDetailsId } });
    if (!billingDetails) throw new Error('Billing details not found');

    const order = this.orderRepo.create({
      user,
      status: 'completed',
      billingDetails,
      total: cart.items.reduce((sum, course) => sum + Number(course.price || 0), 0),
      paypalOrderId: dto.paypalOrderId,
    });
    await this.orderRepo.save(order);

    for (const course of cart.items) {
      const orderItem = this.orderItemRepo.create({
        order,
        course,
        price: Number(course.price || 0),
      });
      await this.orderItemRepo.save(orderItem);

      try {
        await this.enrollmentsService.create({ courseId: course.id }, user.id);
      } catch (err) {
        throw new ConflictException('The course is already enrolled');
      }
    }

    cart.items = [];
    await this.cartRepo.save(cart);

    return this.orderRepo.findOne({ where: { id: order.id }, relations: ['items', 'billingDetails'] });
  }

  async findAll(user: User): Promise<Order[]> {
    return this.orderRepo.find({ where: { user }, relations: ['items', 'billingDetails'] });
  }

  async findOne(user: User, id: number): Promise <Order | null> {
    return this.orderRepo.findOne({ where: { id, user }, relations: ['items', 'billingDetails'] });
  }
}
