import { Injectable } from '@nestjs/common';

// Order items are managed via orders and not exposed as standalone CRUD services.
@Injectable()
export class OrderItemsService {
  constructor() {}
}
