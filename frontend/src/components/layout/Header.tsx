import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { useAuth } from "../../context/AuthContext";
import { InstructorService } from "../../services/instructor.service";

const Header = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const [firstInstructorId, setFirstInstructorId] = useState<number | null>(
    null
  );

  useEffect(() => {
    InstructorService.getAllInstructors()
      .then((instructors) => {
        if (instructors && instructors.length > 0) {
          setFirstInstructorId(instructors[0].id);
        }
      })
      .catch(() => setFirstInstructorId(null));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const stickyHeader = document.querySelector(".stricky-header");
      if (stickyHeader) {
        if (window.scrollY > 100) {
          stickyHeader.classList.add("stricky-fixed");
        } else {
          stickyHeader.classList.remove("stricky-fixed");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="main-header main-header-three">
        <div className="main-menu__top">
          <div className="container">
            <div className="main-menu__top-inner">
              <ul className="list-unstyled main-menu__contact-list">
                <li>
                  <div className="icon">
                    <i className="icon-email"></i>
                  </div>
                  <div className="text">
                    <p>
                      <a href="mailto:pobborisut@gmail.com">
                        pobborisut@gmail.com
                      </a>
                    </p>
                  </div>
                </li>
                <li>
                  <div className="icon">
                    <i className="icon-contact"></i>
                  </div>
                  <div className="text">
                    <p>
                      <a href="tel:1212345678900">+12 (123) 456 78900</a>
                    </p>
                  </div>
                </li>
              </ul>
              <ul className="list-unstyled main-menu__contact-list main-menu__location">
                <li>
                  <div className="icon">
                    <i className="icon-location"></i>
                  </div>
                  {/* <div className="text">
                    <p>684 West College St. Sun City, USA</p>
                  </div> */}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <nav className="main-menu">
          <div className="main-menu__wrapper">
            <div className="container">
              <div className="main-menu__wrapper-inner">
                <div className="main-menu__left">
                  <div className="main-menu__logo">
                    <Link to="/">
                      <img
                        src="/assets/images/unicourselogo.jpeg"
                        alt="Unicourse Logo"
                        style={{ width: "100px", height: "auto" }}
                      />
                    </Link>
                  </div>
                </div>
                <div className="main-menu__main-menu-box">
                  <a href="#" className="mobile-nav__toggler">
                    <i className="fa fa-bars"></i>
                  </a>
                  <ul className="main-menu__list">
                    {/* Main navigation links */}
                    <li>
                      <Link to="/">Home</Link>
                      {/* ... Home dropdown content ... */}
                    </li>
                    <li>
                      <Link to="/about">About</Link>
                    </li>
                    <li className="dropdown">
                      <Link to="/">Pages</Link>
                      <ul className="shadow-box">
                        <li>
                          <Link to="/instructors">Instructors</Link>
                        </li>
                        <li>
                          <Link
                            to={
                              firstInstructorId
                                ? `/instructors/${firstInstructorId}`
                                : "#"
                            }
                          >
                            Instructor details
                          </Link>
                        </li>
                        <li>
                          <Link to="/testimonial">Testimonials</Link>
                        </li>
                        <li>
                          <Link to="/cart">Cart</Link>
                        </li>
                        {/* ... other page links ... */}
                      </ul>
                    </li>
                    <li>
                      <Link to="/course">Courses</Link>
                    </li>
                    <li>
                      <Link to="/my-course">My courses</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
                <div className="main-menu__right">
                  <div className="main-menu__search-cart-box">
                    <div className="main-menu__cart">
                      <a href="/cart">
                        <span className="fas fa-shopping-cart"></span>
                      </a>
                    </div>
                  </div>
                  <div className="main-menu__btn-boxes">
                    {isLoggedIn && user ? (
                      <div
                        className="main-menu__user-info"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        {user.avatar && (
                          <img
                            src={user.avatar}
                            alt="avatar"
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                            }}
                          />
                        )}
                        <span>{user.name}</span>
                        <button
                          onClick={logout}
                          className="thm-btn"
                          style={{ marginLeft: 8 }}
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="main-menu__btn-box-1">
                          <Link to="/login" className="thm-btn">
                            Login
                          </Link>
                        </div>
                        <div className="main-menu__btn-box-2">
                          <Link to="/Register" className="thm-btn">
                            Register
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* This is the "sticky" header that appears on scroll */}
      <div className="stricky-header stricked-menu main-menu">
        <div className="sticky-header__content">
          <div className="container">
            <div className="main-menu__wrapper-inner">
              <div className="main-menu__left">
                <div className="main-menu__logo">
                  <Link to="/">
                    <img
                      src="/assets/images/unicourselogo.jpeg"
                      alt="Unicourse Logo"
                      style={{ width: "100px", height: "auto" }} // Adjust width as needed
                    />
                  </Link>
                </div>
              </div>
              <div className="main-menu__main-menu-box">
                <a href="#" className="mobile-nav__toggler">
                  <i className="fa fa-bars"></i>
                </a>
                <ul className="main-menu__list">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li className="dropdown">
                    <Link to="/">Pages</Link>
                    <ul className="shadow-box">
                      <li>
                        <Link to="/instructors">Instructors</Link>
                      </li>
                      <li>
                        <Link
                          to={
                            firstInstructorId
                              ? `/instructors/${firstInstructorId}`
                              : "#"
                          }
                        >
                          Instructor details
                        </Link>
                      </li>
                      <li>
                        <Link to="/testimonial">Testimonials</Link>
                      </li>
                      <li>
                        <Link to="/cart">Cart</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/course">Courses</Link>
                  </li>
                  <li>
                    <Link to="/my-course">My Courses</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
              <div className="main-menu__right">
                <div className="main-menu__search-cart-box">
                  <div className="main-menu__cart">
                    <a href="/cart">
                      <span className="fas fa-shopping-cart"></span>
                    </a>
                  </div>
                </div>
                <div className="main-menu__btn-boxes">
                  {isLoggedIn && user ? (
                    <div
                      className="main-menu__user-info"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {user.avatar && (
                        <img
                          src={user.avatar}
                          alt="avatar"
                          style={{ width: 32, height: 32, borderRadius: "50%" }}
                        />
                      )}
                      <span>{user.name}</span>
                      <button
                        onClick={logout}
                        className="thm-btn"
                        style={{ marginLeft: 8 }}
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="main-menu__btn-box-1">
                        <Link to="/login" className="thm-btn">
                          Login
                        </Link>
                      </div>
                      <div className="main-menu__btn-box-2">
                        <Link to="/Register" className="thm-btn">
                          Register
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
