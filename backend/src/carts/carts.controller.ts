import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { SelfOrAdminGuard } from 'src/auth/guards/self-admin.guard';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  getMyCart(@CurrentUser() user) {
    return this.cartsService.getCartByUser(user);
  }

  @Post('me/items')
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  addItem(@CurrentUser() user, @Body('courseId') courseId: number) {
    return this.cartsService.addItem(user, courseId);
  }

  @Delete('me/items/:courseId')
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  removeItem(@CurrentUser() user, @Param('courseId') courseId: number) {
    return this.cartsService.removeItem(user, Number(courseId));
  }

  @Delete('me')
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  clearCart(@CurrentUser() user) {
    return this.cartsService.clearCart(user);
  }
}
