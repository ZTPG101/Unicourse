import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomCursor from "./components/CustomCursor";
import Layout from "./components/Layout";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Course from "./pages/Course";
import CourseDetails from "./pages/Course-details";
import Home from "./pages/Home";
import Instructor from "./pages/Instructor";
import InstructorDetails from "./pages/Instructor-details";
import LessonPage from "./pages/lesson";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyCourse from "./pages/MyCourse";

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
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/instructor-details" element={<InstructorDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* Define other routes for your application here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
