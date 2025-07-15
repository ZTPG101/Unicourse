import React from "react";
import type { Course } from "../services/courses.service";
import { ReviewsService } from "../services/reviews.service";

interface CourseReviewTabProps {
  course: Course;
}

const CourseReviewTab: React.FC<CourseReviewTabProps> = ({ course }) => {
  // Defensive: always treat reviews as array
  const [reviews, setReviews] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({
    fullName: "",
    occupation: "",
    review: "",
    rating: 0,
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  // Initial fetch with loading state
  React.useEffect(() => {
    const fetchInitialReviews = async () => {
      try {
        setLoading(true);
        let fetchedReviews = await ReviewsService.getReviewsByCourseId(
          course.id
        );
        // Defensive: ensure array
        if (!Array.isArray(fetchedReviews)) {
          fetchedReviews = [];
        }
        setReviews(fetchedReviews);
      } catch (err) {
        setError("Failed to fetch reviews");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialReviews();
  }, [course.id]);

  // Background refresh every 5 seconds
  React.useEffect(() => {
    const fetchBackgroundReviews = async () => {
      try {
        const fetchedReviews = await ReviewsService.getReviewsByCourseId(
          course.id
        );
        if (Array.isArray(fetchedReviews)) {
          setReviews(fetchedReviews);
        }
      } catch (err) {
        console.error("Background review fetch failed:", err);
        // Optionally handle background error silently
      }
    };

    const interval = setInterval(fetchBackgroundReviews, 5000);
    return () => clearInterval(interval);
  }, [course.id]);

  // Initialize odometer when component mounts or rating changes
  React.useEffect(() => {
    // Check if odometer library is available
    if (typeof window !== "undefined" && (window as any).Odometer) {
      const odometerElement = document.querySelector(
        ".course-details__review-count .odometer"
      );
      if (odometerElement) {
        (window as any).Odometer.update(odometerElement, course.rating);
      }
    }
  }, [course.rating]);

  const ratingPercentages = React.useMemo(() => {
    return ReviewsService.calculateRatingPercentages(reviews);
  }, [reviews]);

  function renderStarRow(filledCount: number) {
    return (
      <div className="course-details__ratting-list">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`icon-star${i < filledCount ? "" : " fill-white"}`}
          ></span>
        ))}
      </div>
    );
  }

  const starData = [
    { count: 5, percent: ratingPercentages.fiveStarPercent },
    { count: 4, percent: ratingPercentages.fourStarPercent },
    { count: 3, percent: ratingPercentages.threeStarPercent },
    { count: 2, percent: ratingPercentages.twoStarPercent },
    { count: 1, percent: ratingPercentages.oneStarPercent },
  ];

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Show a message if there are no reviews after loading
  if (reviews.length === 0) {
    // Defensive: fallback values
    const safeReviewCount = 0;
    const safeRating = 0;
    return (
      <div className="tab active-tab" id="review">
        <div className="course-details__tab-inner">
          <div className="course-details__ratting-and-review-box">
            <ul className="course-details__ratting-box list-unstyled">
              {starData.map((star, _idx) => (
                <li key={star.count}>
                  {renderStarRow(star.count)}
                  <div className="progress-levels">
                    <div className="progress-box">
                      <div className="inner count-box">
                        <div className="bar">
                          <div className="bar-innner">
                            <div className="skill-percent">
                              <span className="count-text">{star.percent}</span>
                              <span className="percent">%</span>
                            </div>
                            <div
                              className="bar-fill"
                              style={{ width: `${star.percent}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="course-details__review-box">
              <div className="course-details__review-count">
                <span>{safeRating.toFixed(1)}</span>
              </div>
              <div className="course-details__review-content">
                <p>{safeReviewCount} Reviews</p>
                <ul className="course-details__review-ratting list-unstyled">
                  {[...Array(5)].map((_, index) => (
                    <li key={index}>
                      <span className={`icon-star`}></span>
                    </li>
                  ))}
                </ul>
                <div className="course-details__review-text">
                  <p>
                    <span className="icon-star"></span>
                    No rating yet
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* No reviews message */}
          <div className="comment-one">
            <h3 className="comment-one__title">Total Reviews (0)</h3>
            <div
              className="no-reviews-message"
              style={{ padding: "1rem", color: "#888" }}
            >
              No reviews yet. Be the first to review this course!
            </div>
          </div>
          {/* Start of Comment Form */}
          <div className="comment-form">
            <h3 className="comment-form__title">Submit Your Reviews</h3>
            <div className="comment-form__text-and-ratting">
              <p className="comment-form__text">Your Ratings </p>
              <ul className="comment-form__ratting list-unstyled">
                {[...Array(5)].map((_, i) => (
                  <li
                    key={i}
                    onClick={() => setForm((f) => ({ ...f, rating: i + 1 }))}
                    style={{ cursor: "pointer" }}
                  >
                    <span
                      className={`icon-star${i < form.rating ? " filled" : ""}`}
                    ></span>
                  </li>
                ))}
              </ul>
            </div>
            <form
              className="comment-form__form contact-form-validated"
              noValidate
              onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                setSubmitError(null);
                try {
                  await ReviewsService.createReview({
                    ...form,
                    courseId: course.id,
                  });
                  setForm({
                    fullName: "",
                    occupation: "",
                    review: "",
                    rating: 0,
                  });
                  const fetchedReviews =
                    await ReviewsService.getReviewsByCourseId(course.id);
                  setReviews(fetchedReviews);
                } catch (err) {
                  setSubmitError(
                    "Failed to submit review. Don't forget to rate the course"
                  );
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <div className="row">
                <div className="col-xl-6 col-lg-6">
                  <div className="comment-form__input-box">
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="fullName"
                      value={form.fullName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, fullName: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="comment-form__input-box">
                    <input
                      type="text"
                      placeholder="Occupation (optional)"
                      name="occupation"
                      value={form.occupation}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, occupation: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="comment-form__input-box text-message-box">
                    <textarea
                      name="review"
                      placeholder="Write Review"
                      value={form.review}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, review: e.target.value }))
                      }
                    ></textarea>
                  </div>
                  {submitError && (
                    <div className="alert alert-danger">{submitError}</div>
                  )}
                  <div className="comment-form__btn-box">
                    <button
                      type="submit"
                      className="comment-form__btn"
                      disabled={submitting}
                    >
                      <span className="icon-arrow-circle"></span>
                      {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="result"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tab active-tab" id="review">
      <div className="tab active-tab" id="review">
        <div className="course-details__tab-inner">
          {/* Start of Review rating and Review box */}
          <div className="course-details__ratting-and-review-box">
            <ul className="course-details__ratting-box list-unstyled">
              {starData.map((star, _idx) => (
                <li key={star.count}>
                  {renderStarRow(star.count)}
                  <div className="progress-levels">
                    <div className="progress-box">
                      <div className="inner count-box">
                        <div className="bar">
                          <div className="bar-innner">
                            <div className="skill-percent">
                              <span className="count-text">{star.percent}</span>
                              <span className="percent">%</span>
                            </div>
                            <div
                              className="bar-fill"
                              style={{ width: `${star.percent}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
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
                      <span
                        className={`icon-star ${
                          index < Math.floor(course.rating) ? "filled" : ""
                        }`}
                      ></span>
                    </li>
                  ))}
                </ul>
                <div className="course-details__review-text">
                  <p>
                    <span className="icon-star"></span>
                    {course.rating >= 4.5
                      ? "Excellent"
                      : course.rating >= 4.0
                      ? "Very Good"
                      : course.rating >= 3.5
                      ? "Good"
                      : course.rating >= 3.0
                      ? "Average"
                      : "Poor"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* End of Review rating and Review box */}
          {/* Start of Total Reviews */}
          <div className="comment-one">
            <h3 className="comment-one__title">
              Total Reviews ({course.reviewCount})
            </h3>
            <ul className="comment-one__single-list list-unstyled">
              {reviews.map((review, idx) => (
                <li key={review.id || idx}>
                  <div className="comment-one__single">
                    <div className="comment-one__image-box">
                      <div className="comment-one__image">
                        {/* Optionally use a user image if available, else a placeholder */}
                        <img src="assets/images/blog/comment-1-1.jpg" alt="" />
                      </div>
                    </div>
                    <div className="comment-one__content">
                      <div className="comment-one__name-box">
                        <h4>
                          {review.fullName} <span>{review.occupation}</span>
                        </h4>
                      </div>
                      <p>{review.review}</p>
                      <div className="comment-one__btn-box">
                        {/* Optionally, add a reply button or other actions */}
                        <span>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="comment-one__review-rating">
                        <ul className="comment-one__review-rating list-unstyled">
                          {[...Array(5)].map((_, index) => (
                            <li
                              key={index}
                              style={{
                                display: "inline-block",
                                marginRight: 2,
                              }}
                            >
                              <span
                                className={`icon-star ${
                                  index < Math.floor(review.rating)
                                    ? "filled"
                                    : ""
                                }`}
                              ></span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* End of Total Reviews */}
          {/* Start of Comment Form */}
          <div className="comment-form">
            <h3 className="comment-form__title">Submit Your Reviews</h3>
            <div className="comment-form__text-and-ratting">
              <p className="comment-form__text">Your Ratings </p>
              <ul className="comment-form__ratting list-unstyled">
                {[...Array(5)].map((_, i) => (
                  <li
                    key={i}
                    onClick={() => setForm((f) => ({ ...f, rating: i + 1 }))}
                    style={{ cursor: "pointer" }}
                  >
                    <span
                      className={`icon-star${i < form.rating ? " filled" : ""}`}
                    ></span>
                  </li>
                ))}
              </ul>
            </div>
            <form
              className="comment-form__form contact-form-validated"
              noValidate
              onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                setSubmitError(null);
                try {
                  // Call your backend API (adjust endpoint as needed)
                  await ReviewsService.createReview({
                    ...form,
                    courseId: course.id,
                  });
                  // Optionally, refetch reviews or optimistically add the new review
                  setForm({
                    fullName: "",
                    occupation: "",
                    review: "",
                    rating: 0,
                  });
                  // Refetch reviews
                  const fetchedReviews =
                    await ReviewsService.getReviewsByCourseId(course.id);
                  setReviews(fetchedReviews);
                } catch (err) {
                  setSubmitError("Failed to submit review. Don't forget to rate the course");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <div className="row">
                <div className="col-xl-6 col-lg-6">
                  <div className="comment-form__input-box">
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="fullName"
                      value={form.fullName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, fullName: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="comment-form__input-box">
                    <input
                      type="text"
                      placeholder="Occupation (optional)"
                      name="occupation"
                      value={form.occupation}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, occupation: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="comment-form__input-box text-message-box">
                    <textarea
                      name="review"
                      placeholder="Write Review"
                      value={form.review}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, review: e.target.value }))
                      }
                    ></textarea>
                  </div>
                  {submitError && (
                    <div className="alert alert-danger">{submitError}</div>
                  )}
                  <div className="comment-form__btn-box">
                    <button
                      type="submit"
                      className="comment-form__btn"
                      disabled={submitting}
                    >
                      <span className="icon-arrow-circle"></span>
                      {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="result"></div>
          </div>
          {/* End of Comment Form */}
        </div>
      </div>
    </div>
  );
};

export default CourseReviewTab;
