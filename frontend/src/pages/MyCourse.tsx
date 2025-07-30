import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import PageHeader from "../components/PageHeader";
import type { Enrollment } from "../services/enrollment.service";
import { EnrollmentService } from "../services/enrollment.service";
import { mapBackendCourseToFrontend } from "../services/mappers/course.mapper";
import { useAuth } from "../context/AuthContext";
import type { BackendCourse } from "../services/courses.service";

const breadcrumbs = [{ label: "Home", path: "/" }, { label: "My Courses" }];

const MyCourse: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn && user) {
      EnrollmentService.getUserEnrollments(user.id)
        .then((enrollmentsFromApi) => {
          const mappedEnrollments = enrollmentsFromApi.map((enrollment) => {
            if (enrollment.course) {
              enrollment.course = mapBackendCourseToFrontend(
                enrollment.course as unknown as BackendCourse
              );
            }
            return enrollment;
          });
          setEnrollments(mappedEnrollments);
        })
        .catch((err) => {
          console.error("Failed to fetch enrollments:", err);
          setError("Failed to fetch your enrolled courses.");
        })
        .finally(() => {
          setLoading(false);
        });
    }

    else if (!isLoggedIn) {
      setLoading(false); 
      setError("Please log in to see your enrolled courses.");
    }

  }, [isLoggedIn, user]);

  const handleViewCourse = (courseId: number) => {
    navigate(`/course-details/${courseId}`, {
      state: { activeTab: "curriculum", scrollToTab: true },
    });
  };

  const handleRemoveEnrollment = async (enrollmentId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this course?"
    );
    if (!confirmed) return;

    try {
      await EnrollmentService.deleteEnrollment(enrollmentId);
      setEnrollments((prev) => prev.filter((e) => e.id !== enrollmentId));
    } catch (err) {
      setError("Failed to remove the course. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading your courses...</p>
      </div>
    );
  }

  return (
    <>
      <PageHeader title="My Courses" breadcrumbs={breadcrumbs} />
      <section
        className="course-grid"
        style={{ paddingTop: "100px", paddingBottom: "100px" }}
      >
        <div className="container">
          {error && <div className="alert alert-danger">{error}</div>}

          {!error && isLoggedIn && enrollments.length === 0 && (
            <div className="text-center">
              <h3>You haven't enrolled in any courses yet.</h3>
              <p>Explore our courses and start your learning journey today!</p>
              <a href="/course" className="thm-btn mt-3">
                Browse Courses
              </a>
            </div>
          )}

          <div className="row">
            {isLoggedIn &&
              !error &&
              enrollments.map((enrollment) => (
                <div className="col-xl-4 col-lg-6 col-md-6" key={enrollment.id}>
                  {enrollment.course && (
                    <div style={{ position: "relative", marginBottom: "30px" }}>
                      <CourseCard
                        course={enrollment.course}
                        actionText="View Course"
                        onActionClick={() =>
                          handleViewCourse(enrollment.course.id)
                        }
                      />

                      <div className="cross-icon">
                        <button
                          onClick={() => handleRemoveEnrollment(enrollment.id)}
                          type="button"
                          aria-label="Remove course from my list"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyCourse;
