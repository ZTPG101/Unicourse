import React, { useEffect, useState } from "react";
import { CoursesService } from "../services/courses.service";
import type { Course } from "../services/courses.service";
import { CategoriesService } from '../services/courses.service';
import type { Category } from "../services/courses.service";
import PageHeader from "../components/PageHeader";

// Declare jQuery types for TypeScript
declare global {
  interface Window {
    $: any;
  }
}

// Helper function to format duration from minutes to readable format
const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0 && mins > 0) {
    return `${hours}h, ${mins}min`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${mins}min`;
  }
};

const CourseComponent: React.FC = () => {
  // State for courses and loading
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceRange, setPriceRange] = React.useState({ min: 0, max: 250 });
  const [selectedPriceType, setSelectedPriceType] = React.useState("all");
  const [sliderInitialized, setSliderInitialized] = React.useState(false);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [selectedSkillLevels, setSelectedSkillLevels] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchInput, setSearchInput] = React.useState(""); // <-- new state
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [metadata, setMetadata] = useState<any>(null);

  const contentBoxRef = React.useRef<HTMLDivElement>(null);

  // When filters change, reset to first page
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, priceRange, selectedCategories, selectedSkillLevels]);

  // Fetch all filtered courses (no offset/limit)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Fetch all filtered courses (no pagination on backend)
        const fetchedCourses = await CoursesService.getAllCourses(undefined, undefined, {
          search: searchTerm,
          priceMin: priceRange.min,
          priceMax: priceRange.max,
          categories: selectedCategories.join(','),
          skillLevels: selectedSkillLevels.join(','),
        });
        setCourses(fetchedCourses);
        setError(null);
      } catch (err) {
        setError("Failed to load courses. Please try again later.");
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [searchTerm, priceRange, selectedCategories, selectedSkillLevels]);

  // Fetch all categories on mount
  useEffect(() => {
    CategoriesService.getAllCategories()
      .then(setAllCategories)
      .catch((err) => {
        console.error('Failed to fetch categories', err);
        setAllCategories([]);
      });
  }, []);

  // Fetch metadata when filters change
  useEffect(() => {
    CoursesService.getCoursesMetadata({
      search: searchTerm,
      priceMin: priceRange.min,
      priceMax: priceRange.max,
      categories: selectedCategories.join(','),
      skillLevels: selectedSkillLevels.join(','),
    }).then(setMetadata).catch(() => setMetadata(null));
  }, [searchTerm, priceRange, selectedCategories, selectedSkillLevels]);

  // Filter courses based on price, category, skill level, and search term
  const filteredCourses = courses.filter((course) => {
    // Price filter
    const priceMatch =
      (selectedPriceType === "free"
        ? course.price === 0
        : selectedPriceType === "paid"
        ? course.price > 0
        : true) &&
      course.price >= priceRange.min &&
      course.price <= priceRange.max;

    // Category filter
    const categoryMatch =
      selectedCategories.length === 0 ||
      (course.category && selectedCategories.includes(course.category.name));

    // Skill level filter
    const skillMatch =
      selectedSkillLevels.length === 0 ||
      (course.level && selectedSkillLevels.includes(course.level));

    // Search filter
    const searchMatch =
      searchTerm === "" ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.description &&
        course.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (course.instructor &&
        course.instructor.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    return priceMatch && categoryMatch && skillMatch && searchMatch;
  });

  // Paginate filtered courses on the frontend
  const paginatedCourses = filteredCourses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // Compute filtered count per category
  const filteredCategoryCounts: Record<string, number> = {};
  const isAnyCategoryFilter = selectedCategories.length > 0 || searchTerm || selectedSkillLevels.length > 0 || priceRange.min !== 0 || priceRange.max !== 250;
  const sourceCourses = isAnyCategoryFilter ? filteredCourses : paginatedCourses;
  sourceCourses.forEach((course) => {
    if (course.category && course.category.name) {
      filteredCategoryCounts[course.category.name] = (filteredCategoryCounts[course.category.name] || 0) + 1;
    }
  });

  // Initialize slider when courses are loaded and price range is calculated
  useEffect(() => {
    if (courses.length > 0 && !sliderInitialized) {
      // Wait for jQuery and jQuery UI to be available
      const initSlider = () => {
        if (window.$ && window.$.fn.slider) {
          if (window.$(".price-ranger #slider-range").length) {
            // Destroy existing slider if it exists
            if (window.$(".price-ranger #slider-range").hasClass("ui-slider")) {
              window.$(".price-ranger #slider-range").slider("destroy");
            }

            window.$(".price-ranger #slider-range").slider({
              range: true,
              min: priceRange.min,
              max: priceRange.max,
              values: [priceRange.min, priceRange.max],
              slide: function (_event: any, ui: any) {
                setPriceRange({ min: ui.values[0], max: ui.values[1] });
                window
                  .$(".price-ranger .ranger-min-max-block .min")
                  .val("$" + ui.values[0]);
                window
                  .$(".price-ranger .ranger-min-max-block .max")
                  .val("$" + ui.values[1]);
              },
            });
            window
              .$(".price-ranger .ranger-min-max-block .min")
              .val("$" + priceRange.min);
            window
              .$(".price-ranger .ranger-min-max-block .max")
              .val("$" + priceRange.max);
            setSliderInitialized(true);
          }
        } else {
          // Retry after a short delay if jQuery UI is not loaded yet
          setTimeout(initSlider, 100);
        }
      };

      initSlider();
    }
  }, [courses, priceRange, sliderInitialized]);

  // Toggle category selection
  const toggleCategory = (categoryName: string) => {
    setSelectedCategories((prev) => {
      const updated = prev.includes(categoryName)
        ? prev.filter((cat) => cat !== categoryName)
        : [...prev, categoryName];
      setTimeout(scrollToContentBox, 0);
      return updated;
    });
  };

  // Toggle skill level selection
  const toggleSkillLevel = (level: string) => {
    setSelectedSkillLevels((prev) => {
      const updated = prev.includes(level)
        ? prev.filter((skill) => skill !== level)
        : [...prev, level];
      setTimeout(scrollToContentBox, 0);
      return updated;
    });
  };

  // Always show all categories from allCategories, merging with metadata counts
  const categoryList: { id: number; name: string; count: number }[] = allCategories.map(cat => {
    const meta = metadata?.categories?.find((c: any) => c.name === cat.name);
    return { id: cat.id, name: cat.name, count: meta ? Number(meta.count) : 0 };
  });
  const skillLevels = ["Beginner", "Intermediate", "Advanced"];
  const skillLevelCounts: Record<string, number> = {};
  skillLevels.forEach(level => {
    const found = metadata?.skillLevels?.find((s: any) => s.level === level);
    skillLevelCounts[level] = found ? Number(found.count) : 0;
  });
  const totalCourses = metadata?.totalCourses || 0;

  useEffect(() => {
    scrollToContentBox();
  }, [currentPage]);

  const breadcrumbs = [{ label: "Home", path: "/" }, { label: "Course" }];

  const scrollToContentBox = () => {
    if (contentBoxRef.current) {
      const headerOffset = 200;
      const y = contentBoxRef.current.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 text-center">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader title="Course" breadcrumbs={breadcrumbs} />
      {/* Course Grid Start */}
      <section className="course-grid">
        <div className="container">
          <div className="row">
            {/* Sidebar Start */}
            <div className="col-xl-4 col-lg-5">
              <div className="course-grid__left">
                <div className="course-grid__sidebar">
                  {/* Search Now */}
                  <div className="course-grid__search course-grid__single">
                    <div className="course-grid__title-box">
                      <h3 className="course-grid__title">Search</h3>
                      <div className="course-grid__title-shape-1">
                        <img
                          src="/assets/images/shapes/course-grid-title-shape-1.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <p className="course-grid__search-text">
                      There was a random sentence here, so I write this one.
                    </p>
                    <form onSubmit={(e) => { e.preventDefault(); setSearchTerm(searchInput); }}>
                      <input
                        type="search"
                        placeholder="Search by typing here"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                      <button type="submit">
                        <i className="icon-search"></i>Search
                      </button>
                    </form>
                  </div>
                  {/* Price Filter */}
                  <div className="course-grid__price-filter course-grid__single">
                    <div className="course-grid__title-box">
                      <h3 className="course-grid__title">Price Filter</h3>
                      <div className="course-grid__title-shape-1">
                        <img
                          src="/assets/images/shapes/course-grid-title-shape-1.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="course-grid__price-filter-free-and-paid-course">
                      <label className="custom-radio">
                        <input
                          type="radio"
                          name="priceType"
                          value="all"
                          checked={selectedPriceType === "all"}
                          onChange={(e) => setSelectedPriceType(e.target.value)}
                        />
                        <span className="radio-dot"></span>
                        <span className="radio-text">All Courses</span>
                      </label>
                      <label className="custom-radio">
                        <input
                          type="radio"
                          name="priceType"
                          value="paid"
                          checked={selectedPriceType === "paid"}
                          onChange={(e) => setSelectedPriceType(e.target.value)}
                        />
                        <span className="radio-dot"></span>
                        <span className="radio-text">Paid Courses</span>
                      </label>
                      <label className="custom-radio">
                        <input
                          type="radio"
                          name="priceType"
                          value="free"
                          checked={selectedPriceType === "free"}
                          onChange={(e) => setSelectedPriceType(e.target.value)}
                        />
                        <span className="radio-dot"></span>
                        <span className="radio-text">Free Courses</span>
                      </label>
                    </div>
                    {/* <div className="course-grid__price-filter-ranger">
                      <p className="course-grid__price-filter-title">
                        Price: ${priceRange.min} - ${priceRange.max}
                      </p>
                      <div className="price-ranger">
                        <div id="slider-range"></div>
                        <div className="ranger-min-max-block">
                          <input
                            type="text"
                            readOnly
                            className="min"
                            value={`$${priceRange.min}`}
                          />
                          <span> - </span>
                          <input
                            type="text"
                            readOnly
                            className="max"
                            value={`$${priceRange.max}`}
                          />
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary ms-2"
                            onClick={() => {
                              const prices = filteredCourses.map(
                                (course) => course.price
                              );
                              const minPrice = Math.floor(Math.min(...prices));
                              const maxPrice = Math.ceil(Math.max(...prices));
                              setPriceRange({ min: minPrice, max: maxPrice });
                              setSliderInitialized(false);
                            }}
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  {/* Categories */}
                  <div className="course-grid__categories course-grid__single">
                    <div className="course-grid__title-box">
                      <h3 className="course-grid__title">Categories</h3>
                      <div className="course-grid__title-shape-1">
                        <img
                          src="/assets/images/shapes/course-grid-title-shape-1.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <ul className="list-unstyled course-grid__list-item">
                      {categoryList.map(({ name, count }: { name: string; count: number }) => {
                        const filteredCount = filteredCategoryCounts[name] || 0;
                        return (
                          <li
                            key={name}
                            onClick={() => toggleCategory(name)}
                            style={{ cursor: "pointer" }}
                          >
                            <div
                              className={`course-grid__list-check ${
                                selectedCategories.includes(name) ? "checked" : ""
                              }`}
                            ></div>
                            <p className="course-grid__list-text">
                              {name} ({filteredCount} out of {count})
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {/* Skills Level */}
                  <div className="course-grid__skill course-grid__single">
                    <div className="course-grid__title-box">
                      <h3 className="course-grid__title">Skills Level</h3>
                      <div className="course-grid__title-shape-1">
                        <img
                          src="/assets/images/shapes/course-grid-title-shape-1.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <ul className="list-unstyled course-grid__list-item">
                      {skillLevels.map((level) => (
                        <li
                          key={level}
                          onClick={() => toggleSkillLevel(level)}
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            className={`course-grid__list-check ${
                              selectedSkillLevels.includes(level)
                                ? "checked"
                                : ""
                            }`}
                          ></div>
                          <p className="course-grid__list-text">
                            {level} ({skillLevelCounts[level]})
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Sidebar End */}
            {/* Course Grid Right Start */}
            <div className="col-xl-8 col-lg-7">
              <div className="course-grid__right">
                <div className="course-list__right-top">
                  <p className="course-list__right-top-text">
                    Showing {filteredCourses.length} out of {totalCourses}{" "}
                    Courses
                  </p>
                </div>
                <div
                  className="course-grid__right-content-box"
                  ref={contentBoxRef}
                >
                  <div className="row">
                    {paginatedCourses.map((course) => (
                      <div className="col-xl-6" key={course.id}>
                        <div className="courses-two__single">
                          <div className="courses-two__img-box">
                            <div className="courses-two__img">
                              <img src={course.imageUrl} alt={course.title} />
                            </div>
                            <div className="courses-two__heart">
                              <a href="/wishlist">
                                <span className="icon-heart"></span>
                              </a>
                            </div>
                          </div>
                          <div className="courses-two__content">
                            <div className="courses-two__doller-and-review">
                              <div className="courses-two__doller">
                                <p>${course.price.toFixed(2)}</p>
                              </div>
                              <div className="courses-two__review">
                                <p>
                                  <i className="icon-star"></i> {course.rating}{" "}
                                  <span>({course.reviewCount} Reviews)</span>
                                </p>
                              </div>
                            </div>
                            <h3 className="courses-two__title">
                              <a href="#">{course.title}</a>
                            </h3>
                            {/* Show course category as a badge or line below the title */}
                            <div
                              className="courses-two__category"
                              style={{
                                marginBottom: "8px",
                                color: "#3D59F9",
                                fontWeight: 500,
                              }}
                            >
                              {course.category && course.category.name ? course.category.name : 'Uncategorized'}
                            </div>
                            <div className="courses-two__btn-and-client-box">
                              <div className="courses-two__btn-box">
                                <a
                                  href={`/course-details/${course.id}`}
                                  className="thm-btn-two"
                                >
                                  <span>Enroll Now</span>
                                  <i className="icon-angles-right"></i>
                                </a>
                              </div>
                              <div className="courses-two__client-box">
                                <div className="courses-two__client-img">
                                  <img
                                    src={course.instructor.image}
                                    alt={course.instructor.name}
                                  />
                                </div>
                                <div className="courses-two__client-content">
                                  <h4>{course.instructor.name}</h4>
                                  <p>
                                    <span
                                      className="odometer"
                                      data-count={course.instructor.experience}
                                    >
                                      {course.instructor.experience}
                                    </span>
                                    <i>+</i> Years Experience
                                  </p>
                                </div>
                              </div>
                            </div>
                            <ul className="courses-two__meta list-unstyled">
                              <li>
                                <div className="icon">
                                  <span className="icon-chart-simple"></span>
                                </div>
                                <p>{course.level}</p>
                              </li>
                              <li>
                                <div className="icon">
                                  <span className="icon-book"></span>
                                </div>
                                <p>{course.lessonCount} Lesson</p>
                              </li>
                              <li>
                                <div className="icon">
                                  <span className="icon-clock"></span>
                                </div>
                                <p>{formatDuration(course.duration)}</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Pagination */}
                <div className="blog-list__pagination">
                  <ul className="pg-pagination list-unstyled">
                    <li
                      className={`prev${currentPage === 1 ? " disabled" : ""}`}
                    >
                      <a
                        href="#"
                        aria-label="prev"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                      >
                        <i className="fas fa-arrow-left"></i>
                      </a>
                    </li>
                    {[...Array(totalPages)].map((_, idx) => (
                      <li
                        key={idx + 1}
                        className={`count${
                          currentPage === idx + 1 ? " active" : ""
                        }`}
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(idx + 1);
                          }}
                        >
                          {idx + 1}
                        </a>
                      </li>
                    ))}
                    <li
                      className={`next${
                        currentPage === totalPages ? " disabled" : ""
                      }`}
                    >
                      <a
                        href="#"
                        aria-label="next"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            setCurrentPage(currentPage + 1);
                        }}
                      >
                        <i className="fas fa-arrow-right"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Course Grid Right End */}
          </div>
        </div>
      </section>
      {/* Course Grid End */}
    </>
  );
};

export default CourseComponent;
