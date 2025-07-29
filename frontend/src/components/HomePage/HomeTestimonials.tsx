import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { aboutPageData } from "../../pages/About"; // Adjust the import path as needed

const HomeTestimonials: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: false, // Hiding default arrows to match the template's look
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="testimonial-one">
      <div className="testimonial-one__shape-1 float-bob-x">
        <img src="assets/images/shapes/testimonial-one-shape-1.png" alt="" />
      </div>
      <div className="testimonial-one__shape-2">
        <img src="assets/images/shapes/testimonial-one-shape-2.png" alt="" />
      </div>
      <div className="container">
        <div className="section-title text-left sec-title-animation animation-style2">
          <div className="section-title__tagline-box">
            <div className="section-title__tagline-shape"></div>
            <span className="section-title__tagline">Testimonial</span>
          </div>
          <h2 className="section-title__title title-animation">
            Explore Genuine Feedback <br />
            from
            <span>
              {" "}
              Happy Clients{" "}
              <img src="assets/images/shapes/section-title-shape-1.png" alt="decorative underline" />
            </span>
          </h2>
        </div>
        <div className="testimonial-one__inner">
          {/* Using react-slick slider component */}
          <Slider {...settings} className="testimonial-one__carousel">
            {aboutPageData.testimonials.map((testimonial, index) => (
              // The "item" div is handled by the slider, we go straight to the single testimonial
              <div className="testimonial-one__single" key={index}>
                <div className="testimonial-one__img-inner">
                  <div className="testimonial-one__img">
                    <img src={aboutPageData.thumbs[index]} alt={testimonial.name} />
                    <div className="testimonial-one__icon">
                      <span className="icon-graduation-cap"></span>
                    </div>
                  </div>
                </div>
                <div className="testimonial-one__content">
                  <div className="testimonial-one__client-info">
                    <h3 className="testimonial-one__client-name"><a href="#">{testimonial.name}</a></h3>
                    <p className="testimonial-one__client-sub-title">{testimonial.role}</p>
                  </div>
                  <p className="testimonial-one__text">{testimonial.text}</p>
                  <div className="testimonial-one__rating-and-social">
                    <ul className="testimonial-one__rating list-unstyled">
                      <li><span className="icon-star"></span></li>
                      <li><span className="icon-star"></span></li>
                      <li><span className="icon-star"></span></li>
                      <li><span className="icon-star"></span></li>
                      <li><span className="icon-star"></span></li>
                    </ul>
                    {/* Social icons can be added here if needed */}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonials;