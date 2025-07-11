import React from "react";

const SlidingTextOne: React.FC = () => (
  <section className="sliding-text-one">
    <div className="sliding-text-one__wrap">
      <ul className="sliding-text__list list-unstyled marquee_mode">
        <li>
          <h2 data-hover="20+ Instructor" className="sliding-text__title">
            <span className="odometer" data-count="20">00</span>+ Instructor
            <img src="/assets/images/shapes/sliding-text-shape-1.png" alt="" />
          </h2>
        </li>
        <li>
          <h2 data-hover="500+ Online Courses" className="sliding-text__title">
            <span className="odometer" data-count="500">00</span>+ Online Courses
            <img src="/assets/images/shapes/sliding-text-shape-1.png" alt="" />
          </h2>
        </li>
        <li>
          <h2 data-hover="24 Hors Support" className="sliding-text__title">
            24 Hors Support
            <img src="/assets/images/shapes/sliding-text-shape-1.png" alt="" />
          </h2>
        </li>
        <li>
          <h2 data-hover="Courses Certificate" className="sliding-text__title">
            Courses Certificate
            <img src="/assets/images/shapes/sliding-text-shape-1.png" alt="" />
          </h2>
        </li>
      </ul>
    </div>
  </section>
);

export default SlidingTextOne;
