import apiClient from "../api/ApiClient";

export type Course = {
  id: number;
  title: string;
  price: number;
  imageUrl?: string;
};

export type Cart = {
  id: number;
  items: Course[];
  status: string;
  createdAt: string;
};

export class CartService {
  
  static async getCart(): Promise<Cart | null> {
    return apiClient.get('/carts');
  }

  static async addItem(courseId: number): Promise<Cart> {
    return apiClient.post('/carts/items', { courseId });
  }

  static async removeItem(courseId: number): Promise<Cart> {
    return apiClient.delete(`/carts/items/${courseId}`);
  }

  static async clearCart(): Promise<Cart> {
    return apiClient.delete('/carts');
  }
}