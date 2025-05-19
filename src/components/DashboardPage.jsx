/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useCallback, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { AuthContext } from "../context/AuthContext";


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
  const { authToken } = useContext(AuthContext); // Get authToken from context

  const fetchBirthdaysByMonth = useCallback(
    async (month) => {
      setLoading(true);
      setError("");
      try {
        if (!authToken) {
          throw new Error("Authentication token is missing.");
        }

        const response = await fetch(
          `http://localhost:3000/api/employees?month=${month}`,
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
    },
    [authToken]
  ); // Add authToken to the dependency array

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
    <>
      <h1 className="text-3xl md:text-4xl font-semibold text-white text-left mt-6 mb-4 md:ml-20 ml-20">
        DASHBOARD
      </h1>
      <div className="mt-8 md:mt-16 md:ml-0 flex flex-wrap gap-4 max-w-3xl mx-auto md:mx-0">
        {/* Second Div (Month Filter Dropdown) */}
        <div className="bg-gray-700 hover:bg-gray-600 text-white rounded-md p-10 cursor-pointer relative w-full sm:w-auto  sm:min-w-[300px] md:ml-20">
          <div
            className="flex flex-col items-center justify-center" // Changed to flex-col and items-center
            onClick={toggleDropdown}
          >
            <span className="text-xl font-semibold text-center mt-6">
              🎂 BIRTHDAYS IN <span className="uppercase">{selectedMonth}</span>{" "}
              🎂
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
              ></path>
            </svg>
          </div>

          {showDropdown && (
            <div className="absolute top-full left-0 mt-2 w-full rounded-md shadow-lg bg-gray-800 z-10">
              {monthNames.map((month, index) => (
                <button
                  key={month}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                  onClick={() => handleMonthSelect(index + 1, month)}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const DashboardPage = () => {
  const [upcomingBirthdaysCount, setUpcomingBirthdaysCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { authToken } = useContext(AuthContext); // Get authToken from context

  useEffect(() => {
    const fetchUpcomingBirthdaysCount = async () => {
      setLoading(true);
      setError("");
      try {
        if (!authToken) {
          throw new Error("Authentication token is missing.");
        }
        const response = await fetch(
          "http://localhost:3000/api/employees/upcoming-birthdays",
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
        setUpcomingBirthdaysCount(data.count);
      } catch (err) {
        console.error("Error fetching upcoming birthdays count:", err);
        setError(err.message);
        toast.error(err.message, { theme: "dark" });
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingBirthdaysCount();
  }, [authToken]); // Add authToken to the dependency array

  return (
    <Layout>
      {loading ? (
        <div className="text-white text-lg">Loading dashboard data...</div>
      ) : error ? (
        <div className="text-red-500 text-lg">{error}</div>
      ) : (
        <DashboardContent upcomingBirthdaysCount={upcomingBirthdaysCount} />
      )}
      <ToastContainer />
    </Layout>
  );
};

export default DashboardPage;
