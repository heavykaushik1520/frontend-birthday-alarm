

/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const months = [
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

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchName, setSearchName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filterType, setFilterType] = useState("none");
  const [noDataMessage, setNoDataMessage] = useState("");

  const limit = 10;

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError("");
    setNoDataMessage("");
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("Authentication token is missing.");

      let baseUrl = "";

      if (searchName) {
        baseUrl = `http://localhost:3000/api/employees?name=${searchName}`;
      } else if (selectedMonth) {
        const monthIndex = months.indexOf(selectedMonth);
        baseUrl = `http://localhost:3000/api/employees?month=${monthIndex + 1}`;
      } else {
        baseUrl = `http://localhost:3000/api/employees/paginated?page=${currentPage}&limit=${limit}`;
      }

      const response = await fetch(baseUrl, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch employees.");
      }

      const data = await response.json();

      if (searchName || selectedMonth) {
        setEmployees(data);
        setTotalPages(1);
        setCurrentPage(1);
        if (data.length === 0) {
          setNoDataMessage(
            searchName
              ? `😔 No employees found with the name "${searchName}".`
              : `OOPS...No birthdays found for the selected month. 🤯`
          );
        }
      } else {
        setEmployees(data.employees);
        setTotalPages(data.totalPages);
        if (data.employees.length === 0) {
          setNoDataMessage("😔 No employees found.");
        }
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError(err.message);
      toast.error(err.message, { theme: "dark" });
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, searchName, selectedMonth]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchEmployees();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fetchEmployees]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) throw new Error("Authentication token is missing.");

        const response = await fetch(
          `http://localhost:3000/api/employees/${id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        if (response.ok) {
          toast.success("Employee deleted successfully!", { theme: "dark" });
          fetchEmployees();
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete employee.");
        }
      } catch (err) {
        console.error("Error deleting employee:", err);
        toast.error(err.message, { theme: "dark" });
      }
    }
  };

  const renderPaginationButtons = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <div className="flex justify-center mt-6 space-x-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-3 py-2 rounded-md text-white ${
              currentPage === number
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-700 hover:bg-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="text-white text-lg">Loading employees...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto bg-gray-800 bg-opacity-80 backdrop-blur rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between px-6 py-6 gap-4 flex-wrap">
          {/* Month Dropdown */}
          <select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setCurrentPage(1);
              setSearchName(""); // Reset search when month changes
            }}
            className="w-full lg:w-auto px-4 py-2 rounded-md bg-gray-800 text-white bg-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="">SELECT MONTH</option>
            {months.map((month, idx) => (
              <option key={idx} value={month}>
                {month}
              </option>
            ))}
          </select>

          {/* Heading */}
          <h2 className="text-3xl font-semibold text-white text-center flex-1">
            BIRTHDAYS
          </h2>

          {/* Search Input */}
          <input
            type="text"
            placeholder="🔍 Search by name..."
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
              setCurrentPage(1);
              setSelectedMonth(""); // Reset month when search changes
            }}
            className="w-full lg:w-72 px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Employee Table */}
        <div className="overflow-x-auto p-6">
          <table className="min-w-full divide-y divide-gray-700 text-white">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                  SR. NO
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                  Company Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                  Employee Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                  Birth Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                  Short Note
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {employees.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4 text-red-400 font-bold"
                  >
                    {noDataMessage}
                  </td>
                </tr>
              ) : (
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {employee.id}
                    </td>
                    <td className="px-6 py-4">{employee.companyName}</td>
                    <td className="px-6 py-4">{employee.employeeName}</td>
                    <td className="px-6 py-4">{employee.email}</td>
                    <td className="px-6 py-4">{employee.birthDate}</td>
                    <td className="px-6 py-4">{employee.shortNote}</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <Link
                        to={`/employees/update/${employee.id}`}
                        className="text-indigo-400 hover:text-indigo-600 mr-2"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && !(searchName || selectedMonth) && renderPaginationButtons()}
      </div>
    </div>
  );
};

export default EmployeeList;