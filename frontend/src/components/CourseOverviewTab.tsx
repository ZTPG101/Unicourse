import React from "react";
import { type Course } from "../services/courses.service";

interface CourseOverviewTabProps {
  course: Course;
}

const CourseOverviewTab: React.FC<CourseOverviewTabProps> = ({ course }) => {
  return (
    <div className="tab active-tab" id="overview">
      <div className="tab active-tab" id="overview">
        <div className="course-details__tab-inner">
          <div className="course-details__overview">
            <h3 className="course-details__overview-title">Course Overview</h3>
            <p className="course-details__overview-text-1">
              {course.description}
            </p>
            <p className="course-details__overview-text-2">
              Whether you're new to programming or looking to deepen your Python
              knowledge, this course covers essential concepts and hands-on
              projects to make you proficient in Python, one of the world's most
              versatile and in-demand programming languages.
            </p>
            <h3 className="course-details__overview-title-2">
              What You Will Learn?
            </h3>
            <ul className="course-details__overview-points list-unstyled">
              <li>
                <div className="course-details__overview-points-icon">
                  <span className="fas fa-check"></span>
                </div>
                <div className="course-details__overview-points-content">
                  <h5>Python Basics:</h5>
                  <p>
                    Understand the fundamentals of Python, including syntax,
                    variables, data <br />
                    types, and control structures.
                  </p>
                </div>
              </li>
              <li>
                <div className="course-details__overview-points-icon">
                  <span className="fas fa-check"></span>
                </div>
                <div className="course-details__overview-points-content">
                  <h5>Data Structures:</h5>
                  <p>
                    Dive deep into lists, tuples, dictionaries, and sets for
                    efficient data storage
                    <br /> and manipulation.
                  </p>
                </div>
              </li>
              <li>
                <div className="course-details__overview-points-icon">
                  <span className="fas fa-check"></span>
                </div>
                <div className="course-details__overview-points-content">
                  <h5>Functions and Modules:</h5>
                  <p>
                    Learn to write reusable functions and use Python modules for
                    better code <br />
                    organization.
                  </p>
                </div>
              </li>
              <li>
                <div className="course-details__overview-points-icon">
                  <span className="fas fa-check"></span>
                </div>
                <div className="course-details__overview-points-content">
                  <h5>Object-Oriented Programming (OOP): </h5>
                  <p>
                    Grasp OOP principles with Python, including classes,
                    objects, inheritance,
                    <br /> and encapsulation.
                  </p>
                </div>
              </li>
            </ul>
            <h3 className="course-details__overview-title-3">Requirement?</h3>
            <p className="course-details__overview-text-3">
              Whether you're new to programming or looking to deepen your Python
              knowledge, this course covers essential concepts and hands-on
              projects to make you proficient in Python, one of the world's most
              versatile and in-demand programming languages.
            </p>
            <div className="course-details__points-box">
              <div className="row">
                <div className="col-xl-6">
                  <ul className="course-details__points-list-2 list-unstyled">
                    <li>
                      <div className="course-details__points-list-icon">
                        <img
                          src="assets/images/icon/course-details-points-list-icon-1.png"
                          alt=""
                        />
                      </div>
                      <h3 className="course-details__points-list-title">
                        No Prior Coding Experience
                        <br /> Required:
                      </h3>
                      <p className="course-details__points-list-text">
                        This course is beginner-friendly and
                        <br /> does not assume prior programming
                        <br /> knowledge.
                      </p>
                    </li>
                    <li>
                      <div className="course-details__points-list-icon">
                        <img
                          src="assets/images/icon/course-details-points-list-icon-2.png"
                          alt=""
                        />
                      </div>
                      <h3 className="course-details__points-list-title">
                        Computer with Java
                        <br /> Installed:
                      </h3>
                      <p className="course-details__points-list-text">
                        A computer with Java installed is
                        <br /> capable of running Java applications
                        <br /> and applets.
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="col-xl-6">
                  <ul className="course-details__points-list-2 list-unstyled">
                    <li>
                      <div className="course-details__points-list-icon">
                        <img
                          src="assets/images/icon/course-details-points-list-icon-3.png"
                          alt=""
                        />
                      </div>
                      <h3 className="course-details__points-list-title">
                        Computer with Python
                        <br /> Installed:{" "}
                      </h3>
                      <p className="course-details__points-list-text">
                        You'll need a computer (Windows,
                        <br /> macOS, or Linux) with Python
                        <br /> installed.{" "}
                      </p>
                    </li>
                    <li>
                      <div className="course-details__points-list-icon">
                        <img
                          src="assets/images/icon/course-details-points-list-icon-4.png"
                          alt=""
                        />
                      </div>
                      <h3 className="course-details__points-list-title">
                        Willingness to Learn &<br /> Creativity:{" "}
                      </h3>
                      <p className="course-details__points-list-text">
                        An open mind and enthusiasm for
                        <br /> learning are all you need to succeed in
                        <br /> this course.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverviewTab;
