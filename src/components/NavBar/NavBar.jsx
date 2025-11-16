import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import './NavBar.css';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Brand logo */}
        <Link to={user ? '/home' : '/'} className="nav-logo">
          Aman
        </Link>

        {user ? (
          <ul className="nav-menu">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/reports'>Reports</Link></li>
            <li><Link to='/community'>Community</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            {user.role === "admin" && <li><Link to="/admin">Admin Dashboard</Link></li>}
            <li>
              <Link to="/" onClick={handleSignOut}>
                Sign Out
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav-menu">
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/sign-up">Sign Up</Link></li>
            <li><Link to="/sign-in">Sign In</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
