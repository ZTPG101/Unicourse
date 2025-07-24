import React, { useState } from "react";

interface MissionVisionItem {
  title: string;
  text: string;
}

interface AboutIntroProps {
  data: {
    mission: MissionVisionItem[];
    vision: MissionVisionItem[];
  };
}

const AboutIntro: React.FC<AboutIntroProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState("mission");

  const { mission, vision } = data;

  return (
    <section className="about-three">
      <div className="about-three__shape-2 rotate-me"></div>
      <div className="about-three__shape-3 text-rotate-box"></div>
      <div className="about-three__shape-4 float-bob-y"></div>
      <div className="container">
        <div className="row">
          <div className="col-xl-7">
            <div
              className="about-three__left wow slideInLeft"
              data-wow-delay="100ms"
              data-wow-duration="2500ms"
            >
              <div className="about-three__shape-1 img-bounce">
                <img
                  src="/assets/images/shapes/about-three-shape-1.png"
                  alt=""
                />
              </div>
              <div className="about-three__img-box">
                <div className="about-three__img-one">
                  <img
                    src="/assets/images/resources/about-three-img-1.jpg"
                    alt=""
                  />
                </div>
                <div className="about-three__img-two">
                  <img
                    src="/assets/images/resources/about-three-img-2.jpg"
                    alt=""
                  />
                </div>
                <div className="about-three__experience-box">
                  <div className="about-three__experience-box-inner">
                    <div className="about-three__experience-icon">
                      <img
                        src="/assets/images/icon/about-three-experience-icon.png"
                        alt=""
                      />
                    </div>
                    <div className="about-three__experience-count-box">
                      <div className="about-three__experience-count">
                        <h3 className="odometer" data-count="25">
                          00
                        </h3>
                        <span>+</span>
                        <p>Years</p>
                      </div>
                      <p>of experience</p>
                    </div>
                  </div>
                  <div className="about-three__experience-box-shape"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5">
            <div className="about-three__right">
              <div className="section-title-two text-left sec-title-animation animation-style2">
                <div className="section-title-two__tagline-box">
                  <div className="section-title-two__tagline-shape">
                    <img
                      src="/assets/images/shapes/section-title-two-shape-1.png"
                      alt=""
                    />
                  </div>
                  <span className="section-title-two__tagline">About Us</span>
                </div>
                <h2 className="section-title-two__title title-animation">
                  Behind the Scenes: Discover the People & Passion{" "}
                  <span>Behind</span>
                </h2>
              </div>
              <p className="about-three__text-1">
                Meet the talented individuals who bring our vision to life every
                day. With a shared passion and commitment, our team works
                tirelessly to deliver exceptional quality and innovation.
              </p>
              <div className="about-three__mission-vission">
                <div className="about-three__tab-box tabs-box">
                  <ul className="tab-buttons clearfix list-unstyled">
                    <li
                      className={`tab-btn${
                        activeTab === "mission" ? " active-btn" : ""
                      }`}
                      onClick={() => setActiveTab("mission")}
                    >
                      <span>Our Mission</span>
                    </li>
                    <li
                      className={`tab-btn${
                        activeTab === "vision" ? " active-btn" : ""
                      }`}
                      onClick={() => setActiveTab("vision")}
                    >
                      <span>Our Vision</span>
                    </li>
                  </ul>
                  <div className="tabs-content">
                    {activeTab === "mission" && (
                      <div className="tab active-tab" id="mission">
                        <div className="tabs-content__inner">
                          <ul className="list-unstyled about-three__mission-vission-list">
                            {mission.map((item, index) => (
                              <li key={index}>
                                <div className="about-three__mission-vission-content">
                                  <h4 className="about-three__mission-vission-title">
                                    {item.title}
                                  </h4>
                                  <p className="about-three__mission-vission-text">
                                    {item.text}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    {activeTab === "vision" && (
                      <div className="tab active-tab" id="vission">
                        <div className="tabs-content__inner">
                          <ul className="list-unstyled about-three__mission-vission-list">
                            {vision.map((item, index) => (
                              <li key={index}>
                                <div className="about-three__mission-vission-content">
                                  <h4 className="about-three__mission-vission-title">
                                    {item.title}
                                  </h4>
                                  <p className="about-three__mission-vission-text">
                                    {item.text}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutIntro;
