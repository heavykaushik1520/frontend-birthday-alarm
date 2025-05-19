/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Clear local token or session data
        localStorage.removeItem("token");
        console.log("Logout successful");
        navigate("/"); // Redirect to login or home
      } else {
        const errorData = await response.json();
        console.error("Logout failed:", errorData.error);
      }
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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

      {/* Left Sidebar (Hidden on small screens by default) */}
      <aside
        className={`bg-gray-800 w-64 py-6 px-3 fixed top-0 left-0 h-full shadow-md z-10 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={toggleMobileMenu}
          className="absolute top-4 right-4 bg-gray-700 text-white p-2 rounded-md shadow-md z-20 md:hidden"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>

        <div className="flex items-center justify-center h-16">
          <span className="text-white text-xl font-semibold">Email Sender</span>
        </div>
        <nav className="mt-6">
          {/* Add more navigation links here */}
          <Link
            to="/form"
            className="block w-full py-3 px-4 text-white hover:bg-gray-700 rounded-md focus:outline-none focus:shadow-outline flex items-center justify-center"
          >
            FORM
          </Link>
          <Link
            to="/employees"
            className="block w-full py-3 px-4 text-white hover:bg-gray-700 rounded-md focus:outline-none focus:shadow-outline flex items-center justify-center"
          >
            EMPLOYEES
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default Dashboard;
