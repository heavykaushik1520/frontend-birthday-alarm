import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <h1 className="text-5xl font-bold text-gray-100 mb-4">404</h1>
      <p className="text-xl text-gray-200 mb-8">Page Not Found</p>
      <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Go to Login Page
      </Link>
    </div>
  );
};

export default NotFoundPage;