import React, { useEffect, useState } from "react";
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
          <h2 className="section-title__title title-animation">Meet the Team Passionate <br />People, Exceptional
          <span> Talents <img src="assets/images/shapes/section-title-shape-1.png" alt="" /></span></h2>
        </div>
        <div className="row">
          {loading && <div>Loading...</div>}
          {error && <div style={{ color: "red" }}>{error}</div>}
          {!loading && !error && instructors.length === 0 && (
            <div>No instructors found.</div>
          )}
          {!loading &&
              !error &&
              instructors.map((instructor) => (
                <InstructorCard
                  key={instructor.id}
                  instructor={instructor}
                  onClick={() => handleInstructorClick(instructor.id)}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default TeamOne;
