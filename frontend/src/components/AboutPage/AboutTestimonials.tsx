import React, { useRef, useState } from "react";
import Slider from "react-slick";

interface TestimonialData {
  list: {
    text: string;
    name: string;
    role: string;
    logo: string;
  }[];
  thumbs: string[];
}

interface AboutTestimonialsProps {
  data: TestimonialData;
}

const AboutTestimonials: React.FC<AboutTestimonialsProps> = ({ data }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const slider1 = useRef<Slider>(null);

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
    beforeChange: (_oldIndex: number, newIndex: number) =>
      setActiveTestimonial(newIndex),
  };

  const { list: testimonials, thumbs } = data;

  return (
    <section className="testimonial-two">
      <div className="testimonial-two__carousel owl-carousel owl-theme"></div>
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
                      <p className="testimonial-two__text">{t.text}</p>
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
            <div className="testimonial-two__thumb-outer-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4rem' }}>
              <button
                className="owl-prev"
                aria-label="Previous"
                type="button"
                onClick={() => slider1.current?.slickGoTo((activeTestimonial - 1 + thumbs.length) % thumbs.length)}
              >
                <span className="fa fa-angle-left" aria-hidden="true"></span>
              </button>
              <div className="testimonial-two__thumb-carousel" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                {thumbs.map((src, idx) => (
                  <div
                    className={`testimonial-two__thumb-item${
                      activeTestimonial === idx ? " active-thumb" : ""
                    }`}
                    key={idx}
                    style={{ cursor: "pointer" }}
                    onClick={() => slider1.current?.slickGoTo(idx)}
                  >
                    <div className="testimonial-two__img-holder-box">
                      <div className="testimonial-two__img-holder">
                        <img src={src} alt={`Testimonial thumb ${idx + 1}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="owl-next"
                aria-label="Next"
                type="button"
                onClick={() => slider1.current?.slickGoTo((activeTestimonial + 1) % thumbs.length)}
              >
                <span className="fa fa-angle-right" aria-hidden="true"></span>
              </button>
            </div>
            </div>
            </div>
          </div>
    </section>
  );
};
export default AboutTestimonials;
