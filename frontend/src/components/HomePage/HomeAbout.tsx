import React from "react";

interface MissionVisionItem {
  title: string;
  text: string;
}

interface AboutIntroProps {
  data: {
    mission: MissionVisionItem[];
    vision: MissionVisionItem[];
  };
  missionIndex?: number;
  visionIndex?: number;
}

const HomeAbout: React.FC<AboutIntroProps> = ({
  data,
  missionIndex = 0,
  visionIndex = 0,
}) => {
  const missionToShow = data.mission[missionIndex];
  const visionToShow = data.vision[visionIndex];
  return (
    <section className="about-one">
      <div className="about-one__shape-1">
        <img
          src="assets/images/shapes/about-one-shape-1.png"
          alt="decorative shape"
        />
      </div>
      <div className="about-one__shape-2">
        <img
          src="assets/images/shapes/about-one-shape-2.png"
          alt="decorative shape"
        />
      </div>
      <div className="container">
        <div className="row">
          {/* Left column with images and static stats */}
          <div
            className="col-xl-6 wow slideInLeft"
            data-wow-delay="100ms"
            data-wow-duration="2500ms"
          >
            <div className="about-one__left">
              <div className="about-one__left-shape-1 rotate-me"></div>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="about-one__img-box">
                    <div className="about-one__img">
                      <img
                        src="assets/images/resources/abou-one-img-1.jpg"
                        alt="About us"
                      />
                    </div>
                  </div>
                  <div className="about-one__awards-box">
                    <div className="about-one__awards-count-box">
                      <h3 className="odometer" data-count="45">
                        45
                      </h3>
                      <span>+</span>
                    </div>
                    <p>Awards Winning</p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="about-one__experience-box">
                    <div className="about-one__experience-box-inner">
                      <div className="about-one__experience-icon">
                        <img
                          src="assets/images/icon/about-one-experience-icon.png"
                          alt="Experience icon"
                        />
                      </div>
                      <div className="about-one__experience-count-box">
                        <div className="about-one__experience-count">
                          <h3 className="odometer" data-count="25">
                            25
                          </h3>
                          <span>+</span>
                          <p>Years</p>
                        </div>
                        <p>of experience</p>
                      </div>
                    </div>
                    <div className="about-one__experience-box-shape"></div>
                  </div>
                  <div className="about-one__img-box-2">
                    <div className="about-one__img-2">
                      <img
                        src="assets/images/resources/abou-one-img-2.jpg"
                        alt="About us"
                      />
                    </div>
                    <div className="about-one__img-shape-1 float-bob-y">
                      <img
                        src="assets/images/shapes/about-one-img-shape-1.png"
                        alt="decorative shape"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column with dynamic mission and vision content */}
          <div className="col-xl-6">
            <div className="about-one__right">
              <div className="section-title text-left sec-title-animation animation-style2">
                <div className="section-title__tagline-box">
                  <div className="section-title__tagline-shape"></div>
                  <span className="section-title__tagline">About Us</span>
                </div>
                <h2 className="section-title__title title-animation">
                  Our Story: Built On Values, Driven By
                  <span>
                    {" "}
                    Innovation{" "}
                    <img
                      src="assets/images/shapes/section-title-shape-1.png"
                      alt="decorative underline"
                    />
                  </span>
                </h2>
              </div>
              <p className="about-one__text">
                We are dedicated to transforming education through digital
                innovation, making learning more accessible, engaging, and
                effective for everyone. By integrating cutting-edge technology,
                we aim to create an inclusive and dynamic learning environment.
              </p>
              <ul className="about-one__mission-and-vision list-unstyled">
                {/* Mission Section */}
                <div className="about-one__mission-vision-wrapper">
                  <div className="about-one__icon-and-title">
                    <div className="about-one__icon">
                      <img
                        src="assets/images/icon/mission-icon.png"
                        alt="Mission Icon"
                      />
                    </div>
                    <h3>Our Mission:</h3>
                  </div>
                  <div className="about-one__mission-and-vision-item">
                    <h4 className="about-one__mission-and-vision-item-title">
                      {missionToShow.title}
                    </h4>
                    <p className="about-one__mission-and-vision-text">
                      {missionToShow.text}
                    </p>
                  </div>
                </div>

                {/* Vision Section */}
                <div className="about-one__mission-vision-wrapper">
                  <div className="about-one__icon-and-title">
                    <div className="about-one__icon">
                      <img
                        src="assets/images/icon/vision-icon.png"
                        alt="Vision Icon"
                      />
                    </div>
                    <h3>Our Vision:</h3>
                  </div>
                
                <div className="about-one__mission-and-vision-item">
                  <h4 className="about-one__mission-and-vision-item-title">
                    {visionToShow.title}
                  </h4>
                  <p className="about-one__mission-and-vision-text">
                    {visionToShow.text}
                  </p>
                </div>
                </div>
              </ul>
            </div>

            <div className="about-one__btn-and-live-class">
              <div className="about-one__btn-box">
                <a href="/about" className="about-one__btn thm-btn">
                  <span className="icon-angles-right"></span>Know More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HomeAbout;
