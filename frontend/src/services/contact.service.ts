import apiClient from "../api/ApiClient";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class ContactService {
  static async sendMessage(
    formData: ContactFormData
  ): Promise<{ message: string }> {
    return apiClient.post("/contact", { formData });
  }
}
