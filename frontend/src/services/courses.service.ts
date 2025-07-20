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
}

// Frontend course interface (mapped from backend)
export interface Category {
  id: number;
  name: string;
  description: string;
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
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  courseId: Course;
}

import type { Instructor } from './instructor.service';

const API_BASE_URL = 'http://localhost:3000';

export class CoursesService {
  static async getAllCourses(limit?: number, offset?: number, filters: Record<string, any> = {}): Promise<Course[]> {
    try {
      let url = `${API_BASE_URL}/courses`;
      const params: string[] = [];
      if (limit !== undefined) params.push(`limit=${limit}`);
      if (offset !== undefined) params.push(`offset=${offset}`);
      // Add filters as query params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      });
      if (params.length > 0) url += `?${params.join('&')}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const backendCourses: BackendCourse[] = await response.json();
      // Map backend data to frontend format
      return backendCourses.map(course => ({
        id: course.id,
        imageUrl: course.imageUrl || '/assets/images/resources/courses-2-1.jpg',
        title: course.title,
        description: course.description,
        price: course.price,
        rating: course.rating,
        reviewCount: course.reviewCount,
        level: course.level,
        lessons: course.lessons,
        lessonCount: course.lessonCount,
        duration: course.durationMinutes,
        category: course.category,
        instructor: {
          name: course.instructor?.user?.name || 'Unknown',
          image: course.instructor?.user?.avatar || '/assets/images/resources/courses-two-client-img-1.jpg',
          occupation: course.instructor?.occupation,
          bio: course.instructor?.bio,
          education: course.instructor?.education,
          experience: course.instructor?.experience || 0,
          studentsTrained: course.instructor?.studentsTrained,
          coursesCount: course.instructor?.coursesCount,
          linkedin: course.instructor?.linkedin,
          pinterest: course.instructor?.pinterest,
          facebook: course.instructor?.facebook,
          instagram: course.instructor?.instagram,
        },
      }));
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }

  static async getCourseById(id: number): Promise<Course> {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const course: BackendCourse = await response.json();
      return {
        id: course.id,
        imageUrl: course.imageUrl || '/assets/images/resources/courses-2-1.jpg',
        title: course.title,
        description: course.description,
        price: course.price,
        rating: course.rating,
        reviewCount: course.reviewCount,
        level: course.level,
        lessons: course.lessons,
        lessonCount: course.lessonCount,
        duration: course.durationMinutes,
        category: course.category,
        instructor: {
          name: course.instructor?.user?.name || 'Unknown',
          image: course.instructor?.user?.avatar || '/assets/images/resources/courses-two-client-img-1.jpg',
          occupation: course.instructor?.occupation,
          bio: course.instructor?.bio,
          education: course.instructor?.education,
          experience: course.instructor?.experience || 0,
          studentsTrained: course.instructor?.studentsTrained,
          coursesCount: course.instructor?.coursesCount,
          linkedin: course.instructor?.linkedin,
          pinterest: course.instructor?.pinterest,
          facebook: course.instructor?.facebook,
          instagram: course.instructor?.instagram,
        },
      };
    } catch (error) {
      console.error('Error fetching course by ID:', error);
      throw error;
    }
  }

  static async getCoursesMetadata(params = {}): Promise<any> {
    const query = new URLSearchParams(params as any).toString();
    const response = await fetch(`${API_BASE_URL}/courses/metadata?${query}`);
    if (!response.ok) throw new Error('Failed to fetch metadata');
    return response.json();
  }
}

export class CategoriesService {
  static async getAllCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  }
}