
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
  <nav className="navbar">
    <div className="logo">
      <h2> MindEase</h2>
    </div>
    <ul className="links">
      {!token ? (
        <>
          {location.pathname !== '/login' && <li><Link to="/login">Login</Link></li>}
          {location.pathname !== '/register' && <li><Link to="/register">Register</Link></li>}
        </>
      ) : (
        <>
          {!isAuthPage && (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </>
          )}
          <li onClick={handleLogout} className="logout">Logout</li>
        </>
      )}
    </ul>
  </nav>
  <hr />
</>

  );
};

export default Navbar;
