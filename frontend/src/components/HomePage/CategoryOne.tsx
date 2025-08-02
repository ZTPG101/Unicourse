import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoursesService } from "../../services/courses.service";

interface CategoryWithCount {
  id: number;
  name: string;
  count: string;
}

const categoryIcons: Record<string, string> = {
  "Technology & Programming": "/assets/images/icon/categoyr-two-icon-1.png",
  "Business & Finance": "/assets/images/icon/categoyr-two-icon-3.png",
  "Arts & Design": "/assets/images/icon/categoyr-two-icon-2.png",
  "Personal Development": "/assets/images/icon/categoyr-two-icon-6.png",
  "Language Learning": "/assets/images/icon/categoyr-two-icon-5.png",
  "Academic Subjects": "/assets/images/icon/categoyr-two-icon-7.png",
  "Lifestyle & Hobbies": "/assets/images/icon/categoyr-two-icon-4.png",
  "Career & Professional Skills": "/assets/images/icon/categoyr-two-icon-8.png",
};

const CategoryOne: React.FC = () => {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    CoursesService.getCoursesMetadata()
      .then((metadata) => {
        if (metadata && Array.isArray(metadata.categories)) {
          setCategories(metadata.categories);
        }
      })
      .catch((err) => {
        setError("Failed to load course categories.");
        console.error("Error fetching metadata:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/course?categories=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="category-one">
      <div
        className="category-one__bg-shape"
        style={{
          backgroundImage:
            "url(/assets/images/shapes/category-one-bg-shape.png)",
        }}
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
                  Browse Our Categories To
                  <br /> Find Exactly{" "}
                  <span>
                    Courses{" "}
                    <img
                      src="/assets/images/shapes/section-title-shape-2.png"
                      alt=""
                    />
                  </span>
                </h2>
              </div>

              {/* Handle Loading and Error States */}
              {loading && <p>Loading categories...</p>}
              {error && <div className="alert alert-danger">{error}</div>}

              {!loading && !error && (
                <ul className="category-one__category-list list-unstyled">
                  {/* We slice to show a max of 4 categories for a clean look */}
                  {categories.slice(0, 4).map((cat) => {
                    const courseCount = Number(cat.count); // Convert count from string to number
                    return (
                      <li
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.name)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="category-one__count-and-arrow">
                          <div className="category-one__count-box">
                            <div className="category-one__count">
                              {categoryIcons[cat.name] && (
                                <img
                                  src={categoryIcons[cat.name]}
                                  alt={cat.name}
                                  style={{ width: 32, height: 32 }}
                                />
                              )}
                            </div>
                            <div className="category-one__count-content">
                              <h3>{cat.name}</h3>
                              <p>
                                {courseCount} Course
                                {courseCount !== 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                          <div className="category-one__count-arrow">
                            <a>
                              <span className="icon-arrow-up-right-2"></span>
                            </a>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          <div className="col-xl-6 col-lg-5">
            <div className="category-one__right">
              <div className="category-one__img">
                <img
                  src="https://i.ibb.co/cS0vjvfS/Art-and-Illustration-for-Graphic-Design-Example-3.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryOne;
