const API_BASE_URL = 'http://localhost:3000';

export type Instructor = {
  id: number;
  user: any;
  occupation: string;
  bio: string;
  education: string;
  experience: number;
  studentsTrained?: number;
  coursesCount?: number;
  linkedin?: string;
  pinterest?: string;
  facebook?: string;
  instagram?: string;
  // Add createdAt, updatedAt if needed
};

export class InstructorService {
  static getToken() {
    return localStorage.getItem('token');
  }

  static async createInstructor(data: Partial<Instructor>, token?: string): Promise<Instructor> {
    const authToken = token || this.getToken();
    const response = await fetch(`${API_BASE_URL}/instructors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }

  static async getInstructorById(id: number, token?: string): Promise<Instructor> {
    const authToken = token || this.getToken();
    const response = await fetch(`${API_BASE_URL}/instructors/${id}`, {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }

  static async getAllInstructors(token?: string): Promise<Instructor[]> {
    const authToken = token || this.getToken();
    const response = await fetch(`${API_BASE_URL}/instructors`, {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }

  static async updateInstructor(id: number, updateData: Partial<Instructor>, token?: string): Promise<Instructor> {
    const authToken = token || this.getToken();
    const response = await fetch(`${API_BASE_URL}/instructors/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }

  static async deleteInstructor(id: number, token?: string): Promise<{ message: string }> {
    const authToken = token || this.getToken();
    const response = await fetch(`${API_BASE_URL}/instructors/${id}`, {
      method: 'DELETE',
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }
} 