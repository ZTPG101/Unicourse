import { Course } from '../../database/entities/course.entity';

export class CourseResponseDto {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;

  constructor(course: Course) {
    this.id = course.id;
    this.title = course.title;
    this.description = course.description;
    this.price = +course.price;
    this.rating = course.rating;
  }
}
