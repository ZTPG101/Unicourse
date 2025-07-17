const API_BASE_URL = 'http://localhost:3000';

export type BillingDetails = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
  note?: string;
};

export class BillingDetailsService {
  static getToken() {
    return localStorage.getItem('token');
  }

  static async createBillingDetails(data: Omit<BillingDetails, 'id'>): Promise<BillingDetails> {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/billing-details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }

  static async updateBillingDetails(id: number, data: Partial<BillingDetails>): Promise<BillingDetails> {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/billing-details/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }
} 