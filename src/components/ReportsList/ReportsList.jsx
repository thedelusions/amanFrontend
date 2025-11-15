import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as reportService from '../../services/reportService';
import './ReportsList.css';

const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const fetchedReports = await reportService.index();
        
        if (fetchedReports.err) {
          setError(fetchedReports.err);
        } else {
          setReports(fetchedReports);
        }
      } catch (err) {
        console.log(err);
        setError('Failed to load reports');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReports();
  }, []);

  if (loading) return <p className="loading">Loading reports...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="reports-container">
      <h2>Reports List</h2>
      {reports.length === 0 ? (
        <p className="no-reports">No reports found.</p>
      ) : (
        <ul className="reports-grid">
          {reports.map((report) => (
            <li key={report._id} className="report-card">
              <h3>{report.title}</h3>
              <p><strong>Author:</strong> {report.author?.name}</p>
              <p><strong>Area:</strong> {report.area || report.areaName }</p>
              <p><strong>Type:</strong> {report.type}</p>
              <p><strong>Status:</strong> {report.status}</p>
              <p className='report-description'>{(report.description)}</p>
              <button 
                className="view-report-btn"
                onClick={() => navigate(`/reports/${report._id}`)}
              >
                View Report
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportsList;