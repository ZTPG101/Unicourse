import { Course } from '../../entities/course.entity';

export class CourseResponseDto {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  instructorName: string;

  constructor(course: Course) {
    this.id = course.id;
    this.title = course.title;
    this.description = course.description;
    this.price = +course.price;
    this.category = course.category;
    this.rating = course.rating;
    this.instructorName = course.instructor?.name || 'Unknown';
  }
}
