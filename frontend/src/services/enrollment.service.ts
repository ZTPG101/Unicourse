const API_BASE_URL = 'http://localhost:3000';

export type Enrollment = {
  id: number;
  user: any;
  course: any;
  progress?: number;
  createdAt?: string;
  updatedAt?: string;
};

export class EnrollmentService {
  static getToken() {
    return localStorage.getItem('token');
  }

  static async createEnrollment(courseId: number, token?: string): Promise<Enrollment> {
    const authToken = token || this.getToken();
    const response = await fetch(`${API_BASE_URL}/enrollments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify({ courseId }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }

  static async getEnrollmentById(id: number, token?: string): Promise<Enrollment> {
    const authToken = token || this.getToken();
    const response = await fetch(`${API_BASE_URL}/enrollments/${id}`, {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }

  // Only for admin/instructor
  static async getAllEnrollments(token?: string): Promise<Enrollment[]> {
    const authToken = token || this.getToken();
    const response = await fetch(`${API_BASE_URL}/enrollments`, {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }

  static async updateEnrollment(id: number, updateData: Partial<Enrollment>, token?: string): Promise<Enrollment> {
    const authToken = token || this.getToken();
    const response = await fetch(`${API_BASE_URL}/enrollments/${id}`, {
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

  static async updateEnrollmentProgress(id: number, progress: number, token?: string): Promise<Enrollment> {
    const authToken = token || this.getToken();
    const response = await fetch(`${API_BASE_URL}/enrollments/${id}/progress`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify({ progress }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }

  static async deleteEnrollment(id: number, token?: string): Promise<{ message: string }> {
    const authToken = token || this.getToken();
    const response = await fetch(`${API_BASE_URL}/enrollments/${id}`, {
      method: 'DELETE',
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }
}
