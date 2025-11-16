const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/reports`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const show = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const create = async (formData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData,
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (formData, reportId) => {
  try {
    const res = await fetch(`${BASE_URL}/${reportId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData,
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const deleteReport = async (reportId) => {
  try {
    const res = await fetch(`${BASE_URL}/${reportId}`, {
      method: 'DELETE'
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getComments = async (reportId) => {
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

export { index, show, create, update, deleteReport, getComments };
