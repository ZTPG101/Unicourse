import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cart } from '../database/entities/cart.entity';
import { User } from '../database/entities/user.entity';
import { Course } from '../database/entities/course.entity';

@Injectable()
export class CartsService {
  constructor(
    @Inject('CART_REPOSITORY')
    private readonly cartRepo: Repository<Cart>,
    @Inject('COURSE_REPOSITORY')
    private readonly courseRepo: Repository<Course>,
  ) {}

  async getCartByUser(user: User) {
    return this.cartRepo.findOne({
      where: { user, status: 'pending' },
      relations: ['items'],
    });
  }

  async addItem(user: User, courseId: number) {
    const course = await this.courseRepo.findOne({ where: { id: courseId } });
    if (!course) throw new Error('Course not found');
    let cart = await this.getCartByUser(user);
    if (!cart) {
      cart = this.cartRepo.create({ user, items: [course] });
    } else {
      // Prevent duplicate items
      if (!cart.items.some(item => item.id === course.id)) {
        cart.items.push(course);
      }
    }
    return this.cartRepo.save(cart);
  }

  async removeItem(user: User, courseId: number) {
    const cart = await this.getCartByUser(user);
    if (!cart) return null;
    cart.items = cart.items.filter((item) => item.id !== courseId);
    return this.cartRepo.save(cart);
  }

  async clearCart(user: User) {
    const cart = await this.getCartByUser(user);
    if (!cart) return null;
    cart.items = [];
    return this.cartRepo.save(cart);
  }
}
