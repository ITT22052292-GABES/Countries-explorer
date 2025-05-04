import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import CountryList from './components/CountryList/CountryList';
import CountryDetail from './components/CountryDetail/CountryDetail';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserProfile from './components/Auth/UserProfile';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import worldMap from './assets/world-map.jpg';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Background div with world map */}
        <div className="fixed inset-0 z-[-1]">
          <img 
            src={worldMap}
            alt="World Map Background" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        
        {/* Content container with solid background for text readability */}
        <div className="relative min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            
              <Routes>
                <Route path="/" element={<CountryList />} />
                <Route path="/country/:countryCode" element={<CountryDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
           
          </main>
          <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
              <p className="text-lg font-semibold">© 2025 Countries Explorer - SE3040 Assignment</p>
              <div className="mt-4 md:mt-0 flex space-x-4">
                <a href="#" className="text-blue-200 hover:text-white transition">About</a>
                <a href="#" className="text-blue-200 hover:text-white transition">Privacy</a>
                <a href="#" className="text-blue-200 hover:text-white transition">Contact</a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;