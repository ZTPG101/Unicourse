import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CourseCurriculumTab from "../components/CourseCurriculumTab";
import CourseDetailsSidebar from "../components/CourseDetailsSidebar";
import CourseInstructorTab from "../components/CourseInstructorTab";
import CourseOverviewTab from "../components/CourseOverviewTab";
import CourseReviewTab from "../components/CourseReviewTab";
import PageHeader from "../components/PageHeader";
import { CartService } from "../services/carts.service";
import type { Course } from "../services/courses.service";
import { CoursesService } from "../services/courses.service";
import { EnrollmentService } from "../services/enrollment.service";

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
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  const tabContentRef = useRef<HTMLDivElement>(null);
  const curriculumTabRef = useRef<HTMLDivElement>(null);

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

  // Check if already enrolled in this course
  useEffect(() => {
    const checkEnrollment = async () => {
      if (!courseId) return;
      try {
        const enrollments = await EnrollmentService.getAllEnrollments();
        const enrolled = enrollments.some(
          (enrollment) =>
            enrollment.course && enrollment.course.id === parseInt(courseId)
        );
        setAlreadyEnrolled(enrolled);
      } catch (err) {
        // Optionally handle error
        setAlreadyEnrolled(false);
      }
    };
    checkEnrollment();
  }, [courseId]);

  // Handle scroll to tab on navigation
  useEffect(() => {
    if (
      location.state?.scrollToTab &&
      activeTab === "curriculum" &&
      curriculumTabRef.current
    ) {
      setTimeout(() => {
        curriculumTabRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200); // Slightly longer delay
    }

    // eslint-disable-next-line
  }, [activeTab, location.state, curriculumTabRef.current]);

  const handleEnroll = async () => {
    if (!course) return;

    // If already enrolled, just scroll to the content
    if (alreadyEnrolled) {
      setActiveTab("curriculum");
      setTimeout(() => {
        tabContentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
      return;
    }

    // Otherwise, proceed with enrollment
    setEnrollLoading(true);
    setEnrollError(null);
    setEnrollSuccess(false);
    try {
      await EnrollmentService.createEnrollment(course.id);
      setEnrollSuccess(true);
      setAlreadyEnrolled(true); // Update state to reflect enrollment
      setActiveTab("curriculum"); // Switch to curriculum tab on success
      setTimeout(() => {
        tabContentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (err) {
      setEnrollError("Please login to enroll in the course.");
    } finally {
      setEnrollLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!course) return;

    // If already enrolled, just scroll to the content
    if (alreadyEnrolled) {
      setActiveTab("curriculum");
      setTimeout(() => {
        tabContentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
      return;
    }

    // Otherwise, proceed with adding to cart
    setPurchaseLoading(true);
    setPurchaseError(null);
    setPurchaseSuccess(false);
    try {
      await CartService.addItem(course.id);
      setPurchaseSuccess(true);
      setTimeout(() => navigate("/cart"), 1000); // Redirect to cart on success
    } catch (err) {
      setPurchaseError("Please login to purchase the course.");
    } finally {
      setPurchaseLoading(false);
    }
  };

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
                      {course.category && course.category.name
                        ? course.category.name
                        : "Uncategorized"}
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
                    <div className="tabs-content" ref={tabContentRef}>
                      {activeTab === "overview" && (
                        <CourseOverviewTab course={course} />
                      )}
                      {activeTab === "curriculum" && (
                        <div ref={curriculumTabRef}>
                          <CourseCurriculumTab course={course} />
                        </div>
                      )}
                      {activeTab === "instructor" && (
                        <CourseInstructorTab course={course} />
                      )}
                      {activeTab === "review" && (
                        <CourseReviewTab
                          course={course}
                          onReviewSubmitted={async () => {
                            try {
                              const updatedCourse =
                                await CoursesService.getCourseById(course.id);
                              setCourse(updatedCourse);
                            } catch (err) {
                              console.error(
                                "Failed to refresh course data after review",
                                err
                              );
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
              <CourseDetailsSidebar
                course={course}
                alreadyEnrolled={alreadyEnrolled}
                purchaseLoading={purchaseLoading}
                purchaseError={purchaseError}
                purchaseSuccess={purchaseSuccess}
                enrollLoading={enrollLoading}
                enrollError={enrollError}
                enrollSuccess={enrollSuccess}
                onPurchase={handlePurchase}
                onEnroll={handleEnroll}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseDetails;
