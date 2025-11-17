import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as reportService from '../../services/reportService';
import areasFile from '../../data/bh.json';
import './ReportsList.css';

const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');

  const navigate = useNavigate();
  const areas = areasFile.map(a => a.city);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const data = await reportService.getApprovedReports();
        setReports(data);
        setFilteredReports(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load reports');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  useEffect(() => {
    let filtered = [...reports];

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(r => r.type === typeFilter);
    }

    // Filter by area
    if (areaFilter !== 'all') {
      filtered = filtered.filter(r => r.area === areaFilter);
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        r => r.title.toLowerCase().includes(term) || r.description.toLowerCase().includes(term)
      );
    }

    setFilteredReports(filtered);
  }, [reports, typeFilter, areaFilter, searchTerm]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'green';
      case 'rejected':
        return 'red';
      case 'pending':
        return 'goldenrod';
    }
  };

  if (loading) return <p className="loading">Loading reports...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="reports-container">
      <header>
        <h2>Community Reports</h2>
        <p>Browse and explore community reports by type, area, or search keyword.</p>
      </header>

      <section className="filters">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="suspicious">Suspicious</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
          <option value="other">Other</option>
        </select>

        <select value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)}>
          <option value="all">All Areas</option>
          {areas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </section>

      {filteredReports.length === 0 ? (
        <p className="no-reports">No reports found.</p>
      ) : (
        <ul className="reports-grid">
          {filteredReports.map((report) => (
            <li key={report._id} className="report-card">
              <div className={`status-badge status-${report.status}`} style={{ backgroundColor: getStatusColor(report.status) }}>
                {report.status}
              </div>
              <h3>{report.title}</h3>
              <p><strong>Author:</strong> {report.author?.name}</p>
              <p><strong>Area:</strong> {report.area || report.areaName}</p>
              <p><strong>Type:</strong> {report.type}</p>
              <p className="report-description">{report.description}</p>
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
