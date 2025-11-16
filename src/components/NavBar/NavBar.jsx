// src/components/NavBar/NavBar.jsx

// Import the useContext hook
import { useContext } from 'react';
import { Link } from 'react-router';

// Import the UserContext object
import { UserContext } from '../../contexts/UserContext';
import './NavBar.css';

const NavBar = () => {
  // Pass the UserContext object to the useContext hook to access:
  // - The user state (which we use here).
  // - The setUser function to update the user state (which we aren't using).
  //
  // Destructure the object returned by the useContext hook for easy access
  // to the data we added to the context with familiar names.
  const { user, setUser } = useContext(UserContext);

   const handleSignOut = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Clear the user state
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to='/' className="nav-logo">Aman</Link>
        {user ? (
          <ul className="nav-menu">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/reports'>Reports</Link></li>
            <li><Link to='/community'>Community</Link></li>
            <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
          </ul>
        ) : (
          <ul className="nav-menu">
            <li><Link to='/community'>Community</Link></li>
            <li><Link to='/sign-up'>Sign Up</Link></li>
            <li><Link to='/sign-in'>Sign In</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

