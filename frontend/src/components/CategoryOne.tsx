import React from "react";

const categories = [
  {
    icon: "/assets/images/icon/categoyr-two-icon-1.png",
    title: "Tech & Programming",
    courses: "3+ Courses",
  },
  {
    icon: "/assets/images/icon/categoyr-two-icon-2.png",
    title: "Creative Art",
    courses: "3+ Courses",
  },
  // ...add more categories as needed
];

const CategoryOne: React.FC = () => (
  <section className="category-one">
    <div
      className="category-one__bg-shape"
      style={{ backgroundImage: "url(/assets/images/shapes/category-one-bg-shape.png)" }}
    ></div>
    <div className="container">
      <div className="row">
        <div className="col-xl-6 col-lg-7">
          <div className="category-one__left">
            <div className="section-title text-left sec-title-animation animation-style2">
              <div className="section-title__tagline-box">
                <div className="section-title__tagline-shape"></div>
                <span className="section-title__tagline">Category</span>
              </div>
              <h2 className="section-title__title title-animation">
                Browse Our Categories To<br /> Find Exactly <span>Courses <img src="/assets/images/shapes/section-title-shape-2.png" alt="" /></span>
              </h2>
            </div>
            <ul className="category-one__category-list list-unstyled">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <div className="category-one__count-and-arrow">
                    <div className="category-one__count-box">
                      <div className="category-one__count"></div>
                      <div className="category-one__count-content">
                        <h3>{cat.title}</h3>
                        <p>{cat.courses}</p>
                      </div>
                    </div>
                    <div className="category-one__count-arrow">
                      <a href="/course-details"><span className="icon-arrow-up-right-2"></span></a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-xl-6 col-lg-5">
          <div className="category-one__right">
            <div className="category-one__img">
              <img src="/assets/images/resources/category-one-img-1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CategoryOne;
