import React from "react";
import type { Instructor as InstructorType } from "../services/instructor.service";

interface InstructorCardProps {
  instructor: InstructorType;
  onClick?: () => void;
}

const InstructorCard: React.FC<InstructorCardProps> = ({
  instructor,
  onClick,
}) => {
  const handleSocialClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft"
      data-wow-delay="100ms"
    >
      <div
        className="team-one__single"
        onClick={onClick}
        style={{ cursor: onClick ? "pointer" : "default" }}
      >
        <div className="team-one__img-box">
          <div className="team-one__img">
            <img
              src={instructor.user?.avatar || "assets/images/team/team-1-1.jpg"}
              alt={instructor.user?.name || "Instructor"}
            />
          </div>
          <div className="team-one__content">
            <div
              className="team-one__single-bg-shape"
              style={{
                backgroundImage:
                  "url(assets/images/shapes/team-one-single-bg-shape.png)",
              }}
            ></div>
            <div className="team-one__content-shape-1">
              <img
                src="assets/images/shapes/team-one-content-shape-1.png"
                alt=""
              />
            </div>
            <div className="team-one__content-shape-2">
              <img
                src="assets/images/shapes/team-one-content-shape-2.png"
                alt=""
              />
            </div>
            <div className="team-one__plus-and-social">
              <div className="team-one__plus">
                <span className="icon-plus"></span>
              </div>
              <div className="team-one__social">
                {instructor.linkedin && (
                  <a
                    href={instructor.linkedin}
                    onClick={handleSocialClick}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="fab fa-linkedin-in"></span>
                  </a>
                )}
                {instructor.pinterest && (
                  <a
                    href={instructor.pinterest}
                    onClick={handleSocialClick}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="fab fa-pinterest-p"></span>
                  </a>
                )}
                {instructor.facebook && (
                  <a
                    href={instructor.facebook}
                    onClick={handleSocialClick}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="fab fa-facebook-f"></span>
                  </a>
                )}
                {instructor.instagram && (
                  <a
                    href={instructor.instagram}
                    onClick={handleSocialClick}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="fab fa-instagram"></span>
                  </a>
                )}
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
  );
};

export default InstructorCard;
