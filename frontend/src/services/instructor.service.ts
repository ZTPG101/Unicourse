import apiClient from "../api/ApiClient";

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
};

export type UpsertInstructorDto = Omit<Instructor, "id" | "user">;

export class InstructorService {
  static async createInstructor(
    data: UpsertInstructorDto
  ): Promise<Instructor> {
    return apiClient.post("/instructors", data);
  }

  static async getInstructorById(id: number): Promise<Instructor> {
    return apiClient.get(`/instructors/${id}`);
  }

  static async getAllInstructors(): Promise<Instructor[]> {
    return apiClient.get("/instructors");
  }

  static async updateInstructor(
    id: number,
    updateData: Partial<UpsertInstructorDto>
  ): Promise<Instructor> {
    return apiClient.patch(`/instructors/${id}`, updateData);
  }

  static async deleteInstructor(id: number): Promise<{ message: string }> {
    return apiClient.delete(`/instructors/${id}`);
  }
}
