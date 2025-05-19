import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DashBoard from "./components/DashBoard";
import Footer from "./components/Footer";
import EmployeeForm from "./components/Form";
import EmployeeList from "./components/EmployeeList";
import UpdateEmployeeForm from "./components/UpdateEmployeeForm";
import Layout from "./components/Layout";
import UpcomingBirthdays from "./components/UpComingBirthdays";
import DashboardPage from "./components/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <BrowserRouter basename="/birthday_alarm/">
      <AuthProvider>
        {" "}
        {/* Wrap the routes with AuthProvider */}
        <Routes>
          <Route path="/" element={<LoginPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route
              path="/form"
              element={
                <Layout>
                  <EmployeeForm />
                </Layout>
              }
            />
            <Route
              path="/employees"
              element={
                <Layout>
                  <EmployeeList />
                </Layout>
              }
            />
            <Route
              path="/employees/update/:id"
              element={
                <Layout>
                  <UpdateEmployeeForm />
                </Layout>
              }
            />
          </Route>
           <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
