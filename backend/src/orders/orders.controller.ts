import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { SelfOrAdminGuard } from 'src/auth/guards/self-admin.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../database/entities/user.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('me')
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  createOrder(@CurrentUser() user: User, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(user, createOrderDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  getMyOrders(@CurrentUser() user: User) {
    return this.ordersService.findAll(user);
  }

  @Get('me/:id')
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  getMyOrder(@CurrentUser() user: User, @Param('id') id: string) {
    return this.ordersService.findOne(user, Number(id));
  }
}
