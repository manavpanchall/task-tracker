import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi';

const Header = ({ darkMode, setDarkMode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          TaskTracker
        </Link>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-blue-700 transition"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          {user && (
            <>
              <span className="hidden sm:inline">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-blue-700 transition flex items-center"
              >
                <FiLogOut size={20} className="mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;