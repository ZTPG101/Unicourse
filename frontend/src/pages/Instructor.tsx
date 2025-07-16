import PageHeader from "../components/PageHeader";

const breadcrumbs = [{ label: "Home", path: "/" }, { label: "Instructor" }];
const Instructor: React.FC = () => {
  return (
    <>
      <PageHeader title="Instructor" breadcrumbs={breadcrumbs} />
      <section className="team-page">
        <div className="container">
          <div className="row">
            {/* Team One Single Start */}
            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="100ms">
              <div className="team-one__single">
                <div className="team-one__img-box">
                  <div className="team-one__img">
                    <img src="assets/images/team/team-1-1.jpg" alt="" />
                  </div>
                  <div className="team-one__content">
                    <div className="team-one__single-bg-shape" style={{ backgroundImage: 'url(assets/images/shapes/team-one-single-bg-shape.png)' }}></div>
                    <div className="team-one__content-shape-1">
                      <img src="assets/images/shapes/team-one-content-shape-1.png" alt="" />
                    </div>
                    <div className="team-one__content-shape-2">
                      <img src="assets/images/shapes/team-one-content-shape-2.png" alt="" />
                    </div>
                    <div className="team-one__plus-and-social">
                      <div className="team-one__plus">
                        <span className="icon-plus"></span>
                      </div>
                      <div className="team-one__social">
                        <a href="#"><span className="fab fa-linkedin-in"></span></a>
                        <a href="#"><span className="fab fa-pinterest-p"></span></a>
                        <a href="#"><span className="fab fa-facebook-f"></span></a>
                        <a href="#"><span className="fab fa-instagram"></span></a>
                      </div>
                    </div>
                    <h3 className="team-one__title"><a href="instructor-details.html">Thomas Alison</a></h3>
                    <p className="team-one__sub-title">UI/UX Expert</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Team One Single End */}
            {/* Team One Single Start */}
            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="200ms">
              <div className="team-one__single">
                <div className="team-one__img-box">
                  <div className="team-one__img">
                    <img src="assets/images/team/team-1-2.jpg" alt="" />
                  </div>
                  <div className="team-one__content">
                    <div className="team-one__single-bg-shape" style={{ backgroundImage: 'url(assets/images/shapes/team-one-single-bg-shape.png)' }}></div>
                    <div className="team-one__content-shape-1">
                      <img src="assets/images/shapes/team-one-content-shape-1.png" alt="" />
                    </div>
                    <div className="team-one__content-shape-2">
                      <img src="assets/images/shapes/team-one-content-shape-2.png" alt="" />
                    </div>
                    <div className="team-one__plus-and-social">
                      <div className="team-one__plus">
                        <span className="icon-plus"></span>
                      </div>
                      <div className="team-one__social">
                        <a href="#"><span className="fab fa-linkedin-in"></span></a>
                        <a href="#"><span className="fab fa-pinterest-p"></span></a>
                        <a href="#"><span className="fab fa-facebook-f"></span></a>
                        <a href="#"><span className="fab fa-instagram"></span></a>
                      </div>
                    </div>
                    <h3 className="team-one__title"><a href="instructor-details.html">Alisa Olivia</a></h3>
                    <p className="team-one__sub-title">Graphics Designer</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Team One Single End */}
            {/* Team One Single Start */}
            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInRight" data-wow-delay="300ms">
              <div className="team-one__single">
                <div className="team-one__img-box">
                  <div className="team-one__img">
                    <img src="assets/images/team/team-1-3.jpg" alt="" />
                  </div>
                  <div className="team-one__content">
                    <div className="team-one__single-bg-shape" style={{ backgroundImage: 'url(assets/images/shapes/team-one-single-bg-shape.png)' }}></div>
                    <div className="team-one__content-shape-1">
                      <img src="assets/images/shapes/team-one-content-shape-1.png" alt="" />
                    </div>
                    <div className="team-one__content-shape-2">
                      <img src="assets/images/shapes/team-one-content-shape-2.png" alt="" />
                    </div>
                    <div className="team-one__plus-and-social">
                      <div className="team-one__plus">
                        <span className="icon-plus"></span>
                      </div>
                      <div className="team-one__social">
                        <a href="#"><span className="fab fa-linkedin-in"></span></a>
                        <a href="#"><span className="fab fa-pinterest-p"></span></a>
                        <a href="#"><span className="fab fa-facebook-f"></span></a>
                        <a href="#"><span className="fab fa-instagram"></span></a>
                      </div>
                    </div>
                    <h3 className="team-one__title"><a href="instructor-details.html">Sarah Wilson</a></h3>
                    <p className="team-one__sub-title">Tech & Programming</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Team One Single End */}
            {/* Team One Single Start */}
            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInRight" data-wow-delay="400ms">
              <div className="team-one__single">
                <div className="team-one__img-box">
                  <div className="team-one__img">
                    <img src="assets/images/team/team-1-4.jpg" alt="" />
                  </div>
                  <div className="team-one__content">
                    <div className="team-one__single-bg-shape" style={{ backgroundImage: 'url(assets/images/shapes/team-one-single-bg-shape.png)' }}></div>
                    <div className="team-one__content-shape-1">
                      <img src="assets/images/shapes/team-one-content-shape-1.png" alt="" />
                    </div>
                    <div className="team-one__content-shape-2">
                      <img src="assets/images/shapes/team-one-content-shape-2.png" alt="" />
                    </div>
                    <div className="team-one__plus-and-social">
                      <div className="team-one__plus">
                        <span className="icon-plus"></span>
                      </div>
                      <div className="team-one__social">
                        <a href="#"><span className="fab fa-linkedin-in"></span></a>
                        <a href="#"><span className="fab fa-pinterest-p"></span></a>
                        <a href="#"><span className="fab fa-facebook-f"></span></a>
                        <a href="#"><span className="fab fa-instagram"></span></a>
                      </div>
                    </div>
                    <h3 className="team-one__title"><a href="instructor-details.html">David Warner</a></h3>
                    <p className="team-one__sub-title">Digital Marketer</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Team One Single End */}
            {/* Team One Single Start */}
            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="500ms">
              <div className="team-one__single">
                <div className="team-one__img-box">
                  <div className="team-one__img">
                    <img src="assets/images/team/team-1-5.jpg" alt="" />
                  </div>
                  <div className="team-one__content">
                    <div className="team-one__single-bg-shape" style={{ backgroundImage: 'url(assets/images/shapes/team-one-single-bg-shape.png)' }}></div>
                    <div className="team-one__content-shape-1">
                      <img src="assets/images/shapes/team-one-content-shape-1.png" alt="" />
                    </div>
                    <div className="team-one__content-shape-2">
                      <img src="assets/images/shapes/team-one-content-shape-2.png" alt="" />
                    </div>
                    <div className="team-one__plus-and-social">
                      <div className="team-one__plus">
                        <span className="icon-plus"></span>
                      </div>
                      <div className="team-one__social">
                        <a href="#"><span className="fab fa-linkedin-in"></span></a>
                        <a href="#"><span className="fab fa-pinterest-p"></span></a>
                        <a href="#"><span className="fab fa-facebook-f"></span></a>
                        <a href="#"><span className="fab fa-instagram"></span></a>
                      </div>
                    </div>
                    <h3 className="team-one__title"><a href="instructor-details.html">James Alexander</a></h3>
                    <p className="team-one__sub-title">Web Designer</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Team One Single End */}
            {/* Team One Single Start */}
            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="600ms">
              <div className="team-one__single">
                <div className="team-one__img-box">
                  <div className="team-one__img">
                    <img src="assets/images/team/team-1-6.jpg" alt="" />
                  </div>
                  <div className="team-one__content">
                    <div className="team-one__single-bg-shape" style={{ backgroundImage: 'url(assets/images/shapes/team-one-single-bg-shape.png)' }}></div>
                    <div className="team-one__content-shape-1">
                      <img src="assets/images/shapes/team-one-content-shape-1.png" alt="" />
                    </div>
                    <div className="team-one__content-shape-2">
                      <img src="assets/images/shapes/team-one-content-shape-2.png" alt="" />
                    </div>
                    <div className="team-one__plus-and-social">
                      <div className="team-one__plus">
                        <span className="icon-plus"></span>
                      </div>
                      <div className="team-one__social">
                        <a href="#"><span className="fab fa-linkedin-in"></span></a>
                        <a href="#"><span className="fab fa-pinterest-p"></span></a>
                        <a href="#"><span className="fab fa-facebook-f"></span></a>
                        <a href="#"><span className="fab fa-instagram"></span></a>
                      </div>
                    </div>
                    <h3 className="team-one__title"><a href="instructor-details.html">William David</a></h3>
                    <p className="team-one__sub-title">Fitness Expert</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Team One Single End */}
            {/* Team One Single Start */}
            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInRight" data-wow-delay="700ms">
              <div className="team-one__single">
                <div className="team-one__img-box">
                  <div className="team-one__img">
                    <img src="assets/images/team/team-1-7.jpg" alt="" />
                  </div>
                  <div className="team-one__content">
                    <div className="team-one__single-bg-shape" style={{ backgroundImage: 'url(assets/images/shapes/team-one-single-bg-shape.png)' }}></div>
                    <div className="team-one__content-shape-1">
                      <img src="assets/images/shapes/team-one-content-shape-1.png" alt="" />
                    </div>
                    <div className="team-one__content-shape-2">
                      <img src="assets/images/shapes/team-one-content-shape-2.png" alt="" />
                    </div>
                    <div className="team-one__plus-and-social">
                      <div className="team-one__plus">
                        <span className="icon-plus"></span>
                      </div>
                      <div className="team-one__social">
                        <a href="#"><span className="fab fa-linkedin-in"></span></a>
                        <a href="#"><span className="fab fa-pinterest-p"></span></a>
                        <a href="#"><span className="fab fa-facebook-f"></span></a>
                        <a href="#"><span className="fab fa-instagram"></span></a>
                      </div>
                    </div>
                    <h3 className="team-one__title"><a href="instructor-details.html">Samuel Jonathan </a></h3>
                    <p className="team-one__sub-title">Cooking Expert</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Team One Single End */}
            {/* Team One Single Start */}
            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInRight" data-wow-delay="800ms">
              <div className="team-one__single">
                <div className="team-one__img-box">
                  <div className="team-one__img">
                    <img src="assets/images/team/team-1-8.jpg" alt="" />
                  </div>
                  <div className="team-one__content">
                    <div className="team-one__single-bg-shape" style={{ backgroundImage: 'url(assets/images/shapes/team-one-single-bg-shape.png)' }}></div>
                    <div className="team-one__content-shape-1">
                      <img src="assets/images/shapes/team-one-content-shape-1.png" alt="" />
                    </div>
                    <div className="team-one__content-shape-2">
                      <img src="assets/images/shapes/team-one-content-shape-2.png" alt="" />
                    </div>
                    <div className="team-one__plus-and-social">
                      <div className="team-one__plus">
                        <span className="icon-plus"></span>
                      </div>
                      <div className="team-one__social">
                        <a href="#"><span className="fab fa-linkedin-in"></span></a>
                        <a href="#"><span className="fab fa-pinterest-p"></span></a>
                        <a href="#"><span className="fab fa-facebook-f"></span></a>
                        <a href="#"><span className="fab fa-instagram"></span></a>
                      </div>
                    </div>
                    <h3 className="team-one__title"><a href="instructor-details.html">Joshua Steven </a></h3>
                    <p className="team-one__sub-title">Product designer</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Team One Single End */}
          </div>
        </div>
      </section>
    </>
  )
}

export default Instructor;