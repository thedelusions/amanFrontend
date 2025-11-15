import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import * as reportService from '../../services/reportService';
import './ReportShow.css';

const ReportShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const data = await reportService.show(id);
        if (data.err) {
          setError(data.err);
        } else {
          setReport(data);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };


    
    fetchReport();
  }, [id]);

  if (loading) return <p className="loading">Loading report...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (!report) return <p className="error-message">Report not found</p>;

  return (
    <div className="report-show-container">
      <button className="back-btn" onClick={() => navigate('/reports')}>
        ← Back to Reports
      </button>
      
      <div className="report-show">
        <h1>{report.title}</h1>
        
        <div className="report-details">
          <div className="detail-row">
            <strong>Author:</strong>
            <span>{report.author?.name || 'Unknown'}</span>
          </div>
          
          <div className="detail-row">
            <strong>Area:</strong>
            <span>{report.area || report.areaName}</span>
          </div>
          
          <div className="detail-row">
            <strong>Type:</strong>
            <span>{report.type}</span>
          </div>
          
          {user && report.author && user._id === report.author._id && (
            <div className="detail-row">
              <strong>Status:</strong>
              <span className={`report-status status-${report.status}`}>{report.status}</span>
            </div>
          )}
        </div>

        <div className="show-report-description">
          <h2>Description</h2>
          <p>{report.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportShow;
