import React from "react";
import { Link } from "react-router-dom";

// Mock data for demonstration
const courses = [
  {
    id: 1,
    imageUrl: "/assets/images/resources/courses-2-1.jpg",
    title: "Getting Started with Computers and Beginner's Guide to Basic Skills",
    price: 240,
    rating: 4.5,
    reviewCount: 129,
    level: "Beginner",
    lessonCount: 45,
    duration: "620h, 55min",
    instructor: {
      name: "Sarah Alison",
      image: "/assets/images/resources/courses-two-client-img-1.jpg",
      experience: 12,
    },
  },
  {
    id: 2,
    imageUrl: "/assets/images/resources/courses-2-1.jpg",
    title: "Getting Started with Computers and Beginner's Guide to Basic Skills",
    price: 240,
    rating: 4.5,
    reviewCount: 129,
    level: "Beginner",
    lessonCount: 45,
    duration: "620h, 55min",
    instructor: {
      name: "Sarah Alison",
      image: "/assets/images/resources/courses-two-client-img-1.jpg",
      experience: 12,
    },
  }
  // ...add more courses as needed
];

const Course: React.FC = () => {
  return (
    <>
      {/* Course Grid Start */}
      <section className="course-grid">
        <div className="container">
          <div className="row">
            {/* Sidebar Start */}
            <div className="col-xl-4 col-lg-5">
              <div className="course-grid__left">
                <div className="course-grid__sidebar">
                  {/* Search Now */}
                  <div className="course-grid__search course-grid__single">
                    <div className="course-grid__title-box">
                      <h3 className="course-grid__title">Search Now</h3>
                      <div className="course-grid__title-shape-1">
                        <img src="/assets/images/shapes/course-grid-title-shape-1.png" alt="" />
                      </div>
                    </div>
                    <p className="course-grid__search-text">With the release of Letraset sheets containi Lorem Ipsum passages</p>
                    <form action="#">
                      <input type="search" placeholder="Find by Categories" />
                      <button type="submit"><i className="icon-search"></i>Search</button>
                    </form>
                  </div>
                  {/* Price Filter */}
                  <div className="course-grid__price-filter course-grid__single">
                    <div className="course-grid__title-box">
                      <h3 className="course-grid__title">Price Filter</h3>
                      <div className="course-grid__title-shape-1">
                        <img src="/assets/images/shapes/course-grid-title-shape-1.png" alt="" />
                      </div>
                    </div>
                    <div className="course-grid__price-filter-free-and-paid-course">
                      <label className="custom-radio">
                        <input type="radio" name="myRadios" value="1" defaultChecked />
                        <span className="radio-dot"></span>
                        <span className="radio-text">Paid Course</span>
                      </label>
                      <label className="custom-radio">
                        <input type="radio" name="myRadios" value="2" />
                        <span className="radio-dot"></span>
                        <span className="radio-text">Free Course</span>
                      </label>
                    </div>
                    <div className="course-grid__price-filter-ranger">
                      <p className="course-grid__price-filter-title">Price: $29 - $65</p>
                      <div className="price-ranger">
                        <div id="slider-range"></div>
                        <div className="ranger-min-max-block">
                          <input type="text" readOnly className="min" />
                          <span> - </span>
                          <input type="text" readOnly className="max" />
                          <input type="submit" value="Apply" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Categories */}
                  <div className="course-grid__categories course-grid__single">
                    <div className="course-grid__title-box">
                      <h3 className="course-grid__title">Categories</h3>
                      <div className="course-grid__title-shape-1">
                        <img src="/assets/images/shapes/course-grid-title-shape-1.png" alt="" />
                      </div>
                    </div>
                    <ul className="list-unstyled course-grid__list-item">
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Accounting & Finace (12)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Programming & Tech (25)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Art & Design (59)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Health & Fitness (24)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Sales & Marketing (40)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">User Research (40)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Business Development (30)</p></li>
                    </ul>
                  </div>
                  {/* Skills Level */}
                  <div className="course-grid__skill course-grid__single">
                    <div className="course-grid__title-box">
                      <h3 className="course-grid__title">Skills Level</h3>
                      <div className="course-grid__title-shape-1">
                        <img src="/assets/images/shapes/course-grid-title-shape-1.png" alt="" />
                      </div>
                    </div>
                    <ul className="list-unstyled course-grid__list-item">
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">All Level (290)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Intermediate (230)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Beginner (40)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Free Seminar (300)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Professional (50)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Advanced (30)</p></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Sidebar End */}
            {/* Course Grid Right Start */}
            <div className="col-xl-8 col-lg-7">
              <div className="course-grid__right">
                <div className="course-list__right-top">
                  <p className="course-list__right-top-text">
                    Showing {courses.length} Courses
                  </p>
                </div>
                <div className="course-grid__right-content-box">
                  <div className="row">
                    {courses.map((course) => (
                      <div className="col-xl-6" key={course.id}>
                        <div className="courses-two__single">
                          <div className="courses-two__img-box">
                            <div className="courses-two__img">
                              <img src={course.imageUrl} alt={course.title} />
                            </div>
                            <div className="courses-two__heart">
                              <a href="#">
                                <span className="icon-heart"></span>
                              </a>
                            </div>
                          </div>
                          <div className="courses-two__content">
                            <div className="courses-two__doller-and-review">
                              <div className="courses-two__doller">
                                <p>${course.price.toFixed(2)}</p>
                              </div>
                              <div className="courses-two__review">
                                <p>
                                  <i className="icon-star"></i> {course.rating}{" "}
                                  <span>({course.reviewCount} Reviews)</span>
                                </p>
                              </div>
                            </div>
                            <h3 className="courses-two__title">
                              <a href="#">{course.title}</a>
                            </h3>
                            <div className="courses-two__btn-and-client-box">
                              <div className="courses-two__btn-box">
                                <a href="#" className="thm-btn-two">
                                  <span>Enroll Now</span>
                                  <i className="icon-angles-right"></i>
                                </a>
                              </div>
                              <div className="courses-two__client-box">
                                <div className="courses-two__client-img">
                                  <img
                                    src={course.instructor.image}
                                    alt={course.instructor.name}
                                  />
                                </div>
                                <div className="courses-two__client-content">
                                  <h4>{course.instructor.name}</h4>
                                  <p>
                                    <span className="odometer" data-count={course.instructor.experience}>
                                      {course.instructor.experience}
                                    </span>
                                    <i>+</i> Years Experience
                                  </p>
                                </div>
                              </div>
                            </div>
                            <ul className="courses-two__meta list-unstyled">
                              <li>
                                <div className="icon">
                                  <span className="icon-chart-simple"></span>
                                </div>
                                <p>{course.level}</p>
                              </li>
                              <li>
                                <div className="icon">
                                  <span className="icon-book"></span>
                                </div>
                                <p>{course.lessonCount} Lesson</p>
                              </li>
                              <li>
                                <div className="icon">
                                  <span className="icon-clock"></span>
                                </div>
                                <p>{course.duration}</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Pagination, etc. can go here */}
              </div>
            </div>
            {/* Course Grid Right End */}
          </div>
        </div>
      </section>
      {/* Course Grid End */}
    </>
  );
};

export default Course;
