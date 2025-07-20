import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { EnrollmentService } from "../services/enrollment.service";
import type { Enrollment } from "../services/enrollment.service";
import { useNavigate } from "react-router-dom";
import type { Course } from "../services/carts.service";

const breadcrumbs = [{ label: "Home", path: "/" }, { label: "My Course" }];

const MyCourse: React.FC = () => {
  const [courses, setCourses] = useState<Enrollment[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    EnrollmentService.getAllEnrollments()
      .then(setCourses)
      .catch((err) => {
        setError("Please login to see your courses.");
        console.error(err);
      });
  }, []);

  return (
    <>
      <PageHeader title="My Course" breadcrumbs={breadcrumbs} />
      <section className="wishlist-page">
        <div className="container">
          <div className="table-responsive-box">
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="wishlist-table">
              <tbody>
                {courses.map((enrollment) => (
                  <tr key={enrollment.id}>
                    <td>
                      <div className="product-box">
                        <div className="img-box">
                          <img src={enrollment.course?.imageUrl || ""} alt="" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="product-name-select-box">
                        <div className="product-name">
                          <h4>{enrollment.course?.title}</h4>
                        </div>
                        <button
                          className="thm-btn wishlist-page__btn"
                          onClick={() => {
                            navigate(
                              `/course-details/${enrollment.course?.id}`,
                              {
                                state: {
                                  activeTab: "curriculum",
                                  scrollToTab: true,
                                },
                              }
                            );
                          }}
                          type="button"
                        >
                          <span className="icon-angles-right"></span>
                          Select
                        </button>
                        {/* ... */}
                      </div>
                    </td>
                    <td>
                      <div className="cross-icon">
                        <button
                          className="remove-icon-btn"
                          onClick={async () => {
                            const confirmed = window.confirm('Are you sure you want to remove this course from My Course?');
                            if (!confirmed) return;
                            try {
                              await EnrollmentService.deleteEnrollment(enrollment.id);
                              setCourses((prev) => prev.filter((e) => e.id !== enrollment.id));
                            } catch (err) {
                              // Optionally handle error
                            }
                          }}
                          type="button"
                          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                          aria-label="Remove enrollment"
                        >
                          <i className="fas fa-times remove-icon"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyCourse;
