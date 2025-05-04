import React, { createContext, useState, useEffect } from 'react';

// Create the authentication context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isLoading, setIsLoading] = useState(true);

  // Update localStorage when user state changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
    setIsLoading(false);
  }, [currentUser]);

  // Mock user database (in a real app, you'd use a backend service)
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [
      { id: 1, username: 'demo', password: 'password', favoriteCountries: [] }
    ];
  });

  // Update users in localStorage
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Login function
  const login = (username, password) => {
    const user = users.find(
      u => u.username === username && u.password === password
    );
    
    if (user) {
      // Create a copy without the password for security
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  
  const register = (username, password) => {
    // Check if username already exists
    if (users.some(u => u.username === username)) {
      return false;
    }
    
    
    const newUser = {
      id: users.length + 1,
      username,
      password,
      favoriteCountries: []
    };
    
    setUsers([...users, newUser]);
    
    // Auto login after registration
    login(username, password);
    return true;
  };

  
  const logout = () => {
    setCurrentUser(null);
  };

  
  const toggleFavoriteCountry = (countryCode) => {
    if (!currentUser) return;
    
    const updatedUser = { ...currentUser };
    
    if (updatedUser.favoriteCountries.includes(countryCode)) {
      updatedUser.favoriteCountries = updatedUser.favoriteCountries.filter(
        code => code !== countryCode
      );
    } else {
      updatedUser.favoriteCountries = [...updatedUser.favoriteCountries, countryCode];
    }
    
    
    setCurrentUser(updatedUser);
    
    
    const updatedUsers = users.map(user => 
      user.id === updatedUser.id 
        ? { ...user, favoriteCountries: updatedUser.favoriteCountries }
        : user
    );
    
    setUsers(updatedUsers);
  };

  const value = {
    currentUser,
    isLoading,
    login,
    register,
    logout,
    toggleFavoriteCountry
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};