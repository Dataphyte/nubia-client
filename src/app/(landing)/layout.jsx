import React from 'react';
import Navbar from '@/components/nav/navbar';
import Footer from '@/components/footer/footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
