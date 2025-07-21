import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import type { Instructor as InstructorType } from "../services/instructor.service";
import { InstructorService } from "../services/instructor.service";

const breadcrumbs = [{ label: "Home", path: "/" }, { label: "Instructor" }];

const Instructor: React.FC = () => {
  const [instructors, setInstructors] = useState<InstructorType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    InstructorService.getAllInstructors()
      .then(setInstructors)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="Instructors" breadcrumbs={breadcrumbs} />
      <section className="team-page">
        <div className="container">
          <div className="row">
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {!loading && !error && instructors.length === 0 && <div>No instructors found.</div>}
            {!loading && !error && instructors.map((instructor) => (
              <div key={instructor.id} className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="100ms">
                <div className="team-one__single" onClick={() => navigate(`/instructors/${instructor.id}`)} style={{ cursor: 'pointer' }}>
                  <div className="team-one__img-box">
                    <div className="team-one__img">
                      <img src={instructor.user?.avatar || "assets/images/team/team-1-1.jpg"} alt={instructor.user?.name || "Instructor"} />
                    </div>
                    <div className="team-one__content">
                      <div className="team-one__single-bg-shape" style={{ backgroundImage: 'url(assets/images/shapes/team-one-single-bg-shape.png)' }}></div>
                      <div className="team-one__content-shape-1">
                        <img src="assets/images/shapes/team-one-content-shape-1.png" alt="" />
                      </div>
                      <div className="team-one__content-shape-2">
                        <img src="assets/images/shapes/team-one-content-shape-2.png" alt="" />
                      </div>
                      <div className="team-one__plus-and-social">
                        <div className="team-one__plus">
                          <span className="icon-plus"></span>
                        </div>
                        <div className="team-one__social">
                          {instructor.linkedin && <a href={instructor.linkedin} onClick={e => e.stopPropagation()} target="_blank" rel="noopener noreferrer"><span className="fab fa-linkedin-in"></span></a>}
                          {instructor.pinterest && <a href={instructor.pinterest} onClick={e => e.stopPropagation()} target="_blank" rel="noopener noreferrer"><span className="fab fa-pinterest-p"></span></a>}
                          {instructor.facebook && <a href={instructor.facebook} onClick={e => e.stopPropagation()} target="_blank" rel="noopener noreferrer"><span className="fab fa-facebook-f"></span></a>}
                          {instructor.instagram && <a href={instructor.instagram} onClick={e => e.stopPropagation()} target="_blank" rel="noopener noreferrer"><span className="fab fa-instagram"></span></a>}
                        </div>
                      </div>
                      <h3 className="team-one__title">
                        <span>{instructor.user?.name || "Instructor"}</span>
                      </h3>
                      <p className="team-one__sub-title">{instructor.occupation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Instructor;