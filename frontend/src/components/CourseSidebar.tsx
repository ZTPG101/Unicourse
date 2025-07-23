// src/components/CourseSidebar.tsx

import React, { useEffect } from "react";

// Declare jQuery types for TypeScript
declare global {
  interface Window {
    $: any;
  }
}

// Define the props the sidebar will need from its parent
interface CourseSidebarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  selectedPriceType: string;
  setSelectedPriceType: (value: string) => void;
  categoryList: { name: string; count: number }[];
  selectedCategories: string[];
  toggleCategory: (name: string) => void;
  filteredCategoryCounts: Record<string, number>;
  skillLevels: string[];
  selectedSkillLevels: string[];
  toggleSkillLevel: (level: string) => void;
  skillLevelCounts: Record<string, number>;
  filteredSkillLevelCounts: Record<string, number>;
  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
  sliderInitialized: boolean;
  setSliderInitialized: (initialized: boolean) => void;
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({
  searchInput,
  setSearchInput,
  handleSearchSubmit,
  categoryList,
  selectedCategories,
  toggleCategory,
  filteredCategoryCounts,
  skillLevels,
  selectedSkillLevels,
  toggleSkillLevel,
  skillLevelCounts,
  filteredSkillLevelCounts,
  priceRange,
  setPriceRange,
  sliderInitialized,
  setSliderInitialized,
  selectedPriceType,
  setSelectedPriceType,
}) => {
  useEffect(() => {
    // Wait for jQuery and jQuery UI to be available
    const initSlider = () => {
      if (window.$ && window.$.fn.slider) {
        if (window.$(".price-ranger #slider-range").length) {
          // Destroy existing slider if it exists to allow re-initialization
          if (window.$(".price-ranger #slider-range").hasClass("ui-slider")) {
            window.$(".price-ranger #slider-range").slider("destroy");
          }

          window.$(".price-ranger #slider-range").slider({
            range: true,
            min: 0, // Keep min/max static for the slider UI
            max: 250,
            values: [priceRange.min, priceRange.max],
            slide: function (_event: any, ui: any) {
              // On slide, call the function from the parent to update the state
              setPriceRange({ min: ui.values[0], max: ui.values[1] });
            },
          });
          // Update the input fields visually
          window
            .$(".price-ranger .ranger-min-max-block .min")
            .val("$" + priceRange.min);
          window
            .$(".price-ranger .ranger-min-max-block .max")
            .val("$" + priceRange.max);
          setSliderInitialized(true);
        }
      } else {
        setTimeout(initSlider, 100);
      }
    };

    if (!sliderInitialized) {
      initSlider();
    }
  }, [priceRange, sliderInitialized, setPriceRange, setSliderInitialized]);

  return (
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
          <form onSubmit={handleSearchSubmit}>
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
            {categoryList.map(({ name, count }) => {
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
                    selectedSkillLevels.includes(level) ? "checked" : ""
                  }`}
                ></div>
                <p className="course-grid__list-text">
                  {level} ({filteredSkillLevelCounts[level] || 0} out of{" "}
                  {skillLevelCounts[level]})
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;
