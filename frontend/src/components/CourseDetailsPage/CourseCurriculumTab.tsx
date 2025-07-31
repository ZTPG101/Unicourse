import React from "react";
import type { Course } from "../../services/courses.service";
import { formatDuration } from "../../utils/formatters";
import { Link } from "react-router-dom";

interface CourseCurriculumTabProps {
  course: Course;
  alreadyEnrolled: boolean;
}

const CourseCurriculumTab: React.FC<CourseCurriculumTabProps> = ({
  course,
  alreadyEnrolled,
}) => {
  return (
    <div className="tab active-tab" id="curriculum">
      <div className="tab active-tab" id="curriculum">
        <div className="course-details__tab-inner">
          <div className="course-details__curriculam">
            <h3 className="course-details__curriculam-title">
              Course Curriculum
            </h3>
            <p className="course-details__curriculam-text">
              Through engaging lessons and hands-on projects, you'll learn lots
              of stuff from this course. You'll also tackle real-world
              applications during the course.
            </p>
            <div className="course-details__curriculam-faq">
              <div className="accrodion-grp" data-grp-name="faq-one-accrodion">
                {/* Repeat this block for each curriculum item */}
                <div className="accrodion">
                  <div className="accrodion-title">
                    <div className="accrodion-title-box">
                      <div className="accrodion-title__count"></div>
                      <div className="accrodion-title-text">
                        <h4>This course components</h4>
                      </div>
                    </div>
                    <ul className="accrodion-meta list-unstyled">
                      <li>
                        <p>
                          <span className="icon-book"></span>{" "}
                          {course.lessonCount} lessons
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className="icon-clock"></span>{" "}
                          {formatDuration(course.duration)}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="accrodion-content">
                    <div className="inner">
                      <h3 className="accrodion-content__title">
                        {course.level}
                      </h3>
                      <p className="accrodion-content__text">
                        This curriculum offers a structured path with estimated
                        times for each module, allowing students to plan their
                        study schedule effectively.
                      </p>
                      <ul className="accrodion-content__points list-unstyled">
                        {course.lessons && course.lessons.length > 0 ? (
                          course.lessons.map((lesson, index) => (
                            <li
                              key={lesson.id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <p
                                className="accrodion-content__points-text"
                                style={{ margin: 0 }}
                              >
                                <span className="fal fa-video"></span>
                                {lesson.title}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                }}
                              >
                                {alreadyEnrolled ? (
                                  <div className="accrodion-content__points-btn">
                                    <Link to={`/lesson/${lesson.id}`}>
                                      View
                                    </Link>
                                  </div>
                                ) : (
                                  <>
                                    {/* Show button if course is free or it's one of the first two lessons */}
                                    {(course.price === 0 || index < 2) && (
                                      <div className="accrodion-content__points-btn">
                                        <Link to={`/lesson/${lesson.id}`}>
                                          {course.price === 0
                                            ? "View"
                                            : "Preview"}
                                        </Link>
                                      </div>
                                    )}
                                    {/* Only show lock icon if course is not free */}
                                    {course.price !== 0 && (
                                      <div className="accrodion-content__icon">
                                        <span className="far fa-lock-alt"></span>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </li>
                          ))
                        ) : (
                          <h4>No lessons available.</h4>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseCurriculumTab;
