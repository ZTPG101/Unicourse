import React from "react";

const CourseCurriculumTab: React.FC = () => (
  <div className="tab active-tab" id="curriculum">
    <div className="tab active-tab" id="curriculum">
      <div className="course-details__tab-inner">
        <div className="course-details__curriculam">
          <h3 className="course-details__curriculam-title">
            Course Curriculum
          </h3>
          <p className="course-details__curriculam-text">
            Through engaging lessons and hands-on projects, you’ll learn Python
            fundamentals, data structures, object-oriented programming, and
            popular libraries like NumPy and pandas. You’ll also tackle
            real-world applications such as data analysis and web scraping.
          </p>
          <div className="course-details__curriculam-faq">
            <div className="accrodion-grp" data-grp-name="faq-one-accrodion">
              {/* Repeat this block for each curriculum item */}
              <div className="accrodion">
                <div className="accrodion-title">
                  <div className="accrodion-title-box">
                    <div className="accrodion-title__count"></div>
                    <div className="accrodion-title-text">
                      <h4>What is construction?</h4>
                    </div>
                  </div>
                  <ul className="accrodion-meta list-unstyled">
                    <li>
                      <p>
                        <span className="icon-book"></span>80 Lesson
                      </p>
                    </li>
                    <li>
                      <p>
                        <span className="icon-clock"></span>62h, 20min
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="accrodion-content">
                  <div className="inner">
                    <h3 className="accrodion-content__title">Intermediate</h3>
                    <p className="accrodion-content__text">
                      This curriculum offers a structured path with estimated
                      times for each module, allowing students to plan their
                      study schedule effectively.
                    </p>
                    <ul className="accrodion-content__points list-unstyled">
                      <li>
                        <p className="accrodion-content__points-text">
                          <span className="fal fa-video"></span>Overview of
                          Python and Its Applications
                        </p>
                        <div className="accrodion-content__points-btn">
                          <a href="#">Preview</a>
                        </div>
                        <div className="accrodion-content__icon">
                          <span className="far fa-lock-alt"></span>
                        </div>
                      </li>
                      <li>
                        <p className="accrodion-content__points-text">
                          <span className="fal fa-video"></span>Overview of
                          Python and Its Applications
                        </p>
                        <div className="accrodion-content__points-btn">
                          <a href="#">Preview</a>
                        </div>
                        <div className="accrodion-content__icon">
                          <span className="far fa-lock-alt"></span>
                        </div>
                      </li>
                      <li>
                        <p className="accrodion-content__points-text">
                          <span className="far fa-microphone"></span>
                          Understanding Variables and Data Types
                        </p>
                        <div className="accrodion-content__icon">
                          <span className="far fa-lock-alt"></span>
                        </div>
                      </li>
                      <li>
                        <p className="accrodion-content__points-text">
                          <span className="far fa-microphone"></span>Tuples:
                          Understanding Immutability and Use Cases
                        </p>
                        <div className="accrodion-content__icon">
                          <span className="far fa-lock-alt"></span>
                        </div>
                      </li>
                      <li>
                        <p className="accrodion-content__points-text">
                          <span className="fal fa-file-alt"></span>
                          Nested Loops and Loop Control Statements (break,
                          continue, pass)
                        </p>
                        <div className="accrodion-content__icon">
                          <span className="far fa-lock-alt"></span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* ...repeat for other curriculum items as in your HTML... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CourseCurriculumTab;
