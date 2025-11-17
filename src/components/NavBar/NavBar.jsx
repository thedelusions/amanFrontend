import { useContext, useState } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import './NavBar.css';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [menuActive, setMenuActive] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    setMenuActive(false); // close menu on sign out
  };

  const handleLinkClick = () => {
    setMenuActive(false); // close menu on link click
  };

  return (
    <nav className="navbar">
      <ul className={`nav-menu ${menuActive ? 'active' : ''}`}>
        {user ? (
          <>
            <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
            <li><Link to='/' onClick={handleLinkClick}>Home</Link></li>
            <li><Link to="/my-reports" onClick={handleLinkClick}>My Reports</Link></li>
            <li><Link to='/community' onClick={handleLinkClick}>Community</Link></li>
            <li><Link to="/profile" onClick={handleLinkClick}>Profile</Link></li>
            {user.role === "admin" && <li><Link to="/admin" onClick={handleLinkClick}>Admin Dashboard</Link></li>}
            <li><Link to="/" onClick={handleSignOut}>Sign Out</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
            <li><Link to="/sign-up" onClick={handleLinkClick}>Sign Up</Link></li>
            <li><Link to="/sign-in" onClick={handleLinkClick}>Sign In</Link></li>
          </>
        )}
      </ul>

      <Link to={user ? '/' : '/'} className="nav-logo" onClick={() => setMenuActive(false)}>
        Aman
      </Link>

      {/* when page is smaller */}
      <div 
        className={`hamburger ${menuActive ? 'active' : ''}`} 
        onClick={() => setMenuActive(!menuActive)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default NavBar;
