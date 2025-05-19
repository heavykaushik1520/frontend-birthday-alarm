/* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable no-unused-vars */

/* eslint-disable no-unused-vars */



import React, { useContext, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const Layout = ({ children }) => {
   const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

    const handleLogout = () => {
    logout();
    closeMobileMenu(); // Close the mobile menu after logout
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 bg-gray-700 text-white p-2 rounded-md shadow-md z-20 md:hidden"
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      {/* Left Sidebar */}
      <aside
        className={`bg-gray-800 w-64 py-6 px-3 fixed top-0 left-0 h-full shadow-md z-10 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center h-16 ">
          <span className="text-white text-xl font-semibold mt-10">
            🎂BIRTHDAY-ALARM
          </span>
        </div>
        <nav className="mt-6">
          <Link
            to="/dashboard"
            className={`block w-full py-3 px-4 text-white hover:bg-gray-700 rounded-md focus:outline-none focus:shadow-outline ${
              isActive("/dashboard") ? "bg-gray-700" : ""
            }`}
            onClick={closeMobileMenu} // Close menu on click
          >
            ♻️ DASHBOARD
          </Link>
          <Link
            to="/form"
            className={`block w-full py-3 px-4 text-white hover:bg-gray-700 rounded-md focus:outline-none focus:shadow-outline ${
              isActive("/form") ? "bg-gray-700" : ""
            }`}
            onClick={closeMobileMenu} // Close menu on click
          >
            📄 B'DAY DETAILS
          </Link>
          <Link
            to="/employees"
            className={`block w-full py-3 px-4 text-white hover:bg-gray-700 rounded-md focus:outline-none focus:shadow-outline ${
              isActive("/employees") ? "bg-gray-700" : ""
            }`}
            onClick={closeMobileMenu} // Close menu on click
          >
            🍰 BIRTHDAYS
          </Link>
        </nav>

        <div className="py-4 px-3 ">
          <button
            onClick={handleLogout}
            className="block w-full py-3 px-4  text-red-500 hover:bg-gray-700 rounded-md focus:outline-none focus:shadow-outline flex items-start "
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 mt-1" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow transition-all duration-300 ease-in-out md:ml-64">
        {children}
      </div>
    </div>
  );
};

export default Layout;