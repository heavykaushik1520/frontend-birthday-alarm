/* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link } from 'react-router-dom';
// import Layout from './Layout';

// const DashboardContent = ({ upcomingBirthdaysCount }) => {
//   return (
//     <div className="mt-20 md:mt-100 md:ml-0 bg-gray-700 hover:bg-gray-600 text-white rounded-md p-6 cursor-pointer h-24 max-w-md mx-auto md:mx-0">
//       <Link to="/upcoming-birthdays" className="block w-full h-full text-center flex items-center justify-center">
//         <span className="text-xl font-semibold">
//           🍷 UPCOMING BIRTHDAYS : {upcomingBirthdaysCount} 🍷
//         </span>
//       </Link>
//     </div>
//   );
// };

// const DashboardPage = () => {
//   const [upcomingBirthdaysCount, setUpcomingBirthdaysCount] = useState(0);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUpcomingBirthdaysCount = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const authToken = localStorage.getItem("authToken");
//         if (!authToken) {
//           throw new Error("Authentication token is missing.");
//         }

//         const response = await fetch(
//           "https://birthday-alarm.onrender.com/api/employees/upcoming-birthdays",
//           {
//             headers: {
//               Authorization: `Bearer ${authToken}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(
//             errorData.message || "Failed to fetch upcoming birthdays count."
//           );
//         }

//         const data = await response.json();
//         setUpcomingBirthdaysCount(data.length);
//       } catch (err) {
//         console.error("Error fetching upcoming birthdays count:", err);
//         setError(err.message);
//         toast.error(err.message, { theme: "dark" });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUpcomingBirthdaysCount();
//   }, []);

//   return (
//     <Layout>
//       {loading ? (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
//           <div className="text-white text-lg">
//             Loading upcoming birthdays count...
//           </div>
//         </div>
//       ) : error ? (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
//           <div className="text-red-500 text-lg">{error}</div>
//         </div>
//       ) : (
//         <DashboardContent upcomingBirthdaysCount={upcomingBirthdaysCount} />
//       )}
//     </Layout>
//   );
// };

// export default DashboardPage;

import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Layout from "./Layout";

const DashboardContent = ({
  upcomingBirthdaysCount: initialUpcomingBirthdaysCount,
}) => {
  const [birthdaysByMonth, setBirthdaysByMonth] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [upcomingBirthdaysCount, setUpcomingBirthdaysCount] = useState(
    initialUpcomingBirthdaysCount
  );

  const fetchBirthdaysByMonth = useCallback(async (month) => {
    setLoading(true);
    setError("");
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("Authentication token is missing.");
      }

      const response = await fetch(
        `https://artiststation.co.in/birthday-alarm-api/api/employees?month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Failed to fetch birthdays for ${month}.`
        );
      }

      const data = await response.json();
      setBirthdaysByMonth((prev) => ({ ...prev, [month]: data.length }));
    } catch (err) {
      console.error(`Error fetching birthdays for ${month}:`, err);
      setError(err.message);
      toast.error(err.message, { theme: "dark" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    fetchBirthdaysByMonth(currentMonth);
  }, [fetchBirthdaysByMonth]);

  const handleMonthSelect = (monthNumber, monthName) => {
    setSelectedMonth(monthName);
    setShowDropdown(false);
    if (!birthdaysByMonth[monthNumber]) {
      fetchBirthdaysByMonth(monthNumber);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const getBirthdayCountForMonth = () => {
    const monthIndex =
      new Date(Date.parse(selectedMonth + " 1, 2000")).getMonth() + 1;
    return birthdaysByMonth[monthIndex] !== undefined
      ? birthdaysByMonth[monthIndex]
      : loading
      ? "..."
      : error
      ? "Error"
      : 0;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="mt-8 md:mt-16 md:ml-0 flex flex-wrap gap-4 max-w-3xl mx-auto md:mx-0">
      {/* First Div (Original Upcoming Birthdays Count) */}
      <div className="bg-gray-700 hover:bg-gray-600 text-white rounded-md p-10 cursor-pointer w-full sm:w-auto sm:min-w-[300px]">
        <Link
          to="/upcoming-birthdays"
          className="block w-full h-full text-center flex items-center justify-center"
        >
          <span className="text-xl font-semibold">
            🍷 UPCOMING BIRTHDAYS 🍷
            <br></br>
            <h1 className="text-4xl font-bold leading-tight h-12 flex items-center justify-center">
              {upcomingBirthdaysCount}
            </h1>
          </span>
        </Link>
      </div>

      {/* Second Div (Month Filter Dropdown) */}
      <div className="bg-gray-700 hover:bg-gray-600 text-white rounded-md p-10 cursor-pointer relative w-full sm:w-auto  sm:min-w-[300px]">
        <div
          className="flex flex-col items-center justify-center" // Changed to flex-col and items-center
          onClick={toggleDropdown}
        >
          <span className="text-xl font-semibold text-center mt-6">
            🎂 BIRTHDAYS IN <span className="uppercase">{selectedMonth}</span> 🎂
            <h1 className="text-4xl font-bold leading-tight h-12 flex items-center justify-center">
              {getBirthdayCountForMonth()}
            </h1>
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${
              showDropdown ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {showDropdown && (
          <div className="absolute top-full left-0 mt-2 w-full bg-gray-800 rounded-md shadow-lg z-10">
            {monthNames.map((month, index) => (
              <button
                key={month}
                className="block w-full px-4 py-2 text-white text-center hover:bg-gray-700 focus:outline-none"
                onClick={() => handleMonthSelect(index + 1, month)}
              >
                {month}
              </button>
            ))}
          </div>
        )}
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [upcomingBirthdaysCount, setUpcomingBirthdaysCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUpcomingBirthdaysCount = async () => {
      setLoading(true);
      setError("");
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Authentication token is missing.");
        }

        const response = await fetch(
          "https://artiststation.co.in/birthday-alarm-api/api/employees/upcoming-birthdays",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch upcoming birthdays count."
          );
        }

        const data = await response.json();
        setUpcomingBirthdaysCount(data.length);
      } catch (err) {
        console.error("Error fetching upcoming birthdays count:", err);
        setError(err.message);
        toast.error(err.message, { theme: "dark" });
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingBirthdaysCount();
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-white text-lg">Loading dashboard data...</div>
        </div>
      ) : error ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      ) : (
        <DashboardContent upcomingBirthdaysCount={upcomingBirthdaysCount} />
      )}
    </Layout>
  );
};

export default DashboardPage;
