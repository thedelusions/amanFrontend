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
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(formData),
    });

    return await res.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const update = async (reportId, formData) => {
  try {
    const res = await fetch(`${BASE_URL}/${reportId}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(formData),
    });

    return await res.json();
  } catch (err) {
    throw new Error(err.message);
  }
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

export const addComment = async (reportId, commentText) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ report_id: reportId, comment_text: commentText })
  });

  if (!res.ok) throw new Error('Failed to add comment');
  return await getComments(reportId);
};

export const getReportsByArea = async (area) => {
  try {
    const res = await fetch(`${BASE_URL}/area/${area}`, {
      method: 'GET',
      headers:{ "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    
    return await res.json();
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};