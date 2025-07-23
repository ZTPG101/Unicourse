import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ContactInfo from './ContactInfo';
import ScrollToTopButton from './ScrollToTopButton';

const Layout = () => {
  return (
    <div className="page-wrapper">
      <Header />

      <main>
        <Outlet />
      </main>

      <ContactInfo />
      <Footer />
      
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;