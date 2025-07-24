const HomeTestimonials: React.FC = () => (
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
            <img src="assets/images/shapes/section-title-shape-1.png" alt="" />
          </span>
        </h2>
      </div>
      <div className="testimonial-one__inner">
        <div className="testimonial-one__carousel owl-theme owl-carousel">
          {/* Testimonial One Single Start */}
          <div className="item">
            <div className="testimonial-one__single">
              <div className="testimonial-one__single-inner">
                <div className="testimonial-one__quote">
                  <span className="icon-quote"></span>
                </div>
                <p className="testimonial-one__text">
                  "This platform has transformed my learning experience! The
                  instructors are knowledgeable and the content is top-notch.
                  Highly recommended."
                </p>
                <div className="testimonial-one__client-info">
                  <div className="testimonial-one__client-img">
                    <img
                      src="assets/images/testimonial/testimonial-1-1.jpg"
                      alt="Client"
                    />
                  </div>
                  <div className="testimonial-one__client-content">
                    <h4 className="testimonial-one__client-name">Jane Doe</h4>
                    <p className="testimonial-one__client-sub-title">Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Testimonial One Single End */}
        </div>
      </div>
    </div>
  </section>
);

export default HomeTestimonials;
