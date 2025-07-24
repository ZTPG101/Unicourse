import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CategoriesService } from "../../services/courses.service";
import type { Category } from "../../services/courses.service";

const BannerOne: React.FC = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    CategoriesService.getAllCategories()
      .then(setCategories)
      .catch((err) => {
        console.error("Failed to fetch categories", err);
        setCategories([]);
      });
  }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/course?search=${encodeURIComponent(searchInput.trim())}`);
    } else {
      navigate('/course');
    }
  };

  const handleCategoryClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    categoryName: string
  ) => {
    e.preventDefault();
    navigate(`/course?categories=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="banner-one">
      <div
        className="banner-one__bg-shape-1"
        style={{
          backgroundImage: 'url("/assets/images/shapes/banner-one-bg-shape-1.png")',
        }}
      ></div>
      <div className="banner-one__icon-1 img-bounce">
        <img src="/assets/images/icon/idea-bulb.png" alt="" />
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
                  <div className="banner-one__udemy-review">
                    <div className="banner-one__udemy-review-img">
                      <img src="/assets/images/resources/banner-one-udemy-review-img.jpg" alt="" />
                    </div>
                    <div className="banner-one__udemy-review-logo">
                      <img src="/assets/images/resources/banner-one-udemy-review-logo.png" alt="" />
                    </div>
                    <div className="banner-one__udemy-review-client-info">
                      <p className="banner-one__udemy-review-client-name">Alisa Olivia/</p>
                      <div className="banner-one__udemy-review-star">
                        <span className="icon-star"></span>
                        <span className="icon-star"></span>
                        <span className="icon-star"></span>
                        <span className="icon-star"></span>
                      </div>
                    </div>
                  </div>
                  <div className="banner-one__img-shape-box rotate-me">
                    <div className="banner-one__img-shape-1">
                      <div className="banner-one__img-shape-2"></div>
                    </div>
                    <div className="banner-one__shape-1">
                      <img src="/assets/images/shapes/banner-one-shape-1.png" alt="" />
                    </div>
                    <div className="banner-one__shape-2 rotate-me">
                      <img src="/assets/images/shapes/banner-one-shape-2.png" alt="" />
                    </div>
                    <div className="banner-one__shape-3">
                      <img src="/assets/images/shapes/banner-one-shape-3.png" alt="" />
                    </div>
                  </div>
                  <div className="banner-one__student-trained">
                    <div className="banner-one__student-trained-shape-1 rotate-me">
                      <img src="/assets/images/shapes/banner-one-student-trained-shape-1.png" alt="" />
                    </div>
                    <ul className="list-unstyled banner-one__student-trained-list">
                      <li>
                        <div className="banner-one__student-trained-img">
                          <img src="/assets/images/resources/banner-one-student-trained-img-1-1.jpg" alt="" />
                        </div>
                      </li>
                      <li>
                        <div className="banner-one__student-trained-img">
                          <img src="/assets/images/resources/banner-one-student-trained-img-1-2.jpg" alt="" />
                        </div>
                      </li>
                    </ul>
                    <div className="banner-one__student-trained-count-box">
                      <div className="banner-one__student-trained-count-box-inner count-box">
                        <p className="count-text" data-stop="2000" data-speed="3000">00</p>
                        <span>+</span>
                      </div>
                      <p className="banner-one__student-trained-text">Success Student</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Category Search Row */}
        <div className="row">
          <div className="col-xl-12">
            <div className="banner-one__category-search-box">
              <div className="banner-one__category-search-inner">
                <form
                  className="banner-one__category-form"
                  onSubmit={handleSearchSubmit}
                >
                  <div className="banner-one__category-input">
                    <input
                      type="search"
                      placeholder="Find Your Course"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="banner-one__category-btn">
                    Search
                  </button>
                </form>
              </div>
              <div className="banner-one__tags">
                {categories.slice(0, 8).map((category) => (
                  <a
                    key={category.id}
                    href={`/course?categories=${encodeURIComponent(category.name)}`}
                    onClick={(e) => handleCategoryClick(e, category.name)}
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerOne;