const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export async function updateUser(id, formData) {
  const res = await fetch(`${BASE_URL}/${id}/edit`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(formData),
  });
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return res.json();
}

export async function getUser(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return res.json();
}
