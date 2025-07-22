import PageHeader from "../components/PageHeader";

const reviews = [
  {
    id: 1,
    fullName: "Mitchel Watson",
    occupation: "UI/UX Design",
    review: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release.",
    rating: 5,
    image: "assets/images/testimonial/testimonial-3-1.jpg"
  },
  {
    id: 2,
    fullName: "Jessica Brown",
    occupation: "UI/UX Design",
    review: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release.",
    rating: 5,
    image: "assets/images/testimonial/testimonial-3-2.jpg"
  },
  // Add more reviews, some with rating < 5 to test filtering
];

const breadcrumbs = [{ label: "Home", path: "/" }, { label: "Testimonial" }];

const Testimonial: React.FC = () => {
  const fiveStarReviews = reviews.filter(review => review.rating === 5);

  return (
    <>
      <PageHeader title="Testimonial" breadcrumbs={breadcrumbs} />
      <section className="testimonials-page">
        <div className="container">
          <div className="row">
            {fiveStarReviews.length === 0 ? (
              <div className="col-12">
                <p>No 5-star testimonials yet.</p>
              </div>
            ) : (
              fiveStarReviews.map((review) => (
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
                        <img src={review.image} alt={review.fullName} />
                      </div>
                      <div className="testimonial-three__client-content">
                        <h4 className="testimonial-three__client-name">{review.fullName}</h4>
                        <p className="testimonial-three__client-sub-title">{review.occupation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
