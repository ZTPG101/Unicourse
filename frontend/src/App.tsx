import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import CustomCursor from "./components/CustomCursor";
import Layout from "./components/layout/Layout";
import { useAuth } from "./context/AuthContext";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Course from "./pages/Course";
import CourseDetails from "./pages/Course-details";
import Home from "./pages/Home";
import InstructorDetails from "./pages/Instructor-details";
import Instructor from "./pages/Instructors";
import LessonPage from "./pages/lesson";
import Login from "./pages/Login";
import MyCourse from "./pages/MyCourse";
import Register from "./pages/Register";
import Testimonial from "./pages/Testimonial";

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');

    if (token && refreshToken) {
      // Store the tokens
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      login();

      
      navigate('/', { replace: true });
    }
  }, [location, navigate, login]);

  return (
    <>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/course" element={<Course />} />
          <Route path="/course-details/:courseId" element={<CourseDetails />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-course" element={<MyCourse />} />
          <Route path="/instructors" element={<Instructor />} />
          <Route path="/instructors/:id" element={<InstructorDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonial" element={<Testimonial />} />
          {/* Define other routes for your application here */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
