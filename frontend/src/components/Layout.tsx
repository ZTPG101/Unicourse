import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ContactInfo from './ContactInfo';
import ScrollToTopButton from './ScrollToTopButton';

const Layout = () => {
  return (
    <div className="page-wrapper">
      {/* This is where your converted header goes */}
      <Header />

      {/* The Outlet component renders the current route's element (e.g., Register, Login) */}
      <main>
        <Outlet />
      </main>

      {/* This is where your converted footer goes */}
      <ContactInfo />
      <Footer />
      
      {/* Scroll-to-top button here */}
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;