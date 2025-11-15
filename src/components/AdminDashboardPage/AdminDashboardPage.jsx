import { useEffect, useState } from "react";
import * as reportService from "../../services/reportService";

const AdminDashboardPage = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("all");