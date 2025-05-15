/* eslint-disable no-unused-vars */

/*
import React, { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchName, setSearchName] = useState("");
  const limit = 10;

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("Authentication token is missing.");
      }

      const response = await fetch(
        `http://localhost:3000/api/employees/paginated?page=${currentPage}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch employees.");
      }

      const data = await response.json();
      setEmployees(data.employees);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError(err.message);
      toast.error(err.message, { theme: "dark" });
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Authentication token is missing.");
        }

        const response = await fetch(
          `http://localhost:3000/api/employees/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.ok) {
          toast.success("Employee deleted successfully!", { theme: "dark" });
          // Re-fetch employees to update the list
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
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-white text-lg">Loading employees...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto bg-gray-800 bg-opacity-75 backdrop-filter backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-3xl font-semibold text-white text-center py-6">
          🍷BIRTHDAYS🍷
        </h2>
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
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.companyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.employeeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.birthDate}
                  </td>
                  <td className="px-6 py-4">{employee.shortNote}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Link
                      to={`/employees/update/${employee.id}`}
                      className="text-indigo-500 hover:text-indigo-700 focus:outline-none focus:shadow-outline mr-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <button
                      onClick={() => handleDeleteEmployee(employee.id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none focus:shadow-outline"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && renderPaginationButtons()}
      </div>
    </div>
  );
};

export default EmployeeList;
*/

/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchName, setSearchName] = useState("");
  const limit = 10;

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("Authentication token is missing.");
      }

      const baseUrl = searchName
        ? `https://artiststation.co.in/birthday-alarm-api/api/employees?name=${searchName}`
        : `https://artiststation.co.in/birthday-alarm-api/api/employees/paginated?page=${currentPage}&limit=${limit}`;

      const response = await fetch(baseUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch employees.");
      }

      const data = await response.json();
      if (searchName) {
        setEmployees(data); // search result is a flat array
        setTotalPages(1);
        setCurrentPage(1);
      } else {
        setEmployees(data.employees);
        setTotalPages(data.totalPages);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError(err.message);
      toast.error(err.message, { theme: "dark" });
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, searchName]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchEmployees();
    }, 500); // debounce for better UX

    return () => clearTimeout(delayDebounce);
  }, [fetchEmployees]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Authentication token is missing.");
        }

        const response = await fetch(
          `https://artiststation.co.in/birthday-alarm-api/api/employees/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
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
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-white text-lg">Loading employees...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto bg-gray-800 bg-opacity-75 backdrop-filter backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-6 gap-4">
          <div className="flex-1 text-center">
            <h2 className="text-3xl font-semibold text-white">🍷BIRTHDAYS🍷</h2>
          </div>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
              setCurrentPage(1); // reset page on search
            }}
            className="w-48 md:w-72 px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.companyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.employeeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.birthDate}
                  </td>
                  <td className="px-6 py-4">{employee.shortNote}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Link
                      to={`/employees/update/${employee.id}`}
                      className="text-indigo-500 hover:text-indigo-700 focus:outline-none focus:shadow-outline mr-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <button
                      onClick={() => handleDeleteEmployee(employee.id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none focus:shadow-outline"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && renderPaginationButtons()}
      </div>
    </div>
  );
};

export default EmployeeList;
