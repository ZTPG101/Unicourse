import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { User } from 'src/database/entities/user.entity';
import { OrderOwnerGuard } from 'src/auth/guards/order-owner.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(
    @CurrentUser() user: User,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    // The service will use user.id
    return this.ordersService.create(user.id, createOrderDto);
  }

  @Get()
  getMyOrders(@CurrentUser() user: User) {
    return this.ordersService.findAllByUserId(user.id);
  }

  @Get(':id')
  @UseGuards(OrderOwnerGuard)
  getMyOrder(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOneById(id);
  }
}
