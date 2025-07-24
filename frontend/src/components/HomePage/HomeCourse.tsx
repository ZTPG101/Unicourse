import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import { CoursesService } from "../../services/courses.service";
import type { Course } from "../../services/courses.service";
import CourseCard2 from "../CourseCard2";

const HomeCourse: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomepageCourses = async () => {
      try {
        setLoading(true);
        const fetchedCourses = await CoursesService.getAllCourses(10, 0);
        const uniqueCourses = Array.from(
          new Map(fetchedCourses.map((c) => [c.id, c])).values()
        );
        setCourses(uniqueCourses);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch homepage courses:", err);
        setError("Could not load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchHomepageCourses();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const LoadingCarousel = () => (
    <section className="courses-one">
      <div className="container">
        <div className="text-center p-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </section>
  );

  const ErrorMessage: React.FC<{ error: string }> = ({ error }) => (
    <section className="courses-one">
      <div className="container">
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      </div>
    </section>
  );

  const SectionTitle = () => (
    <div className="section-title text-center sec-title-animation animation-style1">
      <div className="section-title__tagline-box">
        <div className="section-title__tagline-shape"></div>
        <span className="section-title__tagline">Our Courses</span>
      </div>
      <h2 className="section-title__title title-animation">
        More Than Just A Brand: A Journey Of{" "}
        <span>
          Excellence{" "}
          <img
            src="assets/images/shapes/section-title-shape-1.png"
            alt="decorative underline"
          />
        </span>
      </h2>
    </div>
  );

  if (loading) return <LoadingCarousel />;
  if (error) return <ErrorMessage error={error} />;
  return (
    <section className="courses-one">
      <div className="container">
        <SectionTitle />
        {courses.length > 0 ? (
          <div className="courses-one__carousel">
            <Slider {...settings}>
              {courses.map((course) => (
                <div key={course.id} className="course-carousel-item">
                  <CourseCard2 course={course} />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="text-center">
            <p>No courses are available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeCourse;
