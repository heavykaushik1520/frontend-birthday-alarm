/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout"; // Assuming you're using the Layout component

const UpcomingBirthdays = () => {
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUpcomingBirthdays = async () => {
      setLoading(true);
      setError("");
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Authentication token is missing.");
        }

        const response = await fetch(
          "https://birthday-alarm.onrender.com/api/employees/upcoming-birthdays",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch upcoming birthdays."
          );
        }

        const data = await response.json();
        setUpcomingBirthdays(data);
      } catch (err) {
        console.error("Error fetching upcoming birthdays:", err);
        setError(err.message);
        toast.error(err.message, { theme: "dark" });
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingBirthdays();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-white text-lg">
            Loading upcoming birthdays...
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto bg-gray-800 bg-opacity-75 backdrop-filter backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
        <div className="max-w-7xl w-full bg-gray-800 bg-opacity-75 backdrop-filter backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
          {" "}
          {/* Added w-full */}
          <h2 className="text-3xl font-semibold text-white text-center py-6">
            🥂 UPCOMING BIRTHDAYS 🥂
          </h2>
          <div className="overflow-x-auto p-6">
            {upcomingBirthdays.length > 0 ? (
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {upcomingBirthdays.map((employee, index) => (
                    <tr key={employee.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {employee.id}
                      </td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-white text-center py-4">
                No upcoming birthdays in the near future!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingBirthdays;