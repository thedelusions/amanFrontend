import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import * as reportService from "../../services/reportService";
import * as userService from "../../services/userService";

const UserProfilePage = () => {
  const { user } = useContext(UserContext);
  const userId = user?._id;

  const [reports, setReports] = useState([]);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    area: user?.area || "",
  });
    useEffect(() => {
    async function loadReports() {
      const allReports = await reportService.index();

      const mine = allReports.filter(
        (r) => r.author && r.author._id === userId
      );

      setReports(mine);
    }

    if (userId) loadReports();
  }, [userId]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });