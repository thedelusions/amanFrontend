import { Link } from 'react-router';
import "./Landing.css";

const Landing = () => {
  return (
    <main className='home-container'>
      <section className='hero-section'>
      <h1>Welcome to Aman</h1>
      <h3 className='hero-subtitle'>Aman - Your Community Safety Reporting Platform</h3>
      <h4>Report lost, found, or suspicious items easily and securely</h4>
        <div className="landing-buttons">
          <Link to="/sign-up" className="btn-primary">Sign Up</Link>
          <Link to="/sign-in" className="btn-secondary">Sign In</Link>
        </div>      
      </section>
      </main>
  );
};

export default Landing;

