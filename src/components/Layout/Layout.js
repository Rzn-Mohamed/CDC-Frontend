import React from 'react';
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile' || location.pathname.startsWith('/profile/');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header hideSearch={isProfilePage} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;