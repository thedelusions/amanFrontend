import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as reportService from '../../services/reportService';
import { useNavigate } from 'react-router';
import Footer from '../Footer/Footer';
import './Home.css';

const Home = () => {
  const { user } = useContext(UserContext);
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadReports = async () => {
      try {
        if (user?.area) {
          const data = await reportService.getReportsByArea(user.area);
          setReports(data || []);
        }
      } catch (err) {
        console.error('Error fetching reports:', err);
        setReports([]);
      }
    };

    if (user) loadReports();
  }, [user]);

  // Count reports by type
  const suspiciousCount = reports.filter(r => r.type === 'suspicious').length;
  const lostCount = reports.filter(r => r.type === 'lost').length;
  const foundCount = reports.filter(r => r.type === 'found').length;

  return (
    <>
    <div className="home-container">
        <section className="hero-section">
        <h1>Aman</h1>
        <p className="hero-subtitle">Community Watch & Lost & Found</p>
        <p className="welcome-user">Welcome back, {user?.name}</p>

        <div>
          <button onClick={() => navigate('/community')}>View Community</button>
          <button onClick={() => navigate('/reports/create')}>Add a Report</button>
        </div>
        </section>

      <section className="features-section">
        <div className="features-grid">
            <div className="feature-card">
            <h3>Safety Alerts</h3>
            <p>{suspiciousCount} suspicious reports in {user?.area}</p>
            </div>
            <div className="feature-card">
            <h3>Lost Items</h3>
            <p>{lostCount} items are lost in your area </p>
            </div>
            <div className="feature-card">
            <h3>Found Items</h3>
            <p>There are {foundCount} found items within your area </p>
            </div>
        </div>
      </section>
    </div>
        <Footer />
    </>
  );
};

export default Home;
