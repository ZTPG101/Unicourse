import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          {/* Define other routes for your application here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;