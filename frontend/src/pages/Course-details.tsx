import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CourseCurriculumTab from "../components/CourseCurriculumTab";
import CourseInstructorTab from "../components/CourseInstructorTab";
import CourseOverviewTab from "../components/CourseOverviewTab";
import CourseReviewTab from "../components/CourseReviewTab";
import PageHeader from "../components/PageHeader";
import { CartService } from "../services/carts.service";
import type { Course } from "../services/courses.service";
import { CoursesService } from "../services/courses.service";
import { formatDuration } from "../utils/formatters";

const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "overview" | "curriculum" | "instructor" | "review"
  >(() => location.state?.activeTab || "overview");
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // Fetch course details
  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) {
        setError("Course ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const courseData = await CoursesService.getCourseById(
          parseInt(courseId)
        );
        setCourse(courseData);
        setError(null);
      } catch (err) {
        setError("Failed to load course details. Please try again later.");
        console.error("Error fetching course details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  // Show loading state
  if (loading) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading course details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !course) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 text-center">
            <div className="alert alert-danger" role="alert">
              {error || "Course not found"}
            </div>
            <a href="/course" className="btn btn-primary">
              Back to Courses
            </a>
          </div>
        </div>
      </div>
    );
  }
  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "Course", path: "/course" },
    { label: "Course Details" },
  ];
  return (
    <>
      <PageHeader title="Course Details" breadcrumbs={breadcrumbs} />
      {/* Course Details Start */}
      <section className="course-details">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <div className="course-details__left">
                <div className="course-details__img">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="course-detail-img"
                  />
                </div>
                <div className="course-details__content">
                  <div className="course-details__tag-box">
                    <div className="course-details__tag-shape"></div>
                    <span className="course-details__tag">
                      {course.category && course.category.name ? course.category.name : 'Uncategorized'}
                    </span>
                  </div>
                  <h3 className="course-details__title">{course.title}</h3>
                  <div className="course-details__client-and-ratting-box">
                    <div className="course-details__client-box">
                      <div className="course-details__client-img">
                        <img
                          src={course.instructor.image}
                          alt={course.instructor.name}
                          className="instructor-avatar--small"
                        />
                      </div>
                      <div className="course-details__client-content">
                        <p>
                          <span
                            className="odometer"
                            data-count={course.instructor.experience}
                          >
                            {course.instructor.experience}
                          </span>
                          + Years Experience
                        </p>
                        <h4>{course.instructor.name}</h4>
                      </div>
                    </div>
                    <div className="course-details__ratting-box-1">
                      <ul className="course-details__ratting-list-1 list-unstyled">
                        <li>
                          <p>Last Update</p>
                          <h4>January 02, 2025</h4>
                        </li>
                        {/* <li>
                          <p>Available</p>
                          <h4>24 Students</h4>
                        </li> */}
                        <li>
                          <p>
                            ({course.rating} / {course.reviewCount} Reviews)
                          </p>
                          <ul className="course-details__review-ratting list-unstyled">
                            {[...Array(5)].map((_, index) => (
                              <li key={index}>
                                <span
                                  className={`icon-star ${
                                    index < Math.floor(course.rating)
                                      ? "filled"
                                      : ""
                                  }`}
                                ></span>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Tabs and tab content (Overview, Curriculum, Instructor, Review) */}
                  <div className="course-details__main-tab-box tabs-box">
                    <ul className="tab-buttons list-unstyled">
                      <li
                        className={`tab-btn tab-btn-one${
                          activeTab === "overview" ? " active-btn" : ""
                        }`}
                        onClick={() => setActiveTab("overview")}
                        style={{ cursor: "pointer" }}
                      >
                        <p>
                          <span className="icon-pen-ruler"></span>Overview
                        </p>
                      </li>
                      <li
                        className={`tab-btn tab-btn-two${
                          activeTab === "curriculum" ? " active-btn" : ""
                        }`}
                        onClick={() => setActiveTab("curriculum")}
                        style={{ cursor: "pointer" }}
                      >
                        <p>
                          <span className="icon-book"></span>Curriculum
                        </p>
                      </li>
                      <li
                        className={`tab-btn tab-btn-three${
                          activeTab === "instructor" ? " active-btn" : ""
                        }`}
                        onClick={() => setActiveTab("instructor")}
                        style={{ cursor: "pointer" }}
                      >
                        <p>
                          <span className="icon-graduation-cap"></span>
                          Instructor
                        </p>
                      </li>
                      <li
                        className={`tab-btn tab-btn-four${
                          activeTab === "review" ? " active-btn" : ""
                        }`}
                        onClick={() => setActiveTab("review")}
                        style={{ cursor: "pointer" }}
                      >
                        <p>
                          <span className="icon-comments"></span>Review
                        </p>
                      </li>
                    </ul>
                    <div className="tabs-content">
                      {activeTab === "overview" && (
                        <CourseOverviewTab course={course} />
                      )}
                      {activeTab === "curriculum" && (
                        <CourseCurriculumTab course={course} />
                      )}
                      {activeTab === "instructor" && (
                        <CourseInstructorTab course={course} />
                      )}
                      {activeTab === "review" && (
                        <CourseReviewTab
                          course={course}
                          onReviewSubmitted={async () => {
                            try {
                              const updatedCourse = await CoursesService.getCourseById(course.id);
                              setCourse(updatedCourse);
                            } catch (err) {
                              console.error('Failed to refresh course data after review', err);
                            }
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5">
              <div className="course-details__right">
                <div className="course-details__info-box">
                  <div className="course-details__video-link">
                    <div
                      className="course-details__video-link-bg"
                      style={{
                        backgroundImage:
                          "url(assets/images/backgrounds/course-details-video-link-bg.jpg)",
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
                  <div className="course-details__doller-and-btn-box">
                    <h3 className="course-details__doller">
                      ${course.price.toFixed(2)}
                    </h3>
                    <div className="course-details__doller-btn-box">
                      {course.price === 0 ? (
                        <a
                          className="thm-btn-two"
                          onClick={() => setActiveTab("curriculum")}
                          type="button"
                        >
                          <span>Start Now</span>
                          <i className="icon-angles-right"></i>
                        </a>
                      ) : (
                        <a
                          className="thm-btn-two"
                          onClick={async () => {
                            if (!course) return;
                            setPurchaseLoading(true);
                            setPurchaseError(null);
                            setPurchaseSuccess(false);
                            try {
                              await CartService.addItem(course.id);
                              setPurchaseSuccess(true);
                              setTimeout(() => navigate("/cart"), 1000);
                            } catch (err) {
                              setPurchaseError(
                                "Failed to add to cart. Please try again."
                              );
                            } finally {
                              setPurchaseLoading(false);
                            }
                          }}
                          type="button"
                          // disabled={purchaseLoading}
                        >
                          <span>
                            {purchaseLoading ? "Processing..." : "Purchase Now"}
                          </span>
                          <i className="icon-angles-right"></i>
                        </a>
                      )}
                      {purchaseError && (
                        <div className="alert alert-danger mt-2">
                          {purchaseError}
                        </div>
                      )}
                      {purchaseSuccess && (
                        <div className="alert alert-success mt-2">
                          Added to cart! Redirecting...
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="course-details__social-box">
                    <h5 className="course-details__social-title">
                      Share Course
                    </h5>
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
                    <h5 className="course-details__cuppon-title">
                      Apply Coupon
                    </h5>
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
            </div>
          </div>
        </div>
      </section>
      {/* Mobile Nav Wrapper, Search Popup, Scroll to Top, etc. (placeholder) */}
      <div className="mobile-nav__wrapper">{/* ... */}</div>
      <div className="search-popup">{/* ... */}</div>
      <a href="#" data-target="html" className="scroll-to-target scroll-to-top">
        <span className="scroll-to-top__wrapper">
          <span className="scroll-to-top__inner"></span>
        </span>
        <span className="scroll-to-top__text"> Go Back Top</span>
      </a>
    </>
  );
};

export default CourseDetails;
