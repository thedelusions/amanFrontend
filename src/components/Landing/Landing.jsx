// src/components/Landing.jsx
import { Link } from 'react-router';

const Landing = () => {
  return (
    <main>
      <h1>Welcome to Aman</h1>
      <h3>Aman – Your Community Safety Reporting Platform</h3>
      <h4>Report lost, found, or suspicious items easily and securely</h4>
      <Link to='/sign-up'>Sign Up</Link> <Link to='/sign-in'>Sign In</Link>
    </main>
  );
};

export default Landing;

