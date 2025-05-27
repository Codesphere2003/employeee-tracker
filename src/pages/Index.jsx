
import React, { useState } from 'react';
import Navigation from '../components/layout/Navigation';
import Home from './Home';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import AdminDashboard from '../components/admin/AdminDashboard';
import EmployeeDashboard from '../components/employee/EmployeeDashboard';

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (user, role) => {
    setCurrentUser(user);
    setUserRole(role);
    setCurrentView('dashboard');
  };

  const handleRegister = (user, role) => {
    setCurrentUser(user);
    setUserRole(role);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setCurrentView('home');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return <LoginForm onLogin={handleLogin} />;
      case 'register':
        return (
          <RegisterForm 
            onRegister={handleRegister} 
            onBackToLogin={() => setCurrentView('login')}
          />
        );
      case 'dashboard':
        return userRole === 'admin' ? (
          <AdminDashboard user={currentUser} onLogout={handleLogout} />
        ) : (
          <EmployeeDashboard user={currentUser} onLogout={handleLogout} />
        );
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView !== 'login' && currentView !== 'register' && currentView !== 'dashboard' && (
        <Navigation
          onLoginClick={() => setCurrentView('login')}
          onRegisterClick={() => setCurrentView('register')}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}
      {renderContent()}
    </div>
  );
};

export default Index;
