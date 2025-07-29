import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Course } from 'src/database/entities/course.entity';
import { User } from 'src/database/entities/user.entity';
import { Cart } from 'src/database/entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @Inject('CART_REPOSITORY')
    private readonly cartRepo: Repository<Cart>,
    @Inject('COURSE_REPOSITORY')
    private readonly courseRepo: Repository<Course>,
  ) {}

  async getCartByUserId(userId: number) {
    return this.cartRepo.findOne({
      where: { user: { id: userId }, status: 'pending' },
      relations: ['items'],
    });
  }

  async addItem(userId: number, courseId: number) {
    const course = await this.courseRepo.findOne({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    let cart = await this.getCartByUserId(userId);

    if (!cart) {
      cart = this.cartRepo.create({ user: { id: userId }, items: [course] });
    } else {
      if (!cart.items.some((item) => item.id === course.id)) {
        cart.items.push(course);
      }
    }
    return this.cartRepo.save(cart);
  }

  async removeItem(userId: number, courseId: number) {
    const cart = await this.getCartByUserId(userId);
    if (!cart) {
      throw new NotFoundException('This course does not exist')
    }
    cart.items = cart.items.filter((item) => item.id !== courseId);
    return this.cartRepo.save(cart);
  }

  async clearCart(userId: number) {
    const cart = await this.getCartByUserId(userId);
    if (!cart) {
      return null;
    }
    cart.items = [];
    return this.cartRepo.save(cart);
  }
}