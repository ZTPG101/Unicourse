// src/components/CourseInstructorTab.tsx (Corrected Version)

import React from "react";
import { Link } from "react-router-dom";
import type { Course } from "../services/courses.service";

interface CourseInstructorTabProps {
  course: Course;
}

const CourseInstructorTab: React.FC<CourseInstructorTabProps> = ({ course }) => {
  // The instructor object is already flat, as defined in your service
  const { instructor } = course;

  if (!instructor) {
    return (
      <div className="tab active-tab" id="instructor">
        <div className="course-details__tab-inner">
          <p>Instructor information is not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tab active-tab" id="instructor">
      <div className="course-details__tab-inner">
        <div className="course-details__Instructor">
          <div className="course-details__Instructor-img">
            {/* Access 'image' directly from the instructor object */}
            <img
              src={instructor.image}
              alt={instructor.name}
              className="instructor-avatar"
            />
          </div>

          <div className="course-details__Instructor-content">
            <div className="course-details__Instructor-client-name-box-and-view">
              <div className="course-details__Instructor-client-name-box">
                {/* Access 'name' directly from the instructor object */}
                <h3>{instructor.name}</h3>
                <p>{instructor.occupation || "Instructor"}</p>
              </div>
              <div className="course-details__Instructor-view">
                {/* Use the 'id' that we added in Step 1 */}
                <Link to={`/instructors/${instructor.id}`}>
                  View Full Profile<span className="icon-angles-right"></span>
                </Link>
              </div>
            </div>

            <ul className="team-details__meta list-unstyled" style={{ marginTop: '20px', marginBottom: '25px' }}>
              <li>
                <div className="icon"><span className="fas fa-users"></span></div>
                <div className="content">
                  <p>{instructor.studentsTrained || 0}+</p>
                  <span>Students</span>
                </div>
              </li>
              <li>
                <div className="icon"><span className="far fa-play-circle"></span></div>
                <div className="content">
                  <p>{instructor.coursesCount || 0}</p>
                  <span>Courses</span>
                </div>
              </li>
              <li>
                <div className="icon"><span className="fas fa-graduation-cap"></span></div>
                <div className="content">
                  <p>{instructor.experience || 0}+</p>
                  <span>Years Experience</span>
                </div>
              </li>
            </ul>

            <h4>About Me</h4>
            <p className="course-details__Instructor-text">
              {instructor.bio || "No biography is available for this instructor."}
            </p>

            <div className="course-details__Instructor-social">
              {instructor.linkedin && <a href={instructor.linkedin} target="_blank" rel="noopener noreferrer"><span className="fab fa-linkedin-in"></span></a>}
              {instructor.pinterest && <a href={instructor.pinterest} target="_blank" rel="noopener noreferrer"><span className="fab fa-pinterest-p"></span></a>}
              {instructor.facebook && <a href={instructor.facebook} target="_blank" rel="noopener noreferrer"><span className="fab fa-facebook-f"></span></a>}
              {instructor.instagram && <a href={instructor.instagram} target="_blank" rel="noopener noreferrer"><span className="fab fa-instagram"></span></a>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInstructorTab;