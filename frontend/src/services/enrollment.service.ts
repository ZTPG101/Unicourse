import apiClient from '../api/ApiClient';

export type Enrollment = {
  id: number;
  user: any;
  course: any;
  progress?: number;
  createdAt?: string;
  updatedAt?: string;
};

export class EnrollmentService {

  static async createEnrollment(courseId: number): Promise<Enrollment> {
    return apiClient.post('/enrollments', { courseId });
  }

  static async getUserEnrollments(userId: number): Promise<Enrollment[]> {
    return apiClient.get(`/enrollments/user/${userId}`);
  }

  static async getEnrollmentById(id: number): Promise<Enrollment> {
    return apiClient.get(`/enrollments/${id}`);
  }

  // (Admin/Instructor) Fetches all enrollments in the system
  static async getAllEnrollments(): Promise<Enrollment[]> {
    return apiClient.get('/enrollments');
  }

  // (Admin/Instructor) Updates an enrollment record
  static async updateEnrollment(id: number, updateData: Partial<Enrollment>): Promise<Enrollment> {
    return apiClient.patch(`/enrollments/${id}`, updateData);
  }

  static async updateEnrollmentProgress(id: number, progress: number): Promise<Enrollment> {
    return apiClient.patch(`/enrollments/${id}/progress`, { progress });
  }

  static async deleteEnrollment(id: number): Promise<{ message: string }> {
    return apiClient.delete(`/enrollments/${id}`);
  }
}
