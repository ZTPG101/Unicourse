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

  static async placeOrder(
    billingDetailsId: number,
    paypalOrderId: string,
  ): Promise<Order> {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/orders/me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ billingDetailsId, paypalOrderId }),
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
  }
} 