import React from "react";
import Marquee from "react-fast-marquee";

const SlidingTextThree: React.FC = () => (
  <section className="sliding-text-three sliding-text-four">
        <div className="sliding-text-three__wrap">
          <Marquee gradient={false} speed={50}>
            <ul className="sliding-text__list list-unstyled">
              <li>
                <h2
                  data-hover="20+ Instructor "
                  className="sliding-text-three__title count-box"
                >
                  Testimonial
                  <img
                    src="/assets/images/shapes/sliding-text-three-shape-1.png"
                    alt=""
                  />
                </h2>
              </li>
              <li>
                <h2
                  data-hover="20+ Instructor "
                  className="sliding-text-three__title count-box"
                >
                  Testimonial
                  <img
                    src="/assets/images/shapes/sliding-text-three-shape-1.png"
                    alt=""
                  />
                </h2>
              </li>
              <li>
                <h2
                  data-hover="20+ Instructor "
                  className="sliding-text-three__title count-box"
                >
                  Testimonial
                  <img
                    src="/assets/images/shapes/sliding-text-three-shape-1.png"
                    alt=""
                  />
                </h2>
              </li>
              <li>
                <h2
                  data-hover="20+ Instructor "
                  className="sliding-text-three__title count-box"
                >
                  Testimonial
                  <img
                    src="/assets/images/shapes/sliding-text-three-shape-1.png"
                    alt=""
                  />
                </h2>
              </li>
              <li>
                <h2
                  data-hover="20+ Instructor "
                  className="sliding-text-three__title count-box"
                >
                  Testimonial
                  <img
                    src="/assets/images/shapes/sliding-text-three-shape-1.png"
                    alt=""
                  />
                </h2>
              </li>
            </ul>
          </Marquee>
        </div>
      </section>
);

export default SlidingTextThree;
