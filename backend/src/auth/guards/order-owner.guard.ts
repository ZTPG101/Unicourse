import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class OrderOwnerGuard implements CanActivate {
  constructor(private readonly ordersService: OrdersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const orderId = parseInt(request.params.id, 10);

    if (!user || isNaN(orderId)) {
      return false; // Or throw a BadRequestException
    }

    const order = await this.ordersService.findOneByIdAndUserId(orderId, user.id);

    if (order) {
      return true;
    }

    throw new ForbiddenException('You do not have permission to view this order.');
  }
}