// Types for the backend API response
export interface BackendCourse {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string | null;
  level: string;
  durationMinutes: number;
  instructor: {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    experience: number;
    role: string;
  };
  rating: number;
  reviewCount: number;
  lessonCount: number;
  createdAt: string;
  updatedAt: string;
}

// Frontend course interface (mapped from backend)
export interface Course {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
  level: string;
  lessonCount: number;
  duration: number; // in minutes
  instructor: {
    name: string;
    image: string;
    experience: number;
  };
}

const API_BASE_URL = 'http://localhost:3000';

export class CoursesService {
  static async getAllCourses(): Promise<Course[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/courses`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const backendCourses: BackendCourse[] = await response.json();
      
      // Map backend data to frontend format
      return backendCourses.map(course => ({
        id: course.id,
        imageUrl: course.imageUrl || '/assets/images/resources/courses-2-1.jpg', // fallback image
        title: course.title,
        price: course.price,
        rating: course.rating,
        reviewCount: course.reviewCount,
        level: course.level,
        lessonCount: course.lessonCount,
        duration: course.durationMinutes,
        instructor: {
          name: course.instructor.name,
          image: course.instructor.avatar || '/assets/images/resources/courses-two-client-img-1.jpg', // fallback image
          experience: course.instructor.experience || 0,
        },
      }));
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }
} 