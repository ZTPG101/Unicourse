import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { ReviewsService } from "../services/reviews.service";
import type { Review } from "../services/reviews.service";

const breadcrumbs = [{ label: "Home", path: "/" }, { label: "Testimonials" }];
const REVIEWS_PER_PAGE = 6;

const Testimonial: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchFiveStarReviews = async (pageToFetch: number) => {
    const isFirstPage = pageToFetch === 1;
    if (isFirstPage) setLoading(true);
    else setLoadingMore(true);

    try {
      const offset = (pageToFetch - 1) * REVIEWS_PER_PAGE;
      const newReviews = await ReviewsService.getAllReviews(
        REVIEWS_PER_PAGE,
        offset,
        5
      );

      if (newReviews.length < REVIEWS_PER_PAGE) {
        setHasMore(false);
      }

      if (isFirstPage) {
        setReviews(newReviews);
      } else {
        setReviews((prev) => [...prev, ...newReviews]);
      }

      setPage(pageToFetch);
    } catch (err) {
      setError("Failed to load testimonials. Please try again later.");
    } finally {
      if (isFirstPage) setLoading(false);
      else setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchFiveStarReviews(1);
  }, []);

  const handleLoadMore = () => {
    fetchFiveStarReviews(page + 1);
  };

  if (loading) {
    return (
      <>
        <PageHeader title="Testimonials" breadcrumbs={breadcrumbs} />
        <div className="container mt-5 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading testimonials...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <PageHeader title="Testimonials" breadcrumbs={breadcrumbs} />
        <div className="container mt-5">
          <div className="alert alert-danger">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Testimonials" breadcrumbs={breadcrumbs} />
      <section className="testimonials-page">
        <div className="container">
          <div className="row">
            {reviews.map((review) => (
              <div className="col-lg-6 col-md-6" key={review.id}>
                <div className="testimonial-three__single">
                  <div className="testimonial-three__rating">
                    {[...Array(5)].map((_, i) => (
                      <span className="icon-star" key={i}></span>
                    ))}
                  </div>
                  <p className="testimonial-three__text">{review.review}</p>
                  <div className="testimonial-three__client-info">
                    <div className="testimonial-three__client-img">
                      <img
                        src={
                          review.user?.avatar ||
                          "assets/images/testimonial/testimonial-3-1.jpg"
                        }
                        alt={review.fullName}
                      />
                    </div>
                    <div className="testimonial-three__client-content">
                      <h4 className="testimonial-three__client-name">
                        {review.fullName}
                      </h4>
                      <p className="testimonial-three__client-sub-title">
                        {review.occupation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-12 text-center mt-4">
              {loading && <div className="spinner-border" role="status" />}
              {!loading && reviews.length === 0 && (
                <div>
                  <h3>No 5-Star Testimonials Yet</h3>
                  <p>
                    Be the first to leave a great review on one of our courses!
                  </p>
                </div>
              )}
              {hasMore && reviews.length > 0 && (
                <button
                  className="thm-btn"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? "Loading..." : "Load More Testimonials"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
