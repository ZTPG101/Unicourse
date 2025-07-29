import apiClient from "../api/ApiClient";
import type { Instructor } from "./instructor.service";
import { mapBackendCourseToFrontend } from "./mappers/course.mapper";

// Types for the backend API response
export interface BackendCategory {
  id: number;
  name: string;
  description: string;
}

export interface BackendCourse {
  id: number;
  title: string;
  description: string;
  price: number;
  category: BackendCategory;
  imageUrl: string | null;
  level: string;
  durationMinutes: number;
  instructor: Instructor;
  rating: number;
  lessons: Lesson[];
  reviewCount: number;
  lessonCount: number;
  createdAt: string;
  updatedAt: string;
  learningObjectives: string[];
  requirements: Requirement[];
}

// Frontend course interface (mapped from backend)
export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Requirement {
  icon?: string;
  title: string;
  text: string;
}

export interface Course {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  level: string;
  lessonCount: number;
  duration: number; // in minutes
  category: Category;
  lessons: Lesson[];
  instructor: {
    id: number;
    name: string;
    image: string;
    experience: number;
    occupation?: string;
    bio?: string;
    education?: string;
    studentsTrained?: number;
    coursesCount?: number;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    pinterest?: string;
  };
  learningObjectives: string[];
  requirements: Requirement[];
  updatedAt: string;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  courseId: Course;
}

export class CoursesService {
  static async getAllCourses(filters: Record<string, any> = {}): Promise<Course[]> {
    const backendCourses: BackendCourse[] = await apiClient.get('/courses', {
      params: filters,
    });
    return backendCourses.map(mapBackendCourseToFrontend);
  }

  static async getCourseById(id: number): Promise<Course> {
    const backendCourse: BackendCourse = await apiClient.get(`/courses/${id}`);
    return mapBackendCourseToFrontend(backendCourse);
  }

  static async getCoursesMetadata(params = {}): Promise<any> {
    return apiClient.get('/courses/metadata', { params });
  }
}

export class CategoriesService {
  static async getAllCategories(): Promise<Category[]> {
    return apiClient.get('/categories');
  }
}
