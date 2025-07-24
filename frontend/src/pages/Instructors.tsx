import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import type { Instructor as InstructorType } from "../services/instructor.service";
import { InstructorService } from "../services/instructor.service";
import InstructorCard from "../components/InstructorCard";

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

  const handleInstructorClick = (id: number) => {
    navigate(`/instructors/${id}`);
  };

  return (
    <>
      <PageHeader title="Instructors" breadcrumbs={breadcrumbs} />
      <section className="team-page">
        <div className="container">
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
    </>
  );
};

export default Instructor;
