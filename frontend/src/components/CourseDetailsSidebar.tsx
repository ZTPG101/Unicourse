// src/components/CourseDetailsSidebar.tsx

import React from "react";
import type { Course } from "../services/courses.service";
import { formatDuration } from "../utils/formatters";

interface CourseDetailsSidebarProps {
  course: Course;
  alreadyEnrolled: boolean;
  purchaseLoading: boolean;
  purchaseError: string | null;
  purchaseSuccess: boolean;
  enrollLoading: boolean;
  enrollError: string | null;
  enrollSuccess: boolean;
  onPurchase: () => void;
  onEnroll: () => void;
}

const CourseDetailsSidebar: React.FC<CourseDetailsSidebarProps> = ({
  course,
  alreadyEnrolled,
  purchaseLoading,
  purchaseError,
  purchaseSuccess,
  enrollLoading,
  enrollError,
  enrollSuccess,
  onPurchase,
  onEnroll,
}) => {
  const isFree = course.price === 0;
  const actionHandler = isFree ? onEnroll : onPurchase;
  const isLoading = isFree ? enrollLoading : purchaseLoading;

  let buttonText: string;
  if (alreadyEnrolled) {
    buttonText = "See Contents";
  } else if (isLoading) {
    buttonText = "Processing...";
  } else {
    buttonText = isFree ? "Start Now" : "Purchase Now";
  }

  return (
    <div className="course-details__right">
      <div className="course-details__info-box">
        <div className="course-details__video-link">
          <div
            className="course-details__video-link-bg"
            style={{
              backgroundImage:
                "url(/assets/images/backgrounds/course-details-video-link-bg.jpg)",
            }}
          ></div>
          <a
            href="https://youtu.be/dQw4w9WgXcQ?si=ad0P4xO5PsJ2T0Cg"
            className="video-popup"
          >
            <div className="course-details__video-icon">
              <span className="icon-play"></span>
              <i className="ripple"></i>
            </div>
          </a>
        </div>
        <div className="course-details__dollar-and-btn-box">
          <h3 className="course-details__dollar">${course.price.toFixed(2)}</h3>
          <div className="course-details__dollar-btn-box">
            <a
              className={`thm-btn-two${
                alreadyEnrolled && !isLoading ? " disabled" : ""
              }`}
              onClick={actionHandler}
              type="button"
            >
              <span>{buttonText}</span>
              <i className="icon-angles-right"></i>
            </a>
          </div>
        </div>

        {/* All status messages */}
        {purchaseError && (
          <div className="alert alert-danger mt-2">{purchaseError}</div>
        )}
        {purchaseSuccess && (
          <div className="alert alert-success mt-2">
            Added to cart! Redirecting...
          </div>
        )}
        {enrollError && (
          <div className="alert alert-danger mt-2">{enrollError}</div>
        )}
        {enrollSuccess && (
          <div className="alert alert-success mt-2">Enrolled successfully!</div>
        )}
        {alreadyEnrolled && !enrollSuccess && !purchaseSuccess && (
          <div className="alert alert-info mt-2">
            You are already enrolled in this course.
          </div>
        )}

        <div className="course-details__social-box">
          <h5 className="course-details__social-title">Share Course</h5>
          <div className="course-details__social-list">
            <a href="#">
              <span className="fab fa-linkedin-in"></span>
            </a>
            <a href="#">
              <span className="fab fa-pinterest-p"></span>
            </a>
            <a href="#">
              <span className="fab fa-facebook-f"></span>
            </a>
            <a href="#">
              <span className="fab fa-instagram"></span>
            </a>
          </div>
        </div>
        <div className="course-details__info-list">
          <h3 className="course-details__info-list-title">
            This Course Included
          </h3>
          <ul className="course-details__info-list-1 list-unstyled">
            <li>
              <p>
                <i className="icon-book"></i>Lesson
              </p>
              <span>{course.lessonCount}</span>
            </li>
            <li>
              <p>
                <i className="icon-clock"></i>Duration
              </p>
              <span>{formatDuration(course.duration)}</span>
            </li>
            <li>
              <p>
                <i className="icon-chart-simple"></i>Skill Level
              </p>
              <span>{course.level}</span>
            </li>
            <li>
              <p>
                <i className="icon-globe"></i>Language
              </p>
              <span>English</span>
            </li>
            <li>
              <p>
                <i className="icon-stamp"></i>Certificate
              </p>
              <span>After Completed</span>
            </li>
            <li>
              <p>
                <i className="icon-hourglass"></i>Deadline
              </p>
              <span>No Deadline</span>
            </li>
          </ul>
        </div>
        <div className="course-details__cuppon-box">
          <h5 className="course-details__cuppon-title">Apply Coupon</h5>
          <form action="#" className="course-details__search-form">
            <input type="text" placeholder="Enter Coupon Code" />
            <button type="submit">Apply</button>
          </form>
          <p className="course-details__cuppon-text">
            30 days Money back grantee
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsSidebar;
