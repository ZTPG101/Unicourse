import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Instructor as InstructorType } from "../../services/instructor.service";
import { InstructorService } from "../../services/instructor.service";
import { useNavigate } from "react-router-dom";
import InstructorCard from "../InstructorCard";

const TeamOne: React.FC = () => {
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

  const handleInstructorClick = (id: number) => {
    navigate(`/instructors/${id}`);
  };

  const settings = {
    dots: true,
    infinite: instructors.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    swipeToSlide: true,
    touchThreshold: 20,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3, infinite: instructors.length > 3 },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 2, infinite: instructors.length > 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, infinite: instructors.length > 1 },
      },
    ],
  };

  return (
    <section className="team-one">
      <div className="team-one__shape-1 shapemover">
        <img src="assets/images/shapes/team-one-shape-1.png" alt="" />
      </div>
      <div className="team-one__shape-2 float-bob-y">
        <img src="assets/images/shapes/team-one-shape-2.png" alt="" />
      </div>
      <div className="team-one__shape-3">
        <img src="assets/images/shapes/team-one-shape-3.png" alt="" />
      </div>
      <div className="team-one__shape-4 float-bob-x">
        <img src="assets/images/shapes/team-one-shape-4.png" alt="" />
      </div>
      <div className="container">
        <div className="section-title text-left sec-title-animation animation-style2">
          <div className="section-title__tagline-box">
            <div className="section-title__tagline-shape"></div>
            <span className="section-title__tagline">Our Team</span>
          </div>
          <h2 className="section-title__title title-animation">
            Meet the Team Passionate <br />
            People, Exceptional
            <span>
              {" "}
              Talents{" "}
              <img
                src="assets/images/shapes/section-title-shape-1.png"
                alt=""
              />
            </span>
          </h2>
        </div>

        {loading && <div>Loading...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!loading && !error && instructors.length === 0 && (
          <div>No instructors found.</div>
        )}
        {!loading && !error && instructors.length > 0 && (
          <div className="team-one__carousel">
            <Slider {...settings}>
              {instructors.map((instructor) => (
                <div key={instructor.id} className="team-carousel-slide">
                  <InstructorCard
                    instructor={instructor}
                    onClick={() => handleInstructorClick(instructor.id)}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamOne;
