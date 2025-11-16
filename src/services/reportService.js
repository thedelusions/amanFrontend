const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/reports`;

export const index = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const show = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const create = async (formData) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return res.json();
};

export const update = async (reportId, formData) => {
  const res = await fetch(`${BASE_URL}/${reportId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return res.json();
};

export const deleteReport = async (reportId) => {
  const res = await fetch(`${BASE_URL}/${reportId}`, {
    method: "DELETE",
  });
  return res.json();
};

export const getComments = async (reportId) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/comments/${reportId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getReportsByArea = async (area) => {
  try {
    const res = await fetch(`${BASE_URL}/area/${area}`, {
      method: 'GET',
      headers:{ "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.err) {
      throw new Error(data.err);
     }
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};