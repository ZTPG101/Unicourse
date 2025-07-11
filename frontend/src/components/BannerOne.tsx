import React from "react";

const BannerOne: React.FC = () => (
  <section className="banner-one">
    <div
      className="banner-one__bg-shape-1"
      style={{
        backgroundImage: 'url("/assets/images/shapes/banner-one-bg-shape-1.png")'
      }}
    ></div>
    <div className="banner-one__icon-1 img-bounce">
      <img src="/assets/images/icon/idea-bulb.png" alt="" />
    </div>
    <div className="banner-one__icon-2 float-bob-x">
      <img src="/assets/images/icon/3d-alarm.png" alt="" />
    </div>
    <div className="banner-one__icon-3 float-bob-y">
      <img src="/assets/images/icon/linke-icon.png" alt="" />
    </div>
    <div className="banner-one__shape-4 float-bob-x">
      <img src="/assets/images/shapes/banner-one-shape-4.png" alt="" />
    </div>
    <div className="container">
      <div className="row">
        <div className="col-xl-6">
          <div className="banner-one__left">
            <div className="banner-one__title-box">
              <div className="banner-one__title-box-shape">
                <img src="/assets/images/shapes/banner-one-title-box-shape-1.png" alt="" />
              </div>
              <h2 className="banner-one__title">
                Creative 
                <span className="banner-one__title-clr-1"> Growth </span> starts with a
                <span className="banner-one__title-clr-2"> single lesson </span>
              </h2>
            </div>
            <p className="banner-one__text">
              Convenience of online education, allowing learners to acquire
              new <br />
              skills at their own pace and from any location.
            </p>
            <div className="banner-one__thm-and-other-btn-box">
              <div className="banner-one__btn-box">
                <a href="/course" className="thm-btn">
                  <span className="icon-angles-right"></span>Browse Now
                </a>
              </div>
              <div className="banner-one__other-btn-box">
                <a
                  href="https://youtu.be/dQw4w9WgXcQ?si=ad0P4xO5PsJ2T0Cg"
                  className="banner-one__other-btn-1 video-popup"
                >
                  <span className="icon-thumbs-up"></span>Quality Video
                </a>
                <a href="/pricing" className="banner-one__other-btn-1 banner-one__other-btn-2">
                  <span className="icon-thumbs-up"></span>Suitable Price
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="banner-one__right">
            <div className="banner-one__img-box">
              <div className="banner-one__img">
                <img src="/assets/images/resources/banner-two-img-1.png" alt="" />
                {/* Add other shapes and overlays as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BannerOne;