import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeForm = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        employeeName: '',
        email: '',
        birthDate: '',
        shortNote: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                throw new Error("Authentication token is missing.");
            }

            const response = await fetch('https://artiststation.co.in/birthday-alarm-api/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Employee data submitted successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setFormData({
                    companyName: '',
                    employeeName: '',
                    email: '',
                    birthDate: '',
                    shortNote: '',
                });
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to submit employee data.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred while submitting data.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <ToastContainer />
            <div className="max-w-2xl w-full bg-gray-800 bg-opacity-75 backdrop-filter backdrop-blur-md rounded-lg shadow-lg p-12">
                <h2 className="text-4xl font-extrabold text-white text-center mb-8">
                    DETAILS
                </h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Company Name */}
                    <div>
                        <label htmlFor="companyName" className="block text-lg font-medium text-gray-300">
                            COMPANY NAME
                        </label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="appearance-none block w-full px-5 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                            required
                        />
                    </div>

                    {/* Contact Person */}
                    <div>
                        <label htmlFor="employeeName" className="block text-lg font-medium text-gray-300">
                            CONTACT PERSON
                        </label>
                        <input
                            type="text"
                            id="employeeName"
                            name="employeeName"
                            value={formData.employeeName}
                            onChange={handleChange}
                            className="appearance-none block w-full px-5 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-300">
                            EMAIL
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="appearance-none block w-full px-5 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                            required
                        />
                    </div>

                    {/* Birth Date */}
                    <div>
                        <label htmlFor="birthDate" className="block text-lg font-medium text-gray-300">
                            BIRTH DATE
                        </label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            className="appearance-none block w-full px-5 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                            required
                        />
                    </div>

                    {/* Short Note */}
                    <div>
                        <label htmlFor="shortNote" className="block text-lg font-medium text-gray-300">
                            SHORT NOTE
                        </label>
                        <textarea
                            id="shortNote"
                            name="shortNote"
                            value={formData.shortNote}
                            onChange={handleChange}
                            rows="4"
                            className="appearance-none block w-full px-5 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className={`w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-blue-600 text-white font-bold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;
