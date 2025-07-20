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
  static getToken() {
    return localStorage.getItem('token');
  }

  static async getCart(): Promise<Cart | null> {
    try {
      const token = this.getToken();
      const response = await fetch(`${API_BASE_URL}/carts/me`, {
        ...(token && {
          headers: { Authorization: `Bearer ${token}` },
        }),
      });
      if (!response.ok) {
        let errorMsg = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMsg = errorData.message;
          }
        } catch (e) {
          // ignore JSON parse error
        }
        const error: any = new Error(errorMsg);
        error.status = response.status;
        throw error;
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  }

  static async addItem(courseId: number): Promise<Cart> {
    try {
      const token = this.getToken();
      const response = await fetch(`${API_BASE_URL}/carts/me/items`, {
        method: 'POST',
        headers: token
          ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
          : { 'Content-Type': 'application/json' },
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
      const token = this.getToken();
      const response = await fetch(`${API_BASE_URL}/carts/me/items/${courseId}`, {
        method: 'DELETE',
        ...(token && {
          headers: { Authorization: `Bearer ${token}` },
        }),
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
      const token = this.getToken();
      const response = await fetch(`${API_BASE_URL}/carts/me`, {
        method: 'DELETE',
        ...(token && {
          headers: { Authorization: `Bearer ${token}` },
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
}
