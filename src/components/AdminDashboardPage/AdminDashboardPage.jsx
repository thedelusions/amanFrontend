import { useEffect, useState } from "react";
import * as reportService from "../../services/reportService";

const AdminDashboardPage = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("all");


  useEffect(() => {
    async function loadReports() {
      const data = await reportService.index();
      setReports(data);
    }
    loadReports();
  }, []);

  async function updateStatus(id, status) {
    await reportService.update(JSON.stringify({ status }), id);

    setReports((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status } : r))
    );
  }
    const filtered =
    filter === "all"
      ? reports
      : reports.filter((r) => r.type === filter.toLowerCase());

  return (
    <main style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {/* Filter */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ margin: "10px 0", padding: "5px" }}
      >
        <option value="all">All Types</option>
        <option value="suspicious">Suspicious</option>
        <option value="lost">Lost</option>
        <option value="found">Found</option>
        <option value="other">Other</option>
      </select>
         {/* Reports List */}
      {filtered.map((r) => (
        <div
          key={r._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <h3>{r.title}</h3>
          <p>Type: {r.type}</p>
          <p>Status: {r.status}</p>

          <button
            onClick={() => updateStatus(r._id, "approved")}
            style={{ marginRight: "10px" }}
          >
            Approve
          </button>

          <button onClick={() => updateStatus(r._id, "rejected")}>
            Reject
          </button>
        </div>
      ))}

      {filtered.length === 0 && <p>No reports available.</p>}
    </main>
  );
};

export default AdminDashboardPage;

