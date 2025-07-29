import apiClient from "../api/ApiClient";

export interface Order {
  id: number;
  total: number;
  status: string;
  paypalOrderId?: string;
  createdAt: string;
  items: any[]; // Define OrderItem type later
  billingDetails: any; // Define BillingDetails type later
}

export interface CreateOrderDto {
  billingDetailsId: number;
  paypalOrderId?: string;
}

export class OrderService {

  static async createOrder(orderData: CreateOrderDto): Promise<Order> {
    return apiClient.post('/orders', orderData);
  }

  static async getMyOrders(): Promise<Order[]> {
    return apiClient.get('/orders');
  }

  static async getOrderById(id: number): Promise<Order> {
    return apiClient.get(`/orders/${id}`);
  }
}