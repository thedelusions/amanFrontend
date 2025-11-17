const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});


export const index = async () => {
  const res = await fetch(`${BASE_URL}/`, { headers: headers() });
  return res.json();
};

// Update profile
export const updateUser = async (userId, formData) => {
  const res = await fetch(`${BASE_URL}/${userId}/edit`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(formData),
  });
  return res.json();
};

// Delete profile
export const deleteUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/${userId}`, {
    method: "DELETE",
    headers: headers(),
  });
  return res.json();
};

export const getUserReports = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/${userId}/reports?t=${Date.now()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await res.json();
  } catch (err) {
    console.log("Error fetching user reports:", err);
  }
};

