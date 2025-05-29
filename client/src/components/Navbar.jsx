
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from "../assets/logo.png"

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
      <Link to='/'> <img src={logo} alt="logo.png" /></Link>
      <h2> <Link to="/">MindEase</Link></h2>
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
