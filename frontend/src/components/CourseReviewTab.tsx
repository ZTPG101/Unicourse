import React, { useEffect, useMemo, useState } from "react";
import type { Course } from "../services/courses.service";
import { ReviewsService, type Review } from "../services/reviews.service";
import { CoursesService } from "../services/courses.service";

const REVIEWS_PER_PAGE = 5;

interface CourseReviewTabProps {
  course: Course;
  onReviewSubmitted?: () => void;
}

const CourseReviewTab: React.FC<CourseReviewTabProps> = ({
  course,
  onReviewSubmitted,
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [form, setForm] = useState({
    fullName: "",
    occupation: "",
    review: "",
    rating: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchReviews = async (pageToFetch: number) => {
    const isFirstPage = pageToFetch === 1;
    if (isFirstPage) setLoading(true);
    else setLoadingMore(true);

    try {
      const offset = (pageToFetch - 1) * REVIEWS_PER_PAGE;
      const newReviews = await ReviewsService.getReviewsByCourseId(
        course.id,
        REVIEWS_PER_PAGE,
        offset
      );

      if (newReviews.length < REVIEWS_PER_PAGE) {
        setHasMore(false);
      }

      if (isFirstPage) {
        setReviews(newReviews);
      } else {
        // Add a safeguard against duplicate keys
        setReviews((prev) => {
          const existingIds = new Set(prev.map((r) => r.id));
          const uniqueNewReviews = newReviews.filter(
            (r) => !existingIds.has(r.id)
          );
          return [...prev, ...uniqueNewReviews];
        });
      }
      setPage(pageToFetch);
    } catch (err) {
      setError("Failed to fetch reviews");
    } finally {
      if (isFirstPage) setLoading(false);
      else setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (course.id) {
      fetchReviews(1);
    }
  }, [course.id]);

  const handleLoadMore = () => {
    fetchReviews(page + 1);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.rating === 0) {
      setSubmitError("Please select a rating before submitting.");
      return;
    }
    if (!form.review.trim()) {
      setSubmitError("Please write a review before submitting.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const newReview = await ReviewsService.createReview({
        ...form,
        courseId: course.id,
      });
      setReviews((prev) => [newReview, ...prev]);
      setForm({ fullName: "", occupation: "", review: "", rating: 0 });
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (err: any) {
      if (err.status === 401) {
        setSubmitError("Please login to review this course.");
      } else {
        setSubmitError(err.message || "An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const ratingPercentages = useMemo(() => {
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

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="tab active-tab" id="review">
      <div className="tab active-tab" id="review">
        <div className="course-details__tab-inner">
          {/* Start of Review rating and Review box */}
          <div className="course-details__ratting-and-review-box">
            <ul className="course-details__ratting-box list-unstyled">
              {starData.map((star) => (
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
          {/* Total Reviews Section */}
          <div className="comment-one">
            <h3 className="comment-one__title">
              Total Reviews ({course.reviewCount})
            </h3>

            {reviews.length === 0 ? (
              <div
                className="no-reviews-message"
                style={{ padding: "1rem", color: "#888" }}
              >
                No reviews yet. Be the first to review this course!
              </div>
            ) : (
              <ul className="comment-one__single-list list-unstyled">
                {reviews.map((review) => (
                  <li key={review.id}>
                    <div className="comment-one__single">
                      <div className="comment-one__image-box">
                        <div className="comment-one__image">
                          {/* Optionally use a user image if available, else a placeholder */}
                          <img
                            src="assets/images/blog/comment-1-1.jpg"
                            alt=""
                          />
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
            )}
          </div>
        </div>
        {/* Load More Button */}
        {hasMore && reviews.length > 0 && (
          <div className="text-center mt-3 mb-4">
            <button
              className="thm-btn"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "Load More Reviews"}
            </button>
          </div>
        )}
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
            onSubmit={handleReviewSubmit}
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
                  <div className="alert alert-danger mt-2">{submitError}</div>
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
  );
};

export default CourseReviewTab;
