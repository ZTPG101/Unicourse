import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Course from "./pages/Course";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import CourseDetails from "./pages/Course-details";
import LessonPage from "./pages/lesson";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Instructor from "./pages/Instructor";
import InstructorDetails from "./pages/Instructor-details";

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
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/instructor-details" element={<InstructorDetails />} />
          {/* Define other routes for your application here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
