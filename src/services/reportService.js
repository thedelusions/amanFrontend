const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

// Admin: fetch all reports
export const index = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/admin/reports`, {
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
         "Cache-Control": "no-cache",
      }
    });
    if (!res.ok) throw new Error('Failed to fetch admin reports');
    return await res.json();
  } catch (err) {
    console.error('Error in index():', err);
    return [];
  }
};

// user community approved feed 
export const getApprovedReports = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/reports/`);
    if (!res.ok) throw new Error('Failed to fetch approved reports');
    return await res.json();
  } catch (err) {
    console.error('Error in getApprovedReports():', err);
    return [];
  }
};

// single report by ID
export const show = async (reportId) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/reports/${reportId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error('Failed to fetch report');
    return await res.json();
  } catch (err) {
    console.error('Error in show():', err);
  }
};

// Create a new report
export const create = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/reports`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });
    if (!res.ok) throw new Error('Failed to create report');
    return await res.json();
  } catch (err) {
    console.error('Error in create():', err);
  }
};

// Update a report
export const update = async (reportId, formData) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/reports/${reportId}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });
    if (!res.ok) throw new Error('Failed to update report');
    return await res.json();
  } catch (err) {
    console.error('Error in update():', err);
  }
};

// Delete a report
export const deleteReport = async (reportId) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/${reportId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return res.json();
};

//get reports by area
export const getReportsByArea = async (area) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/reports/area/${area}`, {
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error('Failed to fetch reports by area');
    return await res.json();
  } catch (err) {
    console.error('Error in getReportsByArea():', err);
    return [];
  }
};

// comments for a report
export const getComments = async (reportId) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/comments/${reportId}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch comments');
    return await res.json();
  } catch (err) {
    console.error('Error in getComments():', err);
  }
};

// Add a comment to a report
export const addComment = async (reportId, commentText) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/comments`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ report_id: reportId, comment_text: commentText })
    });
    if (!res.ok) throw new Error('Failed to add comment');
    return await getComments(reportId);
  } catch (err) {
    console.error('Error in addComment():', err);
  }
};
