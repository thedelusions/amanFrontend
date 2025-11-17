import { Routes, Route } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import ReportsList from "./components/ReportsList/ReportsList";
import UserReports from "./components/UserReportsPage/UserReportsPage";
import ReportShow from "./components/ReportShow/ReportShow";

import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

import UserProfilePage from "./components/UserProfilePage/UserProfilePage";
import AdminDashboardPage from "./components/AdminDashboardPage/AdminDashboardPage";

import CreateReport from "./components/CreateReport/CreateReport";
import EditReport from "./components/EditReport/EditReport";

import UserReportsPage from "./components/UserReportsPage/UserReportsPage";
const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />

      <Routes>
        {user ? (
          <>

            <Route path="/" element={<Home />} />
            <Route path="/community" element={<ReportsList />} />
            <Route path="/reports/:id" element={<ReportShow />} />
            <Route path="/my-reports" element={<UserReportsPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/reports/create" element={<CreateReport />} />
            <Route path="/reports/:id/edit" element={<EditReport />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            
          </>
        )}
        <Route path="/reports" element={<ReportsList />} />
        <Route path="/reports/:id" element={<ReportShow />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />

        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    </>
  );
};

export default App;
