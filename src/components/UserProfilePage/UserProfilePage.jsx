import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import * as reportService from "../../services/reportService";
import * as userService from "../../services/userService";

import Footer from "../Footer/Footer";
import "./UserProfilePage.css";

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
    if (!userId) return;

    async function loadReports() {
      const allReports = await reportService.index();
      const mine = allReports.filter(
        (r) => r.author && r.author._id === userId
      );
      setReports(mine);
    }

    loadReports();
  }, [userId]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const updated = await userService.updateUser(userId, formData);

    if (updated.error) {
      alert(updated.error);
    } else {
      alert("Profile updated!");
    }
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    await userService.deleteUser(userId);
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <>
      <main className="profile-container">
        <h1 className="profile-title">Your Profile</h1>

        <p className="welcome-text">Welcome, <span>{formData.name}</span> 👋</p>

        <div className="profile-avatar">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="User avatar"
          />
        </div>

        <section className="profile-card">
          <h2>Edit Profile</h2>

          <form onSubmit={handleSubmit} className="profile-form">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />

            <input
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Area"
            />

            <button className="update-btn">Update Profile</button>
          </form>

          <button className="delete-btn" onClick={handleDelete}>
            Delete Account
          </button>
        </section>

        <section className="reports-section">
          <h2>Your Reports</h2>

          {reports.length === 0 && (
            <p className="no-reports">No reports yet.</p>
          )}

          {reports.map((r) => (
            <div key={r._id} className="report-card">
              <h3>{r.title}</h3>
              <p><strong>Type:</strong> {r.type}</p>
              <p><strong>Status:</strong> {r.status}</p>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default UserProfilePage;
