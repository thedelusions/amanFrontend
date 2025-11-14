const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/reports`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL);
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

export { index, create, update, deleteReport };