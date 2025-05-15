// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

// const Layout = ({ children }) => {
// //   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// //   const handleLogout = async () => {
// //     try {
// //       const response = await fetch("http://localhost:3000/api/admin/logout", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //       });

// //       if (response.ok) {
// //         localStorage.removeItem("token");
// //         console.log("Logout successful");
// //         navigate("/");
// //       } else {
// //         const errorData = await response.json();
// //         console.error("Logout failed:", errorData.error);
// //       }
// //     } catch (error) {
// //       console.error("Logout error:", error.message);
// //     }
// //   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex">
//       {/* Mobile Menu Button */}
//       <button
//         onClick={toggleMobileMenu}
//         className="fixed top-4 left-4 bg-gray-700 text-white p-2 rounded-md shadow-md z-20 md:hidden"
//       >
//         <FontAwesomeIcon icon={faBars} size="lg" />
//       </button>

//       {/* Left Sidebar */}
//       <aside
//         className={`bg-gray-800 w-64 py-6 px-3 fixed top-0 left-0 h-full shadow-md z-10 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
//           isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* Mobile Close Button */}
//         <button
//           onClick={toggleMobileMenu}
//           className="absolute top-4 right-4 bg-gray-700 text-white p-2 rounded-md shadow-md z-20 md:hidden"
//         >
//           <FontAwesomeIcon icon={faTimes} size="lg" />
//         </button>

//         <div className="flex items-center justify-center h-16">
//           <span className="text-white text-xl font-semibold">Email Sender</span>
//         </div>
//         <nav className="mt-6">
//           <Link
//             to="/dashboard"
//             className="block w-full py-3 px-4 text-white hover:bg-gray-700 rounded-md focus:outline-none focus:shadow-outline flex items-center justify-center"
//           >
//             DASHBOARD
//           </Link>
//           <Link
//             to="/form"
//             className="block w-full py-3 px-4 text-white hover:bg-gray-700 rounded-md focus:outline-none focus:shadow-outline flex items-center justify-center"
//           >
//             FORM
//           </Link>
//           <Link
//             to="/employees"
//             className="block w-full py-3 px-4 text-white hover:bg-gray-700 rounded-md focus:outline-none focus:shadow-outline flex items-center justify-center"
//           >
//             EMPLOYEES
//           </Link>
//           <Link
//             to="/upcoming-birthdays"
//             className="block w-full py-3 px-4 text-white hover:bg-gray-700 rounded-md focus:outline-none focus:shadow-outline flex items-center justify-center mt-2"
//           >
//             UPCOMING BIRTHDAYS
//           </Link>

//           {/* Add more navigation links here */}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-grow transition-all duration-300 ease-in-out md:ml-64">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Layout;

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
        <div className="flex items-center justify-center h-16">
          <span className="text-white text-xl font-semibold">🎂BIRTHDAY-ALARM</span>
        </div>
        <nav className="mt-6">
          <Link
            to="/dashboard"
            className="block w-full py-3 px-4 text-white hover:bg-gray-700 rounded-md focus:outline-none focus:shadow-outline flex items-center justify-center"
            onClick={closeMobileMenu} // Close menu on click
          >
            ♻️ DASHBOARD 
          </Link>
          <Link
            to="/form"
            className="block w-full py-3 px-4 text-white hover:bg-gray-700 rounded-md focus:outline-none focus:shadow-outline flex items-center justify-center"
            onClick={closeMobileMenu} // Close menu on click
          >
            📄 B'DAY DETAILS
          </Link>
          <Link
            to="/employees"
            className="block w-full py-3 px-4 text-white hover:bg-gray-700 rounded-md focus:outline-none focus:shadow-outline flex items-center justify-center"
            onClick={closeMobileMenu} // Close menu on click
          >
            🍰 BIRTHDAYS
          </Link>
          {/* <Link
            to="/upcoming-birthdays"
            className="block w-full py-3 px-4 text-white hover:bg-gray-700 rounded-md focus:outline-none focus:shadow-outline flex items-center justify-center mt-2"
            onClick={closeMobileMenu} // Close menu on click
          >
            UPCOMING BIRTHDAYS
          </Link> */}

          {/* Add more navigation links here */}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-grow transition-all duration-300 ease-in-out md:ml-64">
        {children}
      </div>
    </div>
  );
};

export default Layout;