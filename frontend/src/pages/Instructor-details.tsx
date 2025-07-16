import React from "react";
import PageHeader from "../components/PageHeader";

const breadcrumbs = [
  { label: "Home", path: "/" },
  { label: "Instructor details" },
];
const InstructorDetails: React.FC = () => {
  return (
    <>
      <PageHeader title="Instructor details" breadcrumbs={breadcrumbs} />
      <section className="team-details">
        <div className="container">
          <div className="row">
            <div className="col-xl-5">
              <div
                className="team-details__left wow slideInLeft"
                data-wow-delay="100ms"
                data-wow-duration="2500ms"
              >
                <div className="team-details__img">
                  <img src="assets/images/team/team-details-img-1.jpg" alt="" />
                </div>
              </div>
            </div>
            <div className="col-xl-7">
              <div className="team-details__right">
                <div className="team-details__name-and-ratting-box">
                  <div className="team-details__name-box">
                    <h3 className="team-details__name">Jordan Walk</h3>
                    <p className="team-details__sub-title">
                      Sr. Python Developer
                    </p>
                  </div>
                  <div className="team-details__ratting-box">
                    <ul className="team-details__ratting list-unstyled">
                      <li>
                        <span className="icon-star"></span>
                      </li>
                      <li>
                        <span className="icon-star"></span>
                      </li>
                      <li>
                        <span className="icon-star"></span>
                      </li>
                      <li>
                        <span className="icon-star"></span>
                      </li>
                      <li>
                        <span className="icon-star"></span>
                      </li>
                    </ul>
                    <p className="team-details__ratting-text">
                      (5.0 / 4.2 Rating)
                    </p>
                  </div>
                </div>
                <ul className="team-details__meta list-unstyled">
                  <li>
                    <div className="icon">
                      <span className="fas fa-users"></span>
                    </div>
                    <div className="content">
                      <p className="odometer" data-count="200">
                        {" "}
                        00{" "}
                      </p>
                      <span>+ Student Trained</span>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="far fa-play-circle"></span>
                    </div>
                    <div className="content">
                      <p className="odometer" data-count="76">
                        00
                      </p>
                      <span> Courses</span>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="fas fa-graduation-cap"></span>
                    </div>
                    <div className="content">
                      <p className="odometer" data-count="12">
                        00
                      </p>
                      <span> Years Experiance</span>
                    </div>
                  </li>
                </ul>
                <h3 className="team-details__title">About Me</h3>
                <p className="team-details__text-1">
                  Jordan Walk is an experienced Senior Python Developer with a
                  strong focus on building scalable and efficient solutions.
                  <br />
                  With extensive knowledge in Python and backend development,
                  Jordan has a track record of leading successful projects,
                  optimizing performance, and implementing best practices.
                </p>
                <div className="team-details__points-box">
                  <h3 className="team-details__points-title">Education</h3>
                  <ul className="team-details__points-list list-unstyled">
                    <li>
                      <div className="team-details__points-content">
                        <div className="team-details__points-icon">
                          <img
                            src="assets/images/icon/team-details-points-icon.png"
                            alt=""
                          />
                        </div>
                        <p className="team-details__points-text">
                          Bachelor’s Degree in Computer Science
                          <br />
                          or a Related Field
                        </p>
                      </div>
                      <p>Oxford University</p>
                    </li>
                    <li>
                      <div className="team-details__points-content">
                        <div className="team-details__points-icon">
                          <img
                            src="assets/images/icon/team-details-points-icon.png"
                            alt=""
                          />
                        </div>
                        <p className="team-details__points-text">
                          Optional Advanced Degree
                          <br />
                          Master’s or Certificate Program
                        </p>
                      </div>
                      <p>Oxford University</p>
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
                        <a href="mailto:Jordan@domain.com">Jordan@domain.com</a>
                      </h5>
                    </div>
                  </div>
                  <div className="team-details__have-question-social">
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstructorDetails;
