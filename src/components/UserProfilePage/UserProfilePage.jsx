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