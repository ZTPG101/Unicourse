import React, { useEffect, useState } from "react";
import { CoursesService } from "../services/courses.service";
import type { Course } from "../services/courses.service";
import { CategoriesService } from "../services/courses.service";
import type { Category } from "../services/courses.service";
import PageHeader from "../components/PageHeader";
import { useLocation } from "react-router-dom";
import CourseSidebar from "../components/CourseSidebar";
import CourseCard from "../components/CourseCard";
import Pagination from "../components/Pagination";

// Declare jQuery types for TypeScript
declare global {
  interface Window {
    $: any;
  }
}

const CourseComponent: React.FC = () => {
  // State for courses and loading
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceRange, setPriceRange] = React.useState({ min: 0, max: 250 });
  const [selectedPriceType, setSelectedPriceType] = React.useState("all");
  const [sliderInitialized, setSliderInitialized] = React.useState(false);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [selectedSkillLevels, setSelectedSkillLevels] = React.useState<
    string[]
  >([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [metadata, setMetadata] = useState<any>(null);

  const contentBoxRef = React.useRef<HTMLDivElement>(null);
  const location = useLocation();

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
        const fetchedCourses = await CoursesService.getAllCourses(
          undefined,
          undefined,
          {
            search: searchTerm,
            priceMin: priceRange.min,
            priceMax: priceRange.max,
            categories: selectedCategories.join(","),
            skillLevels: selectedSkillLevels.join(","),
          }
        );
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
        console.error("Failed to fetch categories", err);
        setAllCategories([]);
      });
  }, []);

  // Fetch metadata when filters change
  useEffect(() => {
    CoursesService.getCoursesMetadata({
      search: searchTerm,
      priceMin: priceRange.min,
      priceMax: priceRange.max,
      categories: selectedCategories.join(","),
      skillLevels: selectedSkillLevels.join(","),
    })
      .then(setMetadata)
      .catch(() => setMetadata(null));
  }, [searchTerm, priceRange, selectedCategories, selectedSkillLevels]);

  // Add this useEffect to read URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("search");
    const categoriesParam = params.get("categories");

    // Set search state from URL
    if (searchParam) {
      setSearchTerm(searchParam);
      setSearchInput(searchParam); // Sync the search input field
    }

    // Set category state from URL
    if (categoriesParam) {
      setSelectedCategories(categoriesParam.split(","));
    }
  }, [location.search]); // Reruns when URL query changes

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
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // Compute filtered count per category
  const filteredCategoryCounts: Record<string, number> = {};
  const isAnyCategoryFilter =
    selectedCategories.length > 0 ||
    searchTerm ||
    selectedSkillLevels.length > 0 ||
    priceRange.min !== 0 ||
    priceRange.max !== 250;
  const sourceCourses = isAnyCategoryFilter
    ? filteredCourses
    : paginatedCourses;
  sourceCourses.forEach((course) => {
    if (course.category && course.category.name) {
      filteredCategoryCounts[course.category.name] =
        (filteredCategoryCounts[course.category.name] || 0) + 1;
    }
  });

  // Compute filtered count per skill level
  const filteredSkillLevelCounts: Record<string, number> = {};
  const sourceCoursesForSkill = isAnyCategoryFilter
    ? filteredCourses
    : paginatedCourses;
  sourceCoursesForSkill.forEach((course) => {
    if (course.level) {
      filteredSkillLevelCounts[course.level] =
        (filteredSkillLevelCounts[course.level] || 0) + 1;
    }
  });

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };

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
  const categoryList: { id: number; name: string; count: number }[] =
    allCategories.map((cat) => {
      const meta = metadata?.categories?.find((c: any) => c.name === cat.name);
      return {
        id: cat.id,
        name: cat.name,
        count: meta ? Number(meta.count) : 0,
      };
    });
  const skillLevels = ["Beginner", "Intermediate", "Advanced"];
  const skillLevelCounts: Record<string, number> = {};
  skillLevels.forEach((level) => {
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
      const headerOffset = 220;
      const y =
        contentBoxRef.current.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;
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
              <CourseSidebar
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleSearchSubmit={handleSearchSubmit}
                categoryList={categoryList}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                filteredCategoryCounts={filteredCategoryCounts}
                skillLevels={skillLevels}
                selectedSkillLevels={selectedSkillLevels}
                toggleSkillLevel={toggleSkillLevel}
                skillLevelCounts={skillLevelCounts}
                filteredSkillLevelCounts={filteredSkillLevelCounts}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                sliderInitialized={sliderInitialized}
                setSliderInitialized={setSliderInitialized}
                selectedPriceType={selectedPriceType}
                setSelectedPriceType={setSelectedPriceType}
              />
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
                        <CourseCard course={course} />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
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
