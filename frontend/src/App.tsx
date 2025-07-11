import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Course from './pages/Course';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import CourseDetails from './pages/course-details';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="/course" element={<Course />} />
          <Route path="/course-details" element={<CourseDetails/>} />
          <Route index element={<Home />} />
          {/* Define other routes for your application here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;