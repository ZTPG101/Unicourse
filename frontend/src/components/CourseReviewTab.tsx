import React from "react";
import type { Course } from "../services/courses.service";
import { ReviewsService } from "../services/reviews.service";

interface CourseReviewTabProps {
  course: Course;
}

const CourseReviewTab: React.FC<CourseReviewTabProps> = ({ course }) => {
  const [reviews, setReviews] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const fetchedReviews = await ReviewsService.getReviewsByCourseId(course.id);
        setReviews(fetchedReviews);
      } catch (err) {
        setError('Failed to fetch reviews');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
    const interval = setInterval(fetchReviews, 5000);
    return () => clearInterval(interval);
  }, [course.id]);

  // Initialize odometer when component mounts or rating changes
  React.useEffect(() => {
    // Check if odometer library is available
    if (typeof window !== 'undefined' && (window as any).Odometer) {
      const odometerElement = document.querySelector('.course-details__review-count .odometer');
      if (odometerElement) {
        (window as any).Odometer.update(odometerElement, course.rating);
      }
    }
  }, [course.rating]);

  const ratingPercentages = React.useMemo(() => {
    return ReviewsService.calculateRatingPercentages(reviews);
  }, [reviews]);

  if (loading && reviews.length === 0) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (reviews.length === 0) {
    return <div>No reviews yet for this course.</div>;
  }

  return (
    <div className="tab active-tab" id="review">
      <div className="tab active-tab" id="review">
        <div className="course-details__tab-inner">
          <div className="course-details__ratting-and-review-box">
            <ul className="course-details__ratting-box list-unstyled">
              <li>
                <div className="course-details__ratting-list">
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                </div>
                <div className="progress-levels">
                  <div className="progress-box">
                    <div className="inner count-box">
                      <div className="bar">
                        <div className="bar-innner">
                          <div className="skill-percent">
                            <span className="count-text">{ratingPercentages.fiveStarPercent}</span>
                            <span className="percent">%</span>
                          </div>
                          <div
                            className="bar-fill"
                            style={{ width: `${ratingPercentages.fiveStarPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="course-details__ratting-list">
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="fill-white icon-star"></span>
                </div>
                <div className="progress-levels">
                  <div className="progress-box">
                    <div className="inner count-box">
                      <div className="bar">
                        <div className="bar-innner">
                          <div className="skill-percent">
                            <span className="count-text">{ratingPercentages.fourStarPercent}</span>
                            <span className="percent">%</span>
                          </div>
                          <div
                            className="bar-fill"
                            style={{ width: `${ratingPercentages.fourStarPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="course-details__ratting-list">
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="fill-white icon-star"></span>
                  <span className="fill-white icon-star"></span>
                </div>
                <div className="progress-levels">
                  <div className="progress-box">
                    <div className="inner count-box">
                      <div className="bar">
                        <div className="bar-innner">
                          <div className="skill-percent">
                            <span className="count-text">{ratingPercentages.threeStarPercent}</span>
                            <span className="percent">%</span>
                          </div>
                          <div
                            className="bar-fill"
                            style={{ width: `${ratingPercentages.threeStarPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="course-details__ratting-list">
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="fill-white icon-star"></span>
                  <span className="fill-white icon-star"></span>
                  <span className="fill-white icon-star"></span>
                </div>
                <div className="progress-levels">
                  <div className="progress-box">
                    <div className="inner count-box">
                      <div className="bar">
                        <div className="bar-innner">
                          <div className="skill-percent">
                            <span className="count-text">{ratingPercentages.twoStarPercent}</span>
                            <span className="percent">%</span>
                          </div>
                          <div
                            className="bar-fill"
                            style={{ width: `${ratingPercentages.twoStarPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="course-details__ratting-list">
                  <span className="icon-star"></span>
                  <span className="fill-white icon-star"></span>
                  <span className="fill-white icon-star"></span>
                  <span className="fill-white icon-star"></span>
                  <span className="fill-white icon-star"></span>
                </div>
                <div className="progress-levels">
                  <div className="progress-box">
                    <div className="inner count-box">
                      <div className="bar">
                        <div className="bar-innner">
                          <div className="skill-percent">
                            <span className="count-text">{ratingPercentages.oneStarPercent}</span>
                            <span className="percent">%</span>
                          </div>
                          <div
                            className="bar-fill"
                            style={{ width: `${ratingPercentages.oneStarPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div className="course-details__review-box">
              <div className="course-details__review-count">
              <span>{course.rating.toFixed(1)}</span>
              {/* <span className="odometer" data-count={course.rating}>00</span> */}
              </div>
              <div className="course-details__review-content">
                <p>{course.reviewCount} Reviews</p>
                <ul className="course-details__review-ratting list-unstyled">
                  {[...Array(5)].map((_, index) => (
                    <li key={index}>
                      <span className={`icon-star ${index < Math.floor(course.rating) ? 'filled' : ''}`}></span>
                    </li>
                  ))}
                </ul>
                <div className="course-details__review-text">
                  <p>
                    <span className="icon-star"></span>
                    {course.rating >= 4.5 ? 'Excellent' : 
                     course.rating >= 4.0 ? 'Very Good' : 
                     course.rating >= 3.5 ? 'Good' : 
                     course.rating >= 3.0 ? 'Average' : 'Poor'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="comment-one">
            <h3 className="comment-one__title">Total Reviews ({course.reviewCount})</h3>
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
                      This article really resonates with me! As a working
                      parent, online learning has been a game-changer. I’m able
                      to continue my education without sacrificing family time.
                      I genuinely believe that this is the future of education.
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
                      This article really resonates with me! As a working
                      parent, online learning has been a game-changer. I’m able
                      to continue my education without sacrificing family time.
                      I genuinely believe that this is the future of education.
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
};
export default CourseReviewTab;
