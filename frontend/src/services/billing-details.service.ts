import apiClient from "../api/ApiClient";

export interface BillingDetails {
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
}

export class BillingDetailsService {

  static async getBillingDetails(): Promise<BillingDetails | null> {
    return apiClient.get('/billing-details');
  }

  static async createBillingDetails(data: Omit<BillingDetails, "id">): Promise<BillingDetails> {
    return apiClient.post('/billing-details', data);
  }

  static async updateBillingDetails(data: Omit<BillingDetails, "id">): Promise<BillingDetails> {
    return apiClient.patch('/billing-details', data);
  }
}