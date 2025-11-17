import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as userService from "../../services/userService";
import * as reportService from "../../services/reportService";
import Footer from "../Footer/Footer";
import { Link } from "react-router";
import "./UserReportsPage.css";

const UserReportsPage = () => {
  const { user } = useContext(UserContext);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await userService.getUserReports(user._id);
        setReports(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (user) fetchReports();
  }, [user]);

  const handleDelete = async (reportId) => {
    try {
      await reportService.deleteReport(reportId);
      setReports((prev) => prev.filter((r) => r._id !== reportId));
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "green";
      case "rejected":
        return "red";
      case "pending":
        return "goldenrod";
      default:
        return "gray";
    }
  };

  // If no reports, show a message with a button
  if (reports.length === 0) {
    return (
      <div className="no-reports-container">
        <p className="no-reports-text">You have no reports yet.</p>
        <Link to="/reports/create" className="start-report-btn">
          Start Reporting What's Around
        </Link>
      </div>
    );
  }

  return (
    <>
    <main className="main">
    <div className="reports-container">
      <h2>My Reports</h2>
      <p className="reports-description">
        Here you can view all the reports you've submitted, check their status, and manage them.
      </p>

      <div className="reports-grid">
        {reports.map((report) => (
          <div key={report._id} className="report-card">
            <div
              className="status-badge"
              style={{ backgroundColor: getStatusColor(report.status) }}
            >
              {report.status}
            </div>
            <h3>{report.title}</h3>
            <p className="report-description">{report.description}</p>
            <p><strong>Type:</strong> {report.type}</p>
            <p><strong>Area:</strong> {report.area}</p>
            <div className="report-actions">
              <Link to={`/reports/${report._id}/edit`} className="edit-report-btn">
                Edit
              </Link>
              <button
                className="delete-report-btn"
                onClick={() => handleDelete(report._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </main>
        <Footer />
    </>
  );
};

export default UserReportsPage;
