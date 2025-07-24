import React from "react";

interface ceoItem {
  name: string;
  title: string;
  image: string;
  signature: string;
  speech: string;
}

interface WhyChooseUsProps {
  data: {
    ceo: ceoItem[];
    // whyChooseUs: whyChooseUsItem[]
  };
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ data }) => {
  const { ceo } = data;
  return (
    <section className="why-choose-three">
      <div className="why-choose-three__shape-1 img-bounce"></div>
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="why-choose-three__left">
              <div className="section-title-two text-left sec-title-animation animation-style2">
                <div className="section-title-two__tagline-box">
                  <div className="section-title-two__tagline-shape">
                    <img
                      src="/assets/images/shapes/section-title-two-shape-1.png"
                      alt=""
                    />
                  </div>
                  <span className="section-title-two__tagline">
                    Why Choose Us
                  </span>
                </div>
                <h2 className="section-title-two__title title-animation">
                  Discover Why Our Student <br /> and Clients{" "}
                  <span>Choose Us</span>
                </h2>
              </div>
              <p className="why-choose-three__text-1">
                Meet the talented individuals who bring our vision to life every
                day. With a shared passion and commitment, our team works
                tirelessly to deliver exceptional quality and innovation.
                Discover the stories, skills, and dedication that make us who we
                are.
              </p>
              <div className="why-choose-three__ceo-speech-box">
                <ul className="why-choose-three__ceo-speech">
                  {ceo.map((item, index) => (
                    <li key={index}>
                      <div className="why-choose-three__ceo-details">
                        <div className="why-choose-three__ceo-img">
                          <img src={item.image} alt="" />
                        </div>
                        <div className="why-choose-three__ceo-content">
                          <p>{item.title}</p>
                          <h5>{item.name}</h5>
                        </div>
                          <p className="why-choose-three__ceo-text">
                            {item.speech}
                          </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="why-choose-three__ceo-speech-border"></div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="why-choose-three__right">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <ul className="list-unstyled why-choose-three__feature">
                    <li>
                      <div className="why-choose-three__feature-single">
                        <div className="why-choose-three__feature-img">
                          <img
                            src="/assets/images/icon/why-choose-three-feature-1.png"
                            alt=""
                          />
                        </div>
                        <div className="why-choose-three__feature-content">
                          <h4 className="why-choose-three__feature-title">
                            AI-Driven Personalization
                          </h4>
                          <p className="why-choose-three__feature-text">
                            Our platform leverages AI to tailor learning paths
                            to individual users. This means each learner
                            receives
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="why-choose-three__feature-single">
                        <div className="why-choose-three__feature-img">
                          <img
                            src="/assets/images/icon/why-choose-three-feature-2.png"
                            alt=""
                          />
                        </div>
                        <div className="why-choose-three__feature-content">
                          <h4 className="why-choose-three__feature-title">
                            Mobile-Optimized Learning
                          </h4>
                          <p className="why-choose-three__feature-text">
                            With a fully responsive mobile interface, learners
                            can access courses
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <ul className="list-unstyled why-choose-three__feature why-choose-three__feature--two">
                    <li>
                      <div className="why-choose-three__feature-single">
                        <div className="why-choose-three__feature-img">
                          <img
                            src="/assets/images/icon/why-choose-three-feature-3.png"
                            alt=""
                          />
                        </div>
                        <div className="why-choose-three__feature-content">
                          <h4 className="why-choose-three__feature-title">
                            Gamified Learning Modules
                          </h4>
                          <p className="why-choose-three__feature-text">
                            Our platform leverages AI to tailor learning paths
                            to individual users. This means each learner
                            receives{" "}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="why-choose-three__feature-single">
                        <div className="why-choose-three__feature-img">
                          <img
                            src="/assets/images/icon/why-choose-three-feature-4.png"
                            alt=""
                          />
                        </div>
                        <div className="why-choose-three__feature-content">
                          <h4 className="why-choose-three__feature-title">
                            Real-Time Analytics and Reporting
                          </h4>
                          <p className="why-choose-three__feature-text">
                            Administrators and educators can access real-time
                            data insights, enabling them.
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUs;
