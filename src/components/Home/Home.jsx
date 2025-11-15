import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './Home.css';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Aman</h1>
        <p className="hero-subtitle">Community Watch & Lost & Found</p>
        <p className="welcome-user">Welcome back, {user?.name}</p>
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <h3>Safety Alerts</h3>
            <p>Report suspicious activities in your area</p>
          </div>
          <div className="feature-card">
            <h3>Lost Items</h3>
            <p>Post items you've lost</p>
          </div>
          <div className="feature-card">
            <h3>Found Items</h3>
            <p>Help return found items to their owners</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;