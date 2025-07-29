import type { BackendCourse, Course } from "../courses.service";
// import { Instructor as BackendInstructor } from '../instructor.service';

export function mapBackendCourseToFrontend(course: BackendCourse): Course {
  return {
    id: course.id,
    imageUrl: course.imageUrl || "/assets/images/resources/courses-2-1.jpg",
    title: course.title,
    description: course.description,
    price: course.price,
    rating: course.rating,
    reviewCount: course.reviewCount,
    level: course.level,
    lessons: course.lessons || [],
    lessonCount: course.lessonCount,
    duration: course.durationMinutes,
    category: course.category,
    instructor: {
      id: course.instructor.id,
      name: course.instructor?.user?.name || "Unknown Instructor",
      image: course.instructor?.user?.avatar || "/assets/images/resources/courses-two-client-img-1.jpg",
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
    learningObjectives: course.learningObjectives || [],
    requirements: course.requirements || [],
    updatedAt: course.updatedAt,
  };
}