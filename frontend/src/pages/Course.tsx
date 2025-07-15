import React, { useEffect, useState } from "react";
import { CoursesService } from "../services/courses.service";
import type { Course } from "../services/courses.service";
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
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const [totalCourses, setTotalCourses] = useState(0);

  const contentBoxRef = React.useRef<HTMLDivElement>(null);

  // Fetch courses for the current page
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const offset = (currentPage - 1) * coursesPerPage;
        const fetchedCourses = await CoursesService.getAllCourses(coursesPerPage, offset);
        setCourses(fetchedCourses);
        // Optionally, fetch total count for pagination (if backend supports it)
        // For now, setTotalCourses to a high number or fetchedCourses.length if last page
        if (fetchedCourses.length < coursesPerPage && currentPage > 1) {
          setTotalCourses(offset + fetchedCourses.length);
        } else if (currentPage === 1 && fetchedCourses.length < coursesPerPage) {
          setTotalCourses(fetchedCourses.length);
        } else {
          setTotalCourses(currentPage * coursesPerPage + 1); // Fake next page
        }
        setError(null);
      } catch (err) {
        setError("Failed to load courses. Please try again later.");
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [currentPage]);

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
      (course.category && selectedCategories.includes(course.category));

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
              slide: function (event: any, ui: any) {
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
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  // Toggle skill level selection
  const toggleSkillLevel = (level: string) => {
    setSelectedSkillLevels((prev) =>
      prev.includes(level)
        ? prev.filter((skill) => skill !== level)
        : [...prev, level]
    );
  };

  // Predefined categories
  const categorys = [
    "Technology & Programming",
    "Business & Finance",
    "Arts & Design",
    "Personal Development",
    "Language Learning",
    "Academic Subjects",
    "Lifestyle & Hobbies",
  ];
  // Initialize all counts to 0
  const categoryCounts: Record<string, number> = {};
  categorys.forEach((cat) => {
    categoryCounts[cat] = 0;
  });
  courses.forEach((course) => {
    if (course.category && categorys.includes(course.category)) {
      categoryCounts[course.category] =
        (categoryCounts[course.category] || 0) + 1;
    }
  });
  const categoryList = categorys.map((cat) => ({
    name: cat,
    count: categoryCounts[cat],
  }));

  // Compute skill level counts
  const skillLevels = ["Beginner", "Intermediate", "Advanced"];
  const skillLevelCounts: Record<string, number> = {
    Beginner: 0,
    Intermediate: 0,
    Advanced: 0,
  };
  courses.forEach((course) => {
    if (skillLevels.includes(course.level)) {
      skillLevelCounts[course.level] =
        (skillLevelCounts[course.level] || 0) + 1;
    }
  });

  useEffect(() => {
    scrollToContentBox();
  }, [currentPage]);

  // For rendering, use 'courses' directly instead of paginatedCourses
  // For pagination, compute totalPages from totalCourses
  const totalPages = Math.ceil(totalCourses / coursesPerPage);

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
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="search"
                        placeholder="Search by typing here"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button type="submit">
                        <i className="icon-search"></i>
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
                    <div className="course-grid__price-filter-ranger">
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
                              const prices = courses.map(
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
                    </div>
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
                      {categoryList.map(({ name, count }) => (
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
                            {name} ({count})
                          </p>
                        </li>
                      ))}
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
                    {courses.map((course) => (
                      <div className="col-xl-6" key={course.id}>
                        <div className="courses-two__single">
                          <div className="courses-two__img-box">
                            <div className="courses-two__img">
                              <img src={course.imageUrl} alt={course.title} />
                            </div>
                            <div className="courses-two__heart">
                              <a href="#">
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
                              {course.category}
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
