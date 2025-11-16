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

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />

      <Routes>
        {user ? (
          <>

            <Route path="/" element={<Home />} />
            <Route path="/reports" element={<ReportsList />} />
            <Route path="/reports/:id" element={<ReportShow />} />
            <Route path="/user-reports" element={<UserReports />} />
            <Route path="/profile" element={<UserProfilePage />} />
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
