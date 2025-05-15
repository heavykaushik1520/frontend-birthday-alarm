import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DashBoard from "./components/DashBoard";
import Footer from "./components/Footer";
import EmployeeForm from "./components/Form";
import EmployeeList from "./components/EmployeeList";
import UpdateEmployeeForm from "./components/UpdateEmployeeForm";
import Layout from './components/Layout';
import UpcomingBirthdays from "./components/UpComingBirthdays";
import DashboardPage from "./components/DashboardPage";

function App() {
  return (
    <>
      <BrowserRouter basename="/birthday_alarm">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/form" element={<EmployeeForm/>}/>
        <Route path="/employees" element={<EmployeeList/>}/>
        <Route path="/employees/update/:id" element={<UpdateEmployeeForm />} /> */}
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* Example for a potential dashboard content page */}
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
          <Route
            path="/upcoming-birthdays"
            element={
              <Layout>
                <UpcomingBirthdays />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
