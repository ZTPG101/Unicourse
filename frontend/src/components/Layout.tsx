import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ContactInfo from './Contactinfo';

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
      <a href="#" data-target="html" className="scroll-to-target scroll-to-top">
        <span className="scroll-to-top__wrapper"><span className="scroll-to-top__inner"></span></span>
        <span className="scroll-to-top__text"> Go Back Top</span>
      </a>
    </div>
  );
};

export default Layout;