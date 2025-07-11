import React from "react";

const CourseInstructorTab: React.FC = () => (
  <div className="tab active-tab" id="instructor">
    <div className="tab active-tab" id="instructor">
      <div className="course-details__tab-inner">
        <div className="course-details__Instructor">
          <div className="course-details__Instructor-img">
            <img
              src="assets/images/resources/course-details-Instructor-img.jpg"
              alt=""
            />
          </div>
          <div className="course-details__Instructor-content">
            <div className="course-details__Instructor-client-name-box-and-view">
              <div className="course-details__Instructor-client-name-box">
                <h4>Jordan Walk</h4>
                <p>Sr. Python Developer</p>
              </div>
              <div className="course-details__Instructor-view">
                <a href="#">
                  View Details<span className="icon-angles-right"></span>
                </a>
              </div>
            </div>
            <ul className="course-details__Instructor-ratting-list list-unstyled">
              <li>
                <p>
                  <span className="fas fa-star"></span>(5.0 / 4.2 Rating)
                </p>
              </li>
              <li>
                <p>
                  <span className="fas fa-play-circle"></span>76 Courses
                </p>
              </li>
            </ul>
            <p className="course-details__Instructor-text">
              Jordan Walk is an experienced Senior Python Developer with a
              strong focus on building scalable and efficient solutions.
              <br />
              With extensive knowledge in Python and backend development, Jordan
              has a track record of leading successful projects, optimizing
              performance, and implementing best practices.
            </p>
            <div className="course-details__Instructor-social">
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
);

export default CourseInstructorTab;
