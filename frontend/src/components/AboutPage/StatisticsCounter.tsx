import React from "react";
import CountUp from "react-countup";

interface statItem {
  studentsTrained: number;
  recordedCourses: number;
  satisfactionRate: number;
}

interface StatisticsCounterProps {
  data: {
    stat: statItem[];
  };
}

const StatisticsCounter: React.FC<StatisticsCounterProps> = ({ data }) => {
  const { stat } = data;
  const statData = stat[0] || { studentsTrained: 0, recordedCourses: 0, satisfactionRate: 0 };
  return (
    <section className="counter-one">
      <div
        className="counter-one__bg"
        style={{
          backgroundImage: "url(/assets/images/backgrounds/counter-one-bg.jpg)",
        }}
      >
        <div className="counter-one__video-link">
          <div className="counter-one__video-shape-1">
            <img
              src="/assets/images/shapes/counter-one-video-shape-1.png"
              alt=""
            />
          </div>
          <a
            href="https://www.youtube.com/watch?v=Get7rqXYrbQ"
            className="video-popup"
          >
            <div className="counter-one__video-icon">
              <span className="icon-play"></span>
              <i className="ripple"></i>
            </div>
          </a>
        </div>
      </div>
      <div
        className="counter-one__shape-1"
        style={{
          backgroundImage: "url(/assets/images/shapes/counter-one-shape-1.png)",
        }}
      ></div>
      <div className="container">
        <div className="row">
          <div className="col-xl-8">
            <div className="counter-one__left">
              <ul className="counter-one__list list-unstyled">
                <li style={{ flex: 1, minWidth: 180 }}>
                  <div
                    className="counter-one__count-hover-img"
                    style={{
                      backgroundImage:
                        "url(/assets/images/resources/counter-one-single-hover-img.jpg)",
                    }}
                  ></div>
                  <div className="counter-one__count count-box">
                    <h3 className="count-text">
                      <CountUp end={statData.studentsTrained} duration={4} />
                    </h3>
                    <span>k</span>
                  </div>
                  <p>Student Trained</p>
                </li>
                <li style={{ flex: 1, minWidth: 180 }}>
                  <div
                    className="counter-one__count-hover-img"
                    style={{
                      backgroundImage:
                        "url(/assets/images/resources/counter-one-single-hover-img.jpg)",
                    }}
                  ></div>
                  <div className="counter-one__count count-box">
                    <h3 className="count-text">
                      <CountUp end={statData.recordedCourses} duration={4} />
                    </h3>
                    <span>+</span>
                  </div>
                  <p>Recorded Courses</p>
                </li>
                <li style={{ flex: 1, minWidth: 180 }}>
                  <div
                    className="counter-one__count-hover-img"
                    style={{
                      backgroundImage:
                        "url(/assets/images/resources/counter-one-single-hover-img.jpg)",
                    }}
                  ></div>
                  <div className="counter-one__count count-box">
                    <h3 className="count-text">
                      <CountUp end={statData.satisfactionRate} duration={4} />
                    </h3>
                    <span>M</span>
                  </div>
                  <p>Satisfaction Rate</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default StatisticsCounter;
