import React, { useEffect, useState } from "react";
import { CoursesService } from "../services/courses.service";
import type { Course } from "../services/courses.service";

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
  
  // State for price filtering
  const [priceRange, setPriceRange] = React.useState({ min: 0, max: 250 });
  const [selectedPriceType, setSelectedPriceType] = React.useState('paid');
  const [sliderInitialized, setSliderInitialized] = React.useState(false);

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const fetchedCourses = await CoursesService.getAllCourses();
        setCourses(fetchedCourses);
        
        // Calculate price range from actual course data
        if (fetchedCourses.length > 0) {
          const prices = fetchedCourses.map(course => course.price);
          const minPrice = Math.floor(Math.min(...prices));
          const maxPrice = Math.ceil(Math.max(...prices));
          
          setPriceRange({ min: minPrice, max: maxPrice });
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on price
  const filteredCourses = courses.filter(course => {
    if (selectedPriceType === 'free') {
      return course.price === 0;
    } else {
      return course.price >= priceRange.min && course.price <= priceRange.max;
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
            if (window.$(".price-ranger #slider-range").hasClass('ui-slider')) {
              window.$(".price-ranger #slider-range").slider('destroy');
            }
            
            window.$(".price-ranger #slider-range").slider({
              range: true,
              min: priceRange.min,
              max: priceRange.max,
              values: [priceRange.min, priceRange.max],
              slide: function (event: any, ui: any) {
                setPriceRange({ min: ui.values[0], max: ui.values[1] });
                window.$(".price-ranger .ranger-min-max-block .min").val("$" + ui.values[0]);
                window.$(".price-ranger .ranger-min-max-block .max").val("$" + ui.values[1]);
              },
            });
            window.$(".price-ranger .ranger-min-max-block .min").val("$" + priceRange.min);
            window.$(".price-ranger .ranger-min-max-block .max").val("$" + priceRange.max);
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
                      <h3 className="course-grid__title">Search Now</h3>
                      <div className="course-grid__title-shape-1">
                        <img src="/assets/images/shapes/course-grid-title-shape-1.png" alt="" />
                      </div>
                    </div>
                    <p className="course-grid__search-text">There was a random sentence here, so I write this one.</p>
                    <form action="#">
                      <input type="search" placeholder="Find by Categories" />
                      <button type="submit"><i className="icon-search"></i>Search</button>
                    </form>
                  </div>
                  {/* Price Filter */}
                  <div className="course-grid__price-filter course-grid__single">
                    <div className="course-grid__title-box">
                      <h3 className="course-grid__title">Price Filter</h3>
                      <div className="course-grid__title-shape-1">
                        <img src="/assets/images/shapes/course-grid-title-shape-1.png" alt="" />
                      </div>
                    </div>
                    <div className="course-grid__price-filter-free-and-paid-course">
                      <label className="custom-radio">
                        <input 
                          type="radio" 
                          name="priceType" 
                          value="paid" 
                          checked={selectedPriceType === 'paid'}
                          onChange={(e) => setSelectedPriceType(e.target.value)}
                        />
                        <span className="radio-dot"></span>
                        <span className="radio-text">Paid Course</span>
                      </label>
                      <label className="custom-radio">
                        <input 
                          type="radio" 
                          name="priceType" 
                          value="free" 
                          checked={selectedPriceType === 'free'}
                          onChange={(e) => setSelectedPriceType(e.target.value)}
                        />
                        <span className="radio-dot"></span>
                        <span className="radio-text">Free Course</span>
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
                              const prices = courses.map(course => course.price);
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
                        <img src="/assets/images/shapes/course-grid-title-shape-1.png" alt="" />
                      </div>
                    </div>
                    <ul className="list-unstyled course-grid__list-item">
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Accounting & Finace (12)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Programming & Tech (25)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Art & Design (59)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Health & Fitness (24)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Sales & Marketing (40)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">User Research (40)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Business Development (30)</p></li>
                    </ul>
                  </div>
                  {/* Skills Level */}
                  <div className="course-grid__skill course-grid__single">
                    <div className="course-grid__title-box">
                      <h3 className="course-grid__title">Skills Level</h3>
                      <div className="course-grid__title-shape-1">
                        <img src="/assets/images/shapes/course-grid-title-shape-1.png" alt="" />
                      </div>
                    </div>
                    <ul className="list-unstyled course-grid__list-item">
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">All Level (290)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Intermediate (230)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Beginner (40)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Free Seminar (300)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Professional (50)</p></li>
                      <li><div className="course-grid__list-check"></div><p className="course-grid__list-text">Advanced (30)</p></li>
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
                    Showing {filteredCourses.length} Courses
                  </p>
                </div>
                <div className="course-grid__right-content-box">
                  <div className="row">
                    {filteredCourses.map((course) => (
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
                            <div className="courses-two__btn-and-client-box">
                              <div className="courses-two__btn-box">
                                <a href="#" className="thm-btn-two">
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
                                    <span className="odometer" data-count={course.instructor.experience}>
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
                {/* Pagination, etc. can go here */}
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
