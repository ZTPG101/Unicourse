// src/components/CourseCard2.tsx

import React from "react";
import type { Course } from "../services/courses.service";
import { formatDuration } from "../utils/formatters";
import { renderStars } from "../utils/stars";

interface CourseCard2Props {
  course: Course;
  actionText?: string;
  onActionClick?: (e: React.MouseEvent) => void;
}

const CourseCard2: React.FC<CourseCard2Props> = ({
  course,
  actionText,
  onActionClick,
}) => {
  const handleAction = (e: React.MouseEvent) => {
    if (onActionClick) {
      e.preventDefault();
      onActionClick(e);
    }
  };

  return (
    <div className="courses-one__single">
      <div className="courses-one__img-box">
        <div className="courses-one__img">
          <img src={course.imageUrl} alt={course.title} />
        </div>
      </div>
      <div className="courses-one__content">
        <div className="courses-one__tag-and-meta">
          <div className="courses-one__tag">
            <span>{course.category?.name || "Uncategorized"}</span>
          </div>
          <ul className="courses-one__meta list-unstyled">
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
        <h3 className="courses-one__title">
          <a href={`/course-details/${course.id}`}>{course.title}</a>
        </h3>
        <div className="courses-one__rating-and-heart-box">
          <div className="courses-one__rating-box">
            <ul className="courses-one__rating list-unstyled">
              {renderStars(course.rating)}
            </ul>
            <p className="courses-one__rating-text">
              {course.reviewCount} Reviews
            </p>
          </div>
        </div>
        <div className="courses-one__btn-and-doller-box">
          <div className="courses-one__btn-box">
            <a
              href={`/course-details/${course.id}`}
              onClick={handleAction}
              className="courses-one__btn thm-btn"
            >
              <span className="icon-angles-right"></span>
              {actionText || 'Enroll Now'}
            </a>
          </div>
          <span>${course.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard2;