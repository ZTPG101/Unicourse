// src/services/carts.service.ts
const API_BASE_URL = 'http://localhost:3000';

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
    try {
      const response = await fetch(`${API_BASE_URL}/carts/me`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching cart:', error);
      return null;
    }
  }

  static async addItem(courseId: number): Promise<Cart> {
    try {
      const response = await fetch(`${API_BASE_URL}/carts/me/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ courseId }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  }

  static async removeItem(courseId: number): Promise<Cart> {
    try {
      const response = await fetch(`${API_BASE_URL}/carts/me/items/${courseId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  }

  static async clearCart(): Promise<Cart> {
    try {
      const response = await fetch(`${API_BASE_URL}/carts/me`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
}
