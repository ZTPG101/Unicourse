const API_BASE_URL = 'http://localhost:3000';

export type Order = {
  id: number;
  status: string;
  total: number;
  billingDetails: any;
  items: any[];
  createdAt: string;
};

export class OrderService {
  static getToken() {
    return localStorage.getItem('token');
  }

  static async placeOrder(billingDetailsId: number): Promise<Order> {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/orders/me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ billingDetailsId }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }
} 