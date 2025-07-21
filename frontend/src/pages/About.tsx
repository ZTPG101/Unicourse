import PageHeader from "../components/PageHeader";
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Marquee from "react-fast-marquee";
import CountUp from "react-countup";

const breadcrumbs = [{ label: "Home", path: "/" }, { label: "About" }];

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"mission" | "vision">("mission");
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const slider1 = useRef<Slider>(null);
  const slider2 = useRef<Slider>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonialSettings = {
    asNavFor: nav2 as any,
    ref: (slider: Slider) => setNav1(slider),
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    autoplay: true,    
    autoplaySpeed: 5000,
    beforeChange: (oldIndex: number, newIndex: number) => setActiveTestimonial(newIndex),
  };

  const thumbSettings = {
    asNavFor: nav1 as any,
    ref: (slider: Slider) => setNav2(slider),
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
    centerMode: true,
    infinite: true,
  };

  const testimonials = [
    {
      text: `1It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      name: "Mitchel Clack",
      role: "Tech Specialist",
      logo: "/assets/images/testimonial/testimonial-two-client-logo.png",
    },
    {
      text: `2It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      name: "Mitchela Smith",
      role: "Tech Specialist",
      logo: "/assets/images/testimonial/testimonial-two-client-logo.png",
    },
    {
      text: `3It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      name: "Sarah Smith",
      role: "Tech Specialist",
      logo: "/assets/images/testimonial/testimonial-two-client-logo.png",
    },
  ];

  const thumbs = [
    "/assets/images/testimonial/testimonial-2-1.jpg",
    "/assets/images/testimonial/testimonial-2-2.jpg",
    "/assets/images/testimonial/testimonial-2-3.jpg",
  ];

  return (
    <>
      <PageHeader title="About" breadcrumbs={breadcrumbs} />

      {/* About Three Section */}
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
                  Meet the talented individuals who bring our vision to life
                  every day. With a shared passion and commitment, our team
                  works tirelessly to deliver exceptional quality and
                  innovation.
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
                              <li>
                                <div className="about-three__mission-vission-content">
                                  <h4 className="about-three__mission-vission-title">
                                    It provides tools for course creation
                                  </h4>
                                  <p className="about-three__mission-vission-text">
                                    enrollment management, and tracking learner
                                    progress, ensuring a streamlined learning
                                    experience.
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="about-three__mission-vission-content">
                                  <h4 className="about-three__mission-vission-title">
                                    Many LMS platforms include collaborative{" "}
                                  </h4>
                                  <p className="about-three__mission-vission-text">
                                    collaborative features such as discussion
                                    forums, messaging, and group projects, which
                                    facilitate interaction and communication
                                    among learners
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                      {activeTab === "vision" && (
                        <div className="tab active-tab" id="vission">
                          <div className="tabs-content__inner">
                            <ul className="list-unstyled about-three__mission-vission-list">
                              <li>
                                <div className="about-three__mission-vission-content">
                                  <h4 className="about-three__mission-vission-title">
                                    It sdfsdfsdfsdf tools for course creation
                                  </h4>
                                  <p className="about-three__mission-vission-text">
                                    ensdfsdfsdfsdfsdarning experience.
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="about-three__mission-vission-content">
                                  <h4 className="about-three__mission-vission-title">
                                    Many LMsdfsclude collaborative{" "}
                                  </h4>
                                  <p className="about-three__mission-vission-text">
                                    collaborasdfsdfsdfinteraction and
                                    communication among learners
                                  </p>
                                </div>
                              </li>
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

      {/* Why Choose Three Section */}
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
                  Meet the talented individuals who bring our vision to life
                  every day. With a shared passion and commitment, our team
                  works tirelessly to deliver exceptional quality and
                  innovation. Discover the stories, skills, and dedication that
                  make us who we are.
                </p>
                <div className="why-choose-three__ceo-speech-box">
                  <div className="why-choose-three__ceo-speech">
                    <div className="why-choose-three__ceo-img-two">
                      <img
                        src="/assets/images/resources/why-choose-three-ceo-img-two.jpg"
                        alt=""
                      />
                    </div>
                    <div className="why-choose-three__ceo-details">
                      <div className="why-choose-three__ceo-img">
                        <img
                          src="/assets/images/resources/why-choose-three-ceo-img.jpg"
                          alt=""
                        />
                      </div>
                      <div className="why-choose-three__ceo-content">
                        <p>CEO & FOUNDER</p>
                        <h5>Jordan Williamson</h5>
                      </div>
                    </div>
                    <p className="why-choose-three__ceo-text">
                      It’s an honor to be here with all of you today, especially
                      at such a pivotal moment in the world of education and
                      technology. As we gather here, we’re witnessing rapid
                      shifts in how people learn, work, and grow, and our
                      mission at FIStudy has never felt more relevant.
                    </p>
                  </div>
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

      {/* Counter One Section */}
      <section className="counter-one">
        <div
          className="counter-one__bg"
          style={{
            backgroundImage:
              "url(/assets/images/backgrounds/counter-one-bg.jpg)",
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
            backgroundImage:
              "url(/assets/images/shapes/counter-one-shape-1.png)",
          }}
        ></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <div className="counter-one__left">
                <ul className="counter-one__list list-unstyled">
                  <li>
                    <div
                      className="counter-one__count-hover-img"
                      style={{
                        backgroundImage:
                          "url(/assets/images/resources/counter-one-single-hover-img.jpg)",
                      }}
                    ></div>
                    <div className="counter-one__count count-box">
                      <h3 className="count-text">
                        <CountUp end={99} duration={4} />
                      </h3>
                      <span>k</span>
                    </div>
                    <p>Student Trained</p>
                  </li>
                  <li>
                    <div
                      className="counter-one__count-hover-img"
                      style={{
                        backgroundImage:
                          "url(/assets/images/resources/counter-one-single-hover-img.jpg)",
                      }}
                    ></div>
                    <div className="counter-one__count count-box">
                      <h3 className="count-text">
                        <CountUp end={99} duration={4} />
                      </h3>
                      <span>+</span>
                    </div>
                    <p>Recorded Courses</p>
                  </li>
                  <li>
                    <div
                      className="counter-one__count-hover-img"
                      style={{
                        backgroundImage:
                          "url(/assets/images/resources/counter-one-single-hover-img.jpg)",
                      }}
                    ></div>
                    <div className="counter-one__count count-box">
                      <h3 className="count-text">
                        <CountUp end={99} duration={4} />
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

      {/* Testimonial Two Section */}
      <section className="testimonial-two">
        <div className="testimonial-two__shape-6">
          <img src="/assets/images/shapes/testimonial-two-shape-6.png" alt="" />
        </div>
        <div className="testimonial-two__shape-1">
          <img src="/assets/images/shapes/testimonial-two-shape-1.png" alt="" />
          <div className="testimonial-two__shape-icon-1">
            <img
              src="/assets/images/icon/testimonial-two-shape-icon-1.png"
              alt=""
              className="zoom-fade"
            />
          </div>
          <div className="testimonial-two__shape-img-2">
            <img
              src="/assets/images/testimonial/testimonial-two-shape-img-2.jpg"
              alt=""
            />
          </div>
          <div className="testimonial-two__shape-img-3 img-bounce">
            <img
              src="/assets/images/testimonial/testimonial-two-shape-img-3.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="testimonial-two__shape-2">
          <img src="/assets/images/shapes/testimonial-two-shape-2.png" alt="" />
          <div className="testimonial-two__shape-icon-2 float-bob-y">
            <img
              src="/assets/images/icon/testimonial-two-shape-icon-2.png"
              alt=""
            />
          </div>
          <div className="testimonial-two__shape-img-1 zoom-fade">
            <img
              src="/assets/images/testimonial/testimonial-two-shape-img-1.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="testimonial-two__shape-3 float-bob-x">
          <img src="/assets/images/shapes/testimonial-two-shape-3.png" alt="" />
        </div>
        <div className="testimonial-two__shape-4"></div>
        <div className="testimonial-two__shape-5"></div>
        <div className="container">
          <div className="testimonial-two__inner">
            <div className="testimonial-two__quote">
              <span className="icon-quote"></span>
            </div>
            <div className="testimonial-two__slider">
              <div className="testimonial-two__main-content">
                <Slider
                  {...testimonialSettings}
                  ref={slider1}
                  asNavFor={nav2 as any}
                >
                  {testimonials.map((t, idx) => (
                    <div className="testimonial-two__item" key={idx}>
                      <div className="testimonial-two__inner-content">
                        <div className="testimonial-two__rating">
                          {[...Array(5)].map((_, i) => (
                            <i className="icon-star" key={i}></i>
                          ))}
                        </div>
                        <p className="testimonial-two__text">
                          {t.text.split("\n").map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                        </p>
                        <div className="testimonial-two__client-info">
                          <div className="testimonial-two__client-logo">
                            <img src={t.logo} alt="" />
                          </div>
                          <div className="testimonial-two__client-name-box">
                            <h4 className="testimonial-two__client-name">
                              {t.name}
                            </h4>
                            <p className="testimonial-two__client-sub-title">
                              {t.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="testimonial-two__thumb-outer-box">
                <Slider {...thumbSettings} ref={slider2} asNavFor={nav1 as any}>
                  {thumbs.map((src, idx) => (
                    <div
                      className={`testimonial-two__thumb-item${activeTestimonial === idx ? " active-thumb" : ""}`}
                      key={idx}
                      style={{ cursor: "pointer", opacity: activeTestimonial === idx ? 1 : 0.5, border: activeTestimonial === idx ? "2px solid #007bff" : "2px solid transparent", borderRadius: 8 }}
                      onClick={() => slider1.current?.slickGoTo(idx)}
                    >
                      <div className="testimonial-two__img-holder-box">
                        <div className="testimonial-two__img-holder">
                          <img src={src} alt="" />
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sliding Text Three Section */}
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
    </>
  );
};

export default About;
