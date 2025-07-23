// src/components/CourseCard.tsx

import React from "react";
import type { Course } from "../services/courses.service";
import { formatDuration } from "../utils/formatters";

interface CourseCardProps {
  course: Course;
  actionText?: string;
  onActionClick?: (e: React.MouseEvent) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  actionText,
  onActionClick,
}) => {
  const handleAction = (e: React.MouseEvent) => {
    if (onActionClick) {
      e.preventDefault(); // Prevent the link from navigating
      onActionClick(e);
    }
  };

  return (
    <div className="courses-two__single">
      <div className="courses-two__img-box">
        <div className="courses-two__img">
          <img src={course.imageUrl} alt={course.title} />
        </div>
      </div>
      <div className="courses-two__content">
        <div className="courses-two__dollar-and-review">
          <div className="courses-two__dollar">
            <p>${course.price.toFixed(2)}</p>
          </div>
          <div className="courses-two__review">
            <p>
              <i className="icon-star"></i> {course.rating}{" "}
              <span>({course.reviewCount} Reviews)</span>
            </p>
          </div>
        </div>
        <h3 className="courses-two__title">
          <a href={`/course-details/${course.id}`}>{course.title}</a>
        </h3>
        <div
          className="courses-two__category"
          style={{ marginBottom: "8px", color: "#3D59F9", fontWeight: 500 }}
        >
          {course.category?.name || "Uncategorized"}
        </div>
        <div className="courses-two__btn-and-client-box">
          <div className="courses-two__btn-box">
            <a
              href={`/course-details/${course.id}`}
              onClick={handleAction}
              className="thm-btn-two"
            >
              <span>{actionText || 'Enroll Now'}</span>
              <i className="icon-angles-right"></i>
            </a>
          </div>
          <div className="courses-two__client-box">
            <div className="courses-two__client-img">
              <img src={course.instructor.image} alt={course.instructor.name} />
            </div>
            <div className="courses-two__client-content">
              <h4>{course.instructor.name}</h4>
              <p>
                <span
                  className="odometer"
                  data-count={course.instructor.experience}
                >
                  {course.instructor.experience}
                </span>
                <i>+</i> Years Experience
              </p>
            </div>
          </div>
        </div>
        <ul className="courses-two__meta list-unstyled">
          <li>
            <div className="icon">
              <span className="icon-chart-simple"></span>
            </div>
            <p>{course.level}</p>
          </li>
          <li>
            <div className="icon">
              <span className="icon-book"></span>
            </div>
            <p>{course.lessonCount} Lesson</p>
          </li>
          <li>
            <div className="icon">
              <span className="icon-clock"></span>
            </div>
            <p>{formatDuration(course.duration)}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CourseCard;
