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