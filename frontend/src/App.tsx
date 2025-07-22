import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomCursor from "./components/CustomCursor";
import Layout from "./components/layout/Layout";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Course from "./pages/Course";
import CourseDetails from "./pages/Course-details";
import Home from "./pages/Home";
import Instructor from "./pages/Instructors";
import InstructorDetails from "./pages/Instructor-details";
import LessonPage from "./pages/lesson";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyCourse from "./pages/MyCourse";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Testimonial from "./pages/Testimonial";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
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
    </BrowserRouter>
  );
};

export default App;
