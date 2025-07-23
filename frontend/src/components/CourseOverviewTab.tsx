import React from "react";
import type { Course, Requirement } from "../services/courses.service";

const LearningObjectiveItem: React.FC<{ objective: string }> = ({
  objective,
}) => (
  <li>
    <div className="course-details__overview-points-icon">
      <span className="fas fa-check"></span>
    </div>
    <div className="course-details__overview-points-content">
      <p>{objective}</p>
    </div>
  </li>
);

const RequirementItem: React.FC<{ requirement: Requirement }> = ({
  requirement,
}) => (
  <li className="course-details__points-list-item">
    <div className="course-details__icon-title-wrapper">
      <div className="course-details__points-list-icon">
        <img src="/assets/images/icon/team-details-points-icon.png" alt="" />
      </div>
      <h3 className="course-details__points-list-title">{requirement.title}</h3>
    </div>
    <p className="course-details__points-list-text">{requirement.text}</p>
  </li>
);

const CourseOverviewTab: React.FC<{ course: Course }> = ({ course }) => {
  const hasObjectives =
    course.learningObjectives && course.learningObjectives.length > 0;
  const hasRequirements = course.requirements && course.requirements.length > 0;

  return (
    <div className="tab active-tab" id="overview">
      <div className="course-details__tab-inner">
        <div className="course-details__overview">
          <h3 className="course-details__overview-title">Course Overview</h3>
          <p className="course-details__overview-text-1">
            {course.description || "No description available for this course."}
          </p>

          {/* DYNAMIC "WHAT YOU WILL LEARN" SECTION */}
          {/* This section will only render if the course has learning objectives. */}
          {hasObjectives && (
            <>
              <h3 className="course-details__overview-title-2">
                What You Will Learn
              </h3>
              <ul className="course-details__overview-points list-unstyled">
                {course.learningObjectives.map((objective, index) => (
                  <LearningObjectiveItem key={index} objective={objective} />
                ))}
              </ul>
            </>
          )}

          {/* DYNAMIC "REQUIREMENTS" SECTION */}
          {/* This section will only render if the course has requirements. */}
          {hasRequirements && (
            <>
              <h3 className="course-details__overview-title-3">Requirements</h3>
              <div className="course-details__points-box">
                <div className="row">
                  <div className="col-12">
                    {/* Reusing existing classes for consistent styling */}
                    <ul className="course-details__points-list-2 list-unstyled">
                      {course.requirements.map((req, index) => (
                        <RequirementItem key={index} requirement={req} />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseOverviewTab;
