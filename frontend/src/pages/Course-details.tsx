import React, { useState } from "react";
import CourseOverviewTab from "../components/CourseOverviewTab";
import CourseCurriculumTab from "../components/CourseCurriculumTab";
import CourseInstructorTab from "../components/CourseInstructorTab";
import CourseReviewTab from "../components/CourseReviewTab";

const CourseDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "instructor" | "review">("overview");
  return (
    <div className="page-wrapper">
      {/* Header and Navigation (placeholder) */}
      <header className="main-header main-header-three">{/* ... */}</header>
      <div className="stricky-header stricked-menu main-menu">
        <div className="sticky-header__content"></div>
      </div>
      {/* Page Header Start */}
      <section className="page-header">
        <div className="page-header__bg" style={{ backgroundImage: "url(assets/images/shapes/page-header-bg-shape.png)" }}></div>
        <div className="page-header__shape-4">
          <img src="assets/images/shapes/page-header-shape-4.png" alt="" />
        </div>
        <div className="page-header__shape-5">
          <img src="assets/images/shapes/page-header-shape-5.png" alt="" />
        </div>
        <div className="page-header__social">
          <a href="#">Facebook</a>
          <span>//</span>
          <a href="#">Instagram</a>
          <span>//</span>
          <a href="#">LinkedIn</a>
          <span>//</span>
          <a href="#">Twitter</a>
        </div>
        <div className="container">
          <div className="page-header__inner">
            <div className="page-header__img">
              <img src="assets/images/resources/page-header-img-1.png" alt="" />
              <div className="page-header__shape-1">
                <img src="assets/images/shapes/page-header-shape-1.png" alt="" />
              </div>
              <div className="page-header__shape-2">
                <img src="assets/images/shapes/page-header-shape-2.png" alt="" />
              </div>
              <div className="page-header__shape-3">
                <img src="assets/images/shapes/page-header-shape-3.png" alt="" />
              </div>
            </div>
            <h2>Course Details</h2>
            <div className="thm-breadcrumb__box">
              <ul className="thm-breadcrumb list-unstyled">
                <li><a href="index.html">Home</a></li>
                <li><span>//</span></li>
                <li>Course Details</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Course Details Start */}
      <section className="course-details">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <div className="course-details__left">
                <div className="course-details__img">
                  <img src="assets/images/resources/course-details-img-1.jpg" alt="" />
                </div>
                <div className="course-details__content">
                  <div className="course-details__tag-box">
                    <div className="course-details__tag-shape"></div>
                    <span className="course-details__tag">Web Programming</span>
                  </div>
                  <h3 className="course-details__title">Master Python Programming for<br />Beginners and Beyond</h3>
                  <div className="course-details__client-and-ratting-box">
                    <div className="course-details__client-box">
                      <div className="course-details__client-img">
                        <img src="assets/images/resources/course-details-client-img-1.jpg" alt="" />
                      </div>
                      <div className="course-details__client-content">
                        <p><span className="odometer" data-count="20">00</span>+ Years Experiance</p>
                        <h4>Jordan Walk</h4>
                      </div>
                    </div>
                    <div className="course-details__ratting-box-1">
                      <ul className="course-details__ratting-list-1 list-unstyled">
                        <li>
                          <p>Last Update</p>
                          <h4>January 02, 2025</h4>
                        </li>
                        <li>
                          <p>Available</p>
                          <h4>24 Students</h4>
                        </li>
                        <li>
                          <p>(5.0 / 4.2 Rating)</p>
                          <ul className="course-details__ratting list-unstyled">
                            <li><span className="icon-star"></span></li>
                            <li><span className="icon-star"></span></li>
                            <li><span className="icon-star"></span></li>
                            <li><span className="icon-star"></span></li>
                            <li><span className="icon-star"></span></li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Tabs and tab content (Overview, Curriculum, Instructor, Review) */}
                  <div className="course-details__main-tab-box tabs-box">
                    <ul className="tab-buttons list-unstyled">
                      <li
                        className={`tab-btn tab-btn-one${activeTab === "overview" ? " active-btn" : ""}`}
                        onClick={() => setActiveTab("overview")}
                        style={{ cursor: "pointer" }}
                      >
                        <p><span className="icon-pen-ruler"></span>Overview</p>
                      </li>
                      <li
                        className={`tab-btn tab-btn-two${activeTab === "curriculum" ? " active-btn" : ""}`}
                        onClick={() => setActiveTab("curriculum")}
                        style={{ cursor: "pointer" }}
                      >
                        <p><span className="icon-book"></span>Curriculum</p>
                      </li>
                      <li
                        className={`tab-btn tab-btn-three${activeTab === "instructor" ? " active-btn" : ""}`}
                        onClick={() => setActiveTab("instructor")}
                        style={{ cursor: "pointer" }}
                      >
                        <p><span className="icon-graduation-cap"></span>Instructor</p>
                      </li>
                      <li
                        className={`tab-btn tab-btn-four${activeTab === "review" ? " active-btn" : ""}`}
                        onClick={() => setActiveTab("review")}
                        style={{ cursor: "pointer" }}
                      >
                        <p><span className="icon-comments"></span>Review</p>
                      </li>
                    </ul>
                    <div className="tabs-content">
                      {activeTab === "overview" && <CourseOverviewTab />}
                      {activeTab === "curriculum" && <CourseCurriculumTab />}
                      {activeTab === "instructor" && <CourseInstructorTab />}
                      {activeTab === "review" && <CourseReviewTab />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5">
              <div className="course-details__right">
                <div className="course-details__info-box">
                  <div className="course-details__video-link">
                    <div className="course-details__video-link-bg" style={{ backgroundImage: "url(assets/images/backgrounds/course-details-video-link-bg.jpg)" }}></div>
                    <a href="https://www.youtube.com/watch?v=Get7rqXYrbQ" className="video-popup">
                      <div className="course-details__video-icon">
                        <span className="icon-play"></span>
                        <i className="ripple"></i>
                      </div>
                    </a>
                  </div>
                  <div className="course-details__doller-and-btn-box">
                    <h3 className="course-details__doller">$120.00</h3>
                    <div className="course-details__doller-btn-box">
                      <a href="course-details.html" className="thm-btn-two">
                        <span>Enroll Now</span>
                        <i className="icon-angles-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="course-details__social-box">
                    <h5 className="course-details__social-title">Share Course</h5>
                    <div className="course-details__social-list">
                      <a href="#"><span className="fab fa-linkedin-in"></span></a>
                      <a href="#"><span className="fab fa-pinterest-p"></span></a>
                      <a href="#"><span className="fab fa-facebook-f"></span></a>
                      <a href="#"><span className="fab fa-instagram"></span></a>
                    </div>
                  </div>
                  <div className="course-details__info-list">
                    <h3 className="course-details__info-list-title">This Course Included</h3>
                    <ul className="course-details__info-list-1 list-unstyled">
                      <li>
                        <p><i className="icon-book"></i>Lesson</p>
                        <span>50</span>
                      </li>
                      <li>
                        <p><i className="icon-clock"></i>Duration</p>
                        <span>30h, 20m</span>
                      </li>
                      <li>
                        <p><i className="icon-chart-simple"></i>Skill Level</p>
                        <span>Advance</span>
                      </li>
                      <li>
                        <p><i className="icon-globe"></i>Language</p>
                        <span>English, French</span>
                      </li>
                      <li>
                        <p><i className="icon-stamp"></i>Certificate</p>
                        <span>After Completed </span>
                      </li>
                      <li>
                        <p><i className="icon-hourglass"></i>Deadline</p>
                        <span>November 23, 2025</span>
                      </li>
                    </ul>
                  </div>
                  <div className="course-details__cuppon-box">
                    <h5 className="course-details__cuppon-title">Apply Coupon</h5>
                    <form action="#" className="course-details__search-form">
                      <input type="text" placeholder="Enter Coupon Code" />
                      <button type="submit">Apply</button>
                    </form>
                    <p className="course-details__cuppon-text">30 days Money back grantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Mobile Nav Wrapper, Search Popup, Scroll to Top, etc. (placeholder) */}
      <div className="mobile-nav__wrapper">{/* ... */}</div>
      <div className="search-popup">{/* ... */}</div>
      <a href="#" data-target="html" className="scroll-to-target scroll-to-top">
        <span className="scroll-to-top__wrapper"><span className="scroll-to-top__inner"></span></span>
        <span className="scroll-to-top__text"> Go Back Top</span>
      </a>
    </div>
  );
};

export default CourseDetails;
