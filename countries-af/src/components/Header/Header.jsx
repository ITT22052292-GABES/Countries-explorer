import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="text-3xl mr-2">🌎</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white">
              Countries Explorer
            </span>
          </Link>
          
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Desktop menu */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link to="/" className="hover:text-blue-200 transition font-medium">Home</Link>
              </li>
              {currentUser ? (
                <>
                  <li>
                    <Link to="/profile" className="hover:text-blue-200 transition font-medium">My Profile</Link>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="px-4 py-1 bg-red-500 hover:bg-red-600 rounded-full text-white font-medium transition"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="hover:text-blue-200 transition font-medium">Login</Link>
                  </li>
                  <li>
                    <Link 
                      to="/register" 
                      className="px-4 py-1 bg-white text-indigo-700 hover:bg-blue-100 rounded-full font-medium transition"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-3 py-2">
              <li>
                <Link 
                  to="/" 
                  className="block hover:bg-blue-600 px-2 py-1 rounded transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              {currentUser ? (
                <>
                  <li>
                    <Link 
                      to="/profile" 
                      className="block hover:bg-blue-600 px-2 py-1 rounded transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-red-600 rounded transition"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      className="block hover:bg-blue-600 px-2 py-1 rounded transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/register" 
                      className="block bg-white text-indigo-700 px-2 py-1 rounded transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;