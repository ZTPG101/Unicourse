import React, { useEffect, useState } from "react";
import { CoursesService } from "../services/courses.service";
import type { Course } from "../services/courses.service";

interface Category {
  name: string;
  count: number;
}

const categoryIcons: Record<string, string> = {
  "Tech & Programming": "/assets/images/icon/categoyr-two-icon-1.png",
  "Creative Art": "/assets/images/icon/categoyr-two-icon-2.png",
  "Business & Finance": "/assets/images/icon/categoyr-two-icon-3.png",
  "Health & Wellness": "/assets/images/icon/categoyr-two-icon-4.png",
  "Writing & Communication": "/assets/images/icon/categoyr-two-icon-5.png",
  "User Research & Analytics": "/assets/images/icon/categoyr-two-icon-6.png",
  "Digital Marketing": "/assets/images/icon/categoyr-two-icon-7.png",
  "Lifestyle & Productivity": "/assets/images/icon/categoyr-two-icon-8.png",
};

const CategoryOne: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CoursesService.getAllCourses().then((courses: Course[]) => {
      const categoryMap: Record<string, number> = {};
      courses.forEach((course) => {
        if (course.category) {
          categoryMap[course.category] = (categoryMap[course.category] || 0) + 1;
        }
      });
      const categoryList: Category[] = Object.entries(categoryMap).map(([name, count]) => ({ name, count }));
      setCategories(categoryList);
      setLoading(false);
    });
  }, []);

  return (
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
              {loading ? (
                <p>Loading categories...</p>
              ) : (
                <ul className="category-one__category-list list-unstyled">
                  {categories.map((cat, idx) => (
                    <li key={idx}>
                      <div className="category-one__count-and-arrow">
                        <div className="category-one__count-box">
                          <div className="category-one__count">
                            {categoryIcons[cat.name] && (
                              <img src={categoryIcons[cat.name]} alt={cat.name} style={{ width: 32, height: 32 }} />
                            )}
                          </div>
                          <div className="category-one__count-content">
                            <h3>{cat.name}</h3>
                            <p>{cat.count} Course{cat.count > 1 ? 's' : ''}</p>
                          </div>
                        </div>
                        <div className="category-one__count-arrow">
                          <a href="/course-details"><span className="icon-arrow-up-right-2"></span></a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
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
};

export default CategoryOne;
