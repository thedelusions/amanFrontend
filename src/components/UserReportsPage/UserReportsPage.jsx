import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as userService from "../../services/userService";
import * as reportService from "../../services/reportService";
import { Link } from "react-router-dom";
import "./UserReportsPage.css";

const UserReportsPage = () => {
  const { user } = useContext(UserContext);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await userService.getUserReports(user._id);
        setReports(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
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

  if (loading) return <p className="loading">Loading your reports...</p>;
  if (reports.length === 0) return <p className="no-reports">You have no reports yet.</p>;

  return (
    <div className="reports-container">
      <h2>My Reports</h2>

      <div className="reports-grid">
        {reports.map((report) => (
          <div key={report._id} className="report-card">

            <div className="status-badge" style={{ backgroundColor: getStatusColor(report.status) }}>
              {report.status}
            </div>

            <h3>{report.title}</h3>
            <p className="report-description">{report.description}</p>
            <p><strong>Type:</strong> {report.type}</p>
            <p><strong>Area:</strong> {report.area}</p>

            <div className="report-actions">
              <Link to={`/reports/${report._id}/edit`} className="edit-report-btn">Edit</Link>
              <button className="delete-report-btn" onClick={() => handleDelete(report._id)}>
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReportsPage;
