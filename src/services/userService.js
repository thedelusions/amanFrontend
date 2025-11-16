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


