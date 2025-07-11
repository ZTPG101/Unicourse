import React from "react";

const CourseReviewTab: React.FC = () => (
  <div className="tab active-tab" id="review">
    <div className="tab active-tab" id="review">
      <div className="course-details__tab-inner">
        <div className="course-details__ratting-and-review-box">
          {/* ...ratings and progress bars... */}
          {/* ...review summary... */}
        </div>
        <div className="comment-one">
          <h3 className="comment-one__title">Total Reviews (165)</h3>
          <ul className="comment-one__single-list list-unstyled">
            <li>
              <div className="comment-one__single">
                <div className="comment-one__image-box">
                  <div className="comment-one__image">
                    <img src="assets/images/blog/comment-1-1.jpg" alt="" />
                  </div>
                </div>
                <div className="comment-one__content">
                  <div className="comment-one__name-box">
                    <h4>
                      Alisa Manama <span>Product Designer</span>
                    </h4>
                  </div>
                  <p>
                    This article really resonates with me! As a working parent,
                    online learning has been a game-changer. I’m able to
                    continue my education without sacrificing family time. I
                    genuinely believe that this is the future of education.
                  </p>
                  <div className="comment-one__btn-box">
                    <a href="blog-details.html" className="comment-one__btn">
                      Reply
                    </a>
                    <span>18 July, 2025</span>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="comment-one__single">
                <div className="comment-one__image-box">
                  <div className="comment-one__image">
                    <img src="assets/images/blog/comment-1-2.jpg" alt="" />
                  </div>
                </div>
                <div className="comment-one__content">
                  <div className="comment-one__name-box">
                    <h4>
                      Jordan Walk <span>By Author</span>
                    </h4>
                  </div>
                  <p>
                    Absolutely! It’s amazing how online learning adapts to our
                    lives, isn’t it? Being able to balance work, family, and
                    education is such a huge advantage. Glad it’s working so
                    well for you!
                  </p>
                  <div className="comment-one__btn-box">
                    <a href="blog-details.html" className="comment-one__btn">
                      Reply
                    </a>
                    <span>18 July, 2025</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul className="comment-one__single-list comment-one__single-list-2 list-unstyled">
            <li>
              <div className="comment-one__single">
                <div className="comment-one__image-box">
                  <div className="comment-one__image">
                    <img src="assets/images/blog/comment-1-3.jpg" alt="" />
                  </div>
                </div>
                <div className="comment-one__content">
                  <div className="comment-one__name-box">
                    <h4>
                      Lisa Oliva <span>Fashion Designer</span>
                    </h4>
                  </div>
                  <p>
                    This article really resonates with me! As a working parent,
                    online learning has been a game-changer. I’m able to
                    continue my education without sacrificing family time. I
                    genuinely believe that this is the future of education.
                  </p>
                  <div className="comment-one__btn-box">
                    <a href="blog-details.html" className="comment-one__btn">
                      Reply
                    </a>
                    <span>18 July, 2025</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="comment-form">
          <h3 className="comment-form__title">Submit Your Reviews</h3>
          <div className="comment-form__text-and-ratting">
            <p className="comment-form__text">Your Ratings </p>
            <ul className="comment-form__ratting list-unstyled">
              <li>
                <span className="icon-star"></span>
              </li>
              <li>
                <span className="icon-star"></span>
              </li>
              <li>
                <span className="icon-star"></span>
              </li>
              <li>
                <span className="icon-star"></span>
              </li>
              <li>
                <span className="icon-star"></span>
              </li>
            </ul>
          </div>
          <form
            action="assets/inc/sendemail.php"
            className="comment-form__form contact-form-validated"
            noValidate
          >
            <div className="row">
              <div className="col-xl-6 col-lg-6">
                <div className="comment-form__input-box">
                  <input type="text" placeholder="Full Name" name="name" />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="comment-form__input-box">
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="comment-form__input-box text-message-box">
                  <textarea
                    name="message"
                    placeholder="Write Review"
                  ></textarea>
                </div>
                <div className="comment-form__btn-box">
                  <button type="submit" className="comment-form__btn">
                    <span className="icon-arrow-circle"></span>Submit Review
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="result"></div>
        </div>
      </div>
    </div>
  </div>
);

export default CourseReviewTab;
