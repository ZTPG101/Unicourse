import React from "react";
import Marquee from "react-fast-marquee";

const SlidingTextOne: React.FC = () => (
  <section className="sliding-text-one">
    <div className="sliding-text-one__wrap">
      <Marquee gradient={false} speed={50}>
        <ul className="sliding-text__list list-unstyled">
          <li>
            <h2 data-hover="20+ Instructor" className="sliding-text__title">
              <span className="odometer" data-count="20">99</span>+ Instructor
              <img src="/assets/images/shapes/sliding-text-shape-1.png" alt="" />
            </h2>
          </li>
          <li>
            <h2 data-hover="500+ Online Courses" className="sliding-text__title">
              <span className="odometer" data-count="500">99</span>+ Online Courses
              <img src="/assets/images/shapes/sliding-text-shape-1.png" alt="" />
            </h2>
          </li>
          <li>
            <h2 data-hover="24 Hors Support" className="sliding-text__title">
              24 Hours Support
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
      </Marquee>
    </div>
  </section>
);

export default SlidingTextOne;
