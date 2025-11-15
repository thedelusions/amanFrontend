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
    const sure = window.confirm("Are you sure you want to delete your account?");
    if (!sure) return;

    await userService.deleteUser(userId);
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>User Profile</h1>

      <section style={{ maxWidth: "350px" }}>
        <h2>Edit Profile</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />

          <input
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Area"
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />

          <button style={{ padding: "10px", marginTop: "10px", width: "100%" }}>
            Update Profile
          </button>
        </form>

        <button
          onClick={handleDelete}
          style={{
            marginTop: "20px",
            padding: "10px",
            width: "100%",
            background: "red",
            color: "white",
            border: "none",
          }}
        >
          Delete Account
        </button>
      </section>
 <section style={{ marginTop: "40px" }}>
        <h2>Your Reports</h2>

        {reports.length === 0 && <p>No reports yet.</p>}

        {reports.map((r) => (
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
          </div>
        ))}
      </section>
    </main>
  );
};

export default UserProfilePage;



