import { useEffect, useState } from "react";
import * as reportService from "../../services/reportService";

const AdminDashboardPage = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("all");


  useEffect(() => {
    const loadReports = async () => {
      const data = await reportService.index();
      setReports(data);
    };

    loadReports();
  }, []);

  
  const updateStatus = async (id, status) => {
    await reportService.update(JSON.stringify({ status }), id);

    
    setReports((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status } : r))
    );
  };

 
  const filteredReports =
    filter === "all"
      ? reports
      : reports.filter((r) => r.type === filter.toLowerCase());

  return (
    <main className="main-container">
      <header>
        <h1>Admin Dashboard</h1>
        <p className="role">Manage and review community reports</p>
      </header>

      {}
      <section className="filter-section">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="all">All Types</option>
          <option value="suspicious">Suspicious</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
          <option value="other">Other</option>
        </select>
      </section>

      {}
      <section className="admin-reports-list">
        {filteredReports.length === 0 && (
          <p className="no-reports">No reports available.</p>
        )}

        {filteredReports.map((r) => (
          <div key={r._id} className="admin-report-card">
            <h3>{r.title}</h3>

            <p>
              <strong>Type:</strong> {r.type}
            </p>
            <p>
              <strong>Status:</strong> {r.status}
            </p>

            {}
            <div className="admin-actions">
              <button
                onClick={() => updateStatus(r._id, "approved")}
                className="approve-btn"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(r._id, "rejected")}
                className="reject-btn"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default AdminDashboardPage;
