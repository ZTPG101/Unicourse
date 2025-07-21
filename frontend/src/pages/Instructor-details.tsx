import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import type { Instructor } from "../services/instructor.service";
import { InstructorService } from "../services/instructor.service";

const breadcrumbs = [
  { label: "Home", path: "/" },
  { label: "Instructor details" },
];

const InstructorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    InstructorService.getInstructorById(Number(id))
      .then(setInstructor)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <PageHeader title="Instructor details" breadcrumbs={breadcrumbs} />
      <section className="team-details">
        <div className="container">
          <div className="row">
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {!loading && !error && !instructor && <div>Instructor not found.</div>}
            {!loading && !error && instructor && (
              <>
                <div className="col-xl-5">
                  <div
                    className="team-details__left wow slideInLeft"
                    data-wow-delay="100ms"
                    data-wow-duration="2500ms"
                  >
                    <div className="team-details__img">
                      <img src={instructor.user?.avatar || "assets/images/team/team-details-img-1.jpg"} alt={instructor.user?.name || "Instructor"} />
                    </div>
                  </div>
                </div>
                <div className="col-xl-7">
                  <div className="team-details__right">
                    <div className="team-details__name-and-ratting-box">
                      <div className="team-details__name-box">
                        <h3 className="team-details__name">{instructor.user?.name || "Instructor"}</h3>
                        <p className="team-details__sub-title">{instructor.occupation}</p>
                      </div>
                      <div className="team-details__ratting-box">
                        <ul className="team-details__ratting list-unstyled">
                          <li><span className="icon-star"></span></li>
                          <li><span className="icon-star"></span></li>
                          <li><span className="icon-star"></span></li>
                          <li><span className="icon-star"></span></li>
                          <li><span className="icon-star"></span></li>
                        </ul>
                        <p className="team-details__ratting-text">(5.0 / 5.2 Rating)</p>
                      </div>
                    </div>
                    <ul className="team-details__meta list-unstyled">
                      <li>
                        <div className="icon">
                          <span className="fas fa-users"></span>
                        </div>
                        <div className="content">
                          <p className="odometer" data-count={instructor.studentsTrained || 0}>{instructor.studentsTrained || 0}</p>
                          <span>+ Student Trained</span>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <span className="far fa-play-circle"></span>
                        </div>
                        <div className="content">
                          <p className="odometer" data-count={instructor.coursesCount || 0}>{instructor.coursesCount || 0}</p>
                          <span> Courses</span>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <span className="fas fa-graduation-cap"></span>
                        </div>
                        <div className="content">
                          <p className="odometer" data-count={instructor.experience || 0}>{instructor.experience || 0}</p>
                          <span> Years Experience</span>
                        </div>
                      </li>
                    </ul>
                    <h3 className="team-details__title">About Me</h3>
                    <p className="team-details__text-1">{instructor.bio}</p>
                    <div className="team-details__points-box">
                      <h3 className="team-details__points-title">Education</h3>
                      <ul className="team-details__points-list list-unstyled">
                        <li>
                          <div className="team-details__points-content">
                            <div className="team-details__points-icon">
                              <img src="assets/images/icon/team-details-points-icon.png" alt="" />
                            </div>
                            <p className="team-details__points-text">{instructor.education}</p>
                          </div>
                          <p>{instructor.user?.university || ""}</p>
                        </li>
                      </ul>
                    </div>
                    <div className="team-details__have-question-and-social">
                      <div className="team-details__have-question">
                        <div className="team-details__have-question-icon">
                          <span className="icon-contact"></span>
                        </div>
                        <div className="team-details__have-question-content">
                          <p>Have a Questions</p>
                          <h5>
                            <a href={`mailto:${instructor.user?.email}`}>{instructor.user?.email}</a>
                          </h5>
                        </div>
                      </div>
                      <div className="team-details__have-question-social">
                        {instructor.linkedin && <a href={instructor.linkedin} target="_blank" rel="noopener noreferrer"><span className="fab fa-linkedin-in"></span></a>}
                        {instructor.pinterest && <a href={instructor.pinterest} target="_blank" rel="noopener noreferrer"><span className="fab fa-pinterest-p"></span></a>}
                        {instructor.facebook && <a href={instructor.facebook} target="_blank" rel="noopener noreferrer"><span className="fab fa-facebook-f"></span></a>}
                        {instructor.instagram && <a href={instructor.instagram} target="_blank" rel="noopener noreferrer"><span className="fab fa-instagram"></span></a>}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default InstructorDetails;
