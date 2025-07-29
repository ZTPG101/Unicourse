import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { User } from 'src/database/entities/user.entity';

@Controller('carts')
@UseGuards(JwtAuthGuard, RolesGuard) // Apply guards for the whole controller
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  getCart(@CurrentUser() user: User) {
    return this.cartsService.getCartByUserId(user.id);
  }

  @Post('items')
  addItem(
    @CurrentUser() user: User,
    @Body('courseId', ParseIntPipe) courseId: number,
  ) {
    return this.cartsService.addItem(user.id, courseId);
  }

  @Delete('items/:courseId')
  removeItem(
    @CurrentUser() user: User,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    return this.cartsService.removeItem(user.id, courseId);
  }

  @Delete()
  clearCart(@CurrentUser() user: User) {
    return this.cartsService.clearCart(user.id);
  }
}