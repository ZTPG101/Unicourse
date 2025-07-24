const API_BASE_URL = "http://localhost:3000"; // Your backend API URL

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class ContactService {
  /**
   * Sends the contact form message to the backend API.
   * @param formData The user's input from the contact form.
   */
  static async sendMessage(
    formData: ContactFormData
  ): Promise<{ message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
      console.error("Error sending contact message:", error);
      throw error;
    }
  }
}
